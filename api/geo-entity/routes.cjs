/**
 * Express Routes — GEO Entity Manager (Phase 1A)
 * Read-only Wikidata. Local draft write only. No public exposure.
 */

const express = require('express');
const router = express.Router();
const wikidata = require('./wikidata-search.cjs');
const store = require('./entity-store.cjs');

const RATE_LIMIT = new Map();
function rateLimit(ip, limit = 30, windowMs = 60000) {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);
  if (!entry || now - entry.start > windowMs) {
    RATE_LIMIT.set(ip, { start: now, count: 1 });
    return true;
  }
  entry.count++;
  return entry.count <= limit;
}

function requireLocalOnly(req, res, next) {
  const ip = req.ip || req.connection?.remoteAddress || '';
  const isLocal = ip.includes('127.0.0.1') || ip.includes('::1') || ip === '::ffff:127.0.0.1';
  if (!isLocal) {
    return res.status(403).json({ error: 'Access denied: local only' });
  }
  next();
}

function validateInput(input, rules) {
  if (!input || typeof input !== 'object') return { valid: false, error: 'Invalid input' };
  for (const [key, rule] of Object.entries(rules)) {
    const value = input[key];
    if (rule.required && (value === undefined || value === null)) {
      return { valid: false, error: `Missing required field: ${key}` };
    }
    if (value !== undefined && value !== null) {
      if (rule.type && typeof value !== rule.type) {
        return { valid: false, error: `Invalid type for ${key}: expected ${rule.type}` };
      }
      if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
        return { valid: false, error: `${key} exceeds max length` };
      }
      if (rule.max && typeof value === 'number' && value > rule.max) {
        return { valid: false, error: `${key} exceeds max value` };
      }
    }
  }
  return { valid: true };
}

function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[<>]/g, '').trim().slice(0, 500);
}

// ── Entity Draft ──────────────────────────────────────

