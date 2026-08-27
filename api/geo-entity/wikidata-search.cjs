/**
 * Wikidata Read-Only API Client
 * Phase 1A — ONLY wbsearchentities, wbgetentities, WDQS SPARQL
 * NO write API calls. NO credential storage.
 */

const WIKIDATA_API = 'https://www.wikidata.org/w/api.php';
const WDQS_ENDPOINT = 'https://query.wikidata.org/sparql';
const USER_AGENT = 'LETAN-GEO-Manager/1.0 (https://letanmedia.me; geo-entity-manager)';
const TIMEOUT_MS = 10000;
const RATE_LIMIT_MS = 1000;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const searchCache = new Map();
const entityCache = new Map();
let lastRequestTime = 0;

function stripHtml(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

function normalizeLabel(label) {
  if (!label) return '';
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isValidQid(qid) {
  return /^Q\d+$/.test(qid);
}

function getCached(cache, key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.time > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(cache, key, data) {
  if (cache.size > 500) {
    const oldest = cache.keys().next().value;
    cache.delete(oldest);
  }
  cache.set(key, { data, time: Date.now() });
}

async function rateLimitWait() {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < RATE_LIMIT_MS) {
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_MS - elapsed));
  }
  lastRequestTime = Date.now();
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/json',
        ...options.headers,
      },
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Search Wikidata entities by label
 * @param {string} query - Search query
 * @param {string} language - Language code (default: en)
 * @param {number} limit - Max results (default: 20)
 * @returns {Promise<Array>} Search results
 */
async function searchEntities(query, language = 'en', limit = 20) {
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return { results: [], error: 'Query is required' };
  }

  const sanitizedQuery = query.trim().slice(0, 200);
  const cacheKey = `search:${sanitizedQuery}:${language}:${limit}`;
  const cached = getCached(searchCache, cacheKey);
  if (cached) return { results: cached, cached: true };

  await rateLimitWait();

  const params = new URLSearchParams({
    action: 'wbsearchentities',
    search: sanitizedQuery,
    language: language,
    format: 'json',
    limit: Math.min(limit, 50).toString(),
    type: 'item',
    uselang: language,
  });

  try {
    const response = await fetchWithTimeout(`${WIKIDATA_API}?${params}`);
    if (!response.ok) {
      return { results: [], error: `Wikidata API error: ${response.status}` };
    }
    const data = await response.json();
    const results = (data.search || []).map(item => ({
      qid: item.id,
      label: item.label || '',
      description: item.description || '',
      aliases: item.aliases || [],
      url: `https://www.wikidata.org/wiki/${item.id}`,
    }));
    setCache(searchCache, cacheKey, results);
    return { results, cached: false };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { results: [], error: 'Wikidata API timeout' };
    }
    return { results: [], error: `Wikidata API error: ${err.message}` };
  }
}

/**
 * Get detailed entity data from Wikidata
 * @param {string} qid - Wikidata QID
 * @returns {Promise<Object>} Entity details
 */
async function getEntity(qid) {
  if (!isValidQid(qid)) {
    return { entity: null, error: 'Invalid QID format' };
  }

  const cacheKey = `entity:${qid}`;
  const cached = getCached(entityCache, cacheKey);
  if (cached) return { entity: cached, cached: true };

  await rateLimitWait();

  const params = new URLSearchParams({
    action: 'wbgetentities',
    ids: qid,
    format: 'json',
    props: 'labels|descriptions|aliases|claims|sitelinks',
    languages: 'en|vi|zh|de|fr|es|ja|ko',
  });

  try {
    const response = await fetchWithTimeout(`${WIKIDATA_API}?${params}`);
    if (!response.ok) {
      return { entity: null, error: `Wikidata API error: ${response.status}` };
    }
    const data = await response.json();
    const entity = data.entities?.[qid];
    if (!entity || entity.missing !== undefined) {
      return { entity: null, error: 'Entity not found' };
    }

    const labels = {};
    const descriptions = {};
    const aliases = {};
    if (entity.labels) {
      for (const [lang, val] of Object.entries(entity.labels)) {
        labels[lang] = val.value;
      }
    }
    if (entity.descriptions) {
      for (const [lang, val] of Object.entries(entity.descriptions)) {
        descriptions[lang] = val.value;
      }
    }
    if (entity.aliases) {
      for (const [lang, vals] of Object.entries(entity.aliases)) {
        aliases[lang] = vals.map(a => a.value);
      }
    }

    const claims = {};
    if (entity.claims) {
      for (const [propId, propClaims] of Object.entries(entity.claims)) {
        claims[propId] = propClaims.map(claim => {
          const mainsnak = claim.mainsnak || {};
          let value = null;
          if (mainsnak.datavalue) {
            if (mainsnak.datavalue.type === 'string') {
              value = mainsnak.datavalue.value;
            } else if (mainsnak.datavalue.type === 'wikibase-entityid') {
              value = {
                qid: mainsnak.datavalue.value.id,
                label: null,
              };
            } else if (mainsnak.datavalue.type === 'time') {
              value = mainsnak.datavalue.value.time;
            } else if (mainsnak.datavalue.type === 'monolingualtext') {
              value = mainsnak.datavalue.value.text;
            } else {
              value = JSON.stringify(mainsnak.datavalue.value);
            }
          }
          return {
            id: claim.id,
            rank: claim.rank || 'normal',
            value,
          };
        });
      }
    }

    const sitelinks = {};
    if (entity.sitelinks) {
      for (const [site, data] of Object.entries(entity.sitelinks)) {
        sitelinks[site] = data.url || '';
      }
    }

    const result = {
      qid,
      labels,
      descriptions,
      aliases,
      claims,
      sitelinks,
      sitelinksCount: Object.keys(sitelinks).length,
    };
    setCache(entityCache, cacheKey, result);
    return { entity: result, cached: false };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { entity: null, error: 'Wikidata API timeout' };
    }
    return { entity: null, error: `Wikidata API error: ${err.message}` };
  }
}

/**
 * Run a SPARQL query against Wikidata Query Service
 * @param {string} query - SPARQL query
 * @returns {Promise<Object>} Query results
 */
async function sparqlQuery(query) {
  if (!query || typeof query !== 'string') {
    return { results: [], error: 'SPARQL query is required' };
  }

  const sanitizedQuery = query.trim().slice(0, 5000);
  const cacheKey = `sparql:${normalizeLabel(sanitizedQuery).slice(0, 100)}`;
  const cached = getCached(searchCache, cacheKey);
  if (cached) return { results: cached, cached: true };

  await rateLimitWait();

  try {
    const response = await fetchWithTimeout(WDQS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-query',
        'Accept': 'application/json',
      },
      body: sanitizedQuery,
    });
    if (!response.ok) {
      return { results: [], error: `WDQS error: ${response.status}` };
    }
    const data = await response.json();
    const results = data.results?.bindings || [];
    setCache(searchCache, cacheKey, results);
    return { results, cached: false };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { results: [], error: 'WDQS timeout' };
    }
    return { results: [], error: `WDQS error: ${err.message}` };
  }
}

module.exports = {
  searchEntities,
  getEntity,
  sparqlQuery,
  normalizeLabel,
  isValidQid,
};