router.get('/entity/draft', requireLocalOnly, async (req, res) => {
  if (!rateLimit(req.ip)) return res.status(429).json({ error: 'Rate limit exceeded' });
  try {
    const { data, hash } = await store.read('draft');
    res.json({ data, hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/entity/draft', requireLocalOnly, async (req, res) => {
  if (!rateLimit(req.ip)) return res.status(429).json({ error: 'Rate limit exceeded' });
  try {
    const validation = validateInput(req.body, {
      entity: { required: true, type: 'object' },
      proposedStatements: { required: true, type: 'object' },
    });
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const { data: oldData } = await store.read('draft');
    const beforeHash = store.computeHash(oldData);

    req.body.lastUpdated = new Date().toISOString();
    const { hash: afterHash } = await store.write('draft', req.body);

    await store.appendActivityLog({
      actor: 'local-user',
      action: 'draft.update',
      targetType: 'entity-draft',
      targetId: req.body.entity?.id || 'unknown',
      beforeHash,
      afterHash,
      result: 'success',
    });

    res.json({ success: true, hash: afterHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Wikidata Search ───────────────────────────────────

router.get('/wikidata/search', requireLocalOnly, async (req, res) => {
  if (!rateLimit(req.ip)) return res.status(429).json({ error: 'Rate limit exceeded' });
  try {
    const q = sanitizeString(req.query.q);
    const language = sanitizeString(req.query.language || 'en');
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);

    if (!q || q.length < 2) {
      return res.status(400).json({ error: 'Query must be at least 2 characters' });
    }

    const result = await wikidata.searchEntities(q, language, limit);

    await store.appendActivityLog({
      actor: 'local-user',
      action: 'wikidata.search',
      targetType: 'query',
      targetId: q,
      result: result.error ? 'error' : 'success',
      details: { resultCount: result.results?.length || 0, error: result.error },
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/wikidata/entity/:id', requireLocalOnly, async (req, res) => {
  if (!rateLimit(req.ip)) return res.status(429).json({ error: 'Rate limit exceeded' });
  try {
    const qid = sanitizeString(req.params.id);
    if (!wikidata.isValidQid(qid)) {
      return res.status(400).json({ error: 'Invalid QID format' });
    }

    const result = await wikidata.getEntity(qid);

    await store.appendActivityLog({
      actor: 'local-user',
      action: 'wikidata.getEntity',
      targetType: 'wikidata-entity',
      targetId: qid,
      result: result.error ? 'error' : 'success',
      details: { error: result.error },
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Duplicate Detection ───────────────────────────────

router.post('/duplicates/check', requireLocalOnly, async (req, res) => {
  if (!rateLimit(req.ip)) return res.status(429).json({ error: 'Rate limit exceeded' });
  try {
    const { entity } = req.body;
    if (!entity || !entity.name) {
      return res.status(400).json({ error: 'Entity with name is required' });
    }

    const searchQueries = [
      entity.name,
      ...(entity.aliases || []),
      ...((entity.domains || []).map(d => {
        try { return new URL(d.url).hostname; } catch { return null; }
      }).filter(Boolean)),
    ].filter(q => q && q.length >= 2).slice(0, 8);

    const allResults = [];
    const seen = new Set();

    const CONCURRENCY = 3;
    const batches = [];
    for (let i = 0; i < searchQueries.length; i += CONCURRENCY) {
      batches.push(searchQueries.slice(i, i + CONCURRENCY));
    }

    let timedOut = false;
    const deadline = Date.now() + 8000;
    for (const batch of batches) {
      if (Date.now() >= deadline) { timedOut = true; break; }
      const remaining = deadline - Date.now();
      const batchResults = await Promise.allSettled(
        batch.map(q => Promise.race(
          [wikidata.searchEntities(q, 'en', 20), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), Math.min(remaining, 5000)))]
        ))
      );
      for (const r of batchResults) {
        if (r.status === 'fulfilled' && r.value?.results) {
          for (const item of r.value.results) {
            if (!seen.has(item.qid)) {
              seen.add(item.qid);
              allResults.push(item);
            }
          }
        }
      }
    }

    const duplicates = [];
    const normalizedEntityName = wikidata.normalizeLabel(entity.name);
    const entityDomains = (entity.domains || []).map(d => {
      try { return new URL(d.url).hostname.replace(/^www\./, ''); } catch { return null; }
    }).filter(Boolean);
    const entityAliases = (entity.aliases || []).map(a => wikidata.normalizeLabel(a));

    for (const result of allResults) {
      let score = 0;
      const evidence = [];

      const normalizedResultLabel = wikidata.normalizeLabel(result.label);
      if (normalizedResultLabel === normalizedEntityName) {
        score += 40;
        evidence.push('exact_label_match');
      } else if (normalizedResultLabel.includes(normalizedEntityName) || normalizedEntityName.includes(normalizedResultLabel)) {
        score += 20;
        evidence.push('partial_label_match');
      }

      if (result.aliases) {
        const normalizedResultAliases = result.aliases.map(a => wikidata.normalizeLabel(a));
        for (const entityAlias of entityAliases) {
          if (normalizedResultAliases.includes(entityAlias)) {
            score += 15;
            evidence.push(`alias_match:${entityAlias}`);
          }
        }
      }

      if (entityDomains.length > 0) {
        for (const domain of entityDomains) {
          if (result.description && result.description.toLowerCase().includes(domain)) {
            score += 25;
            evidence.push(`description_domain_match:${domain}`);
          }
        }
      }

      if (score > 0) {
        let matchType = 'no_match';
        if (score >= 60) matchType = 'exact_match';
        else if (score >= 30) matchType = 'probable_match';
        else if (score >= 10) matchType = 'possible_match';

        duplicates.push({
          qid: result.qid,
          label: result.label,
          description: result.description,
          score: Math.min(score, 100),
          matchType,
          evidence,
          url: result.url,
        });
      }
    }

    duplicates.sort((a, b) => b.score - a.score);

    await store.appendActivityLog({
      actor: 'local-user',
      action: 'duplicates.check',
      targetType: 'entity-draft',
      targetId: entity.id || entity.name,
      result: 'success',
      details: { queriesSearched: searchQueries.length, duplicatesFound: duplicates.length },
    });

    res.json({ duplicates, queriesSearched: searchQueries.length, timedOut });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Activity Log ──────────────────────────────────────

router.get('/activity-log', requireLocalOnly, async (req, res) => {
  if (!rateLimit(req.ip)) return res.status(429).json({ error: 'Rate limit exceeded' });
  try {
    const { data } = await store.read('activityLog');
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    res.json({ logs: data.slice(0, limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
