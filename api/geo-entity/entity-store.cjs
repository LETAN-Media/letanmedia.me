/**
 * Secure Local JSON Storage
 * Phase 1A — Atomic writes, file locking, schema validation
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = '/var/lib/letanmedia/geo-entity';
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

const FILES = {
  draft: 'entity-draft.json',
  sources: 'sources.json',
  activityLog: 'activity-log.json',
};

const SCHEMAS = {
  draft: {
    required: ['entity', 'proposedStatements'],
    entityRequired: ['id', 'name', 'domains', 'entityTypes', 'legalStatus'],
  },
  sources: {
    type: 'array',
    maxItems: 100,
  },
  activityLog: {
    type: 'array',
    maxItems: 1000,
  },
};

const locks = new Map();

function acquireLock(filePath) {
  return new Promise((resolve) => {
    const tryLock = () => {
      if (!locks.get(filePath)) {
        locks.set(filePath, true);
        resolve();
      } else {
        setTimeout(tryLock, 10);
      }
    };
    tryLock();
  });
}

function releaseLock(filePath) {
  locks.delete(filePath);
}

function getFilePath(type) {
  if (!FILES[type]) {
    throw new Error(`Unknown file type: ${type}`);
  }
  return path.join(DATA_DIR, FILES[type]);
}

function validateDraft(data) {
  if (!data || typeof data !== 'object') return false;
  if (!data.entity || typeof data.entity !== 'object') return false;
  if (!data.entity.id || typeof data.entity.id !== 'string') return false;
  if (!data.entity.name || typeof data.entity.name !== 'string') return false;
  if (!Array.isArray(data.entity.domains)) return false;
  if (!Array.isArray(data.entity.entityTypes)) return false;
  if (!data.entity.legalStatus || typeof data.entity.legalStatus !== 'string') return false;
  if (!data.proposedStatements || typeof data.proposedStatements !== 'object') return false;
  return true;
}

function validateSources(data) {
  if (!Array.isArray(data)) return false;
  if (data.length > SCHEMAS.sources.maxItems) return false;
  return data.every(s => s && typeof s === 'object' && s.id && typeof s.id === 'string');
}

function validateActivityLog(data) {
  if (!Array.isArray(data)) return false;
  if (data.length > SCHEMAS.activityLog.maxItems) return false;
  return data.every(e => e && typeof e === 'object' && e.action && e.timestamp);
}

const VALIDATORS = {
  draft: validateDraft,
  sources: validateSources,
  activityLog: validateActivityLog,
};

function computeHash(data) {
  return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex').slice(0, 16);
}

function readRaw(type) {
  const filePath = getFilePath(type);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

function writeAtomic(filePath, data) {
  const tmpPath = `${filePath}.tmp.${Date.now()}`;
  const content = JSON.stringify(data, null, 2);
  if (Buffer.byteLength(content) > MAX_FILE_SIZE) {
    throw new Error('File size exceeds limit');
  }
  fs.writeFileSync(tmpPath, content, 'utf8');
  fs.renameSync(tmpPath, filePath);
}

function backup(type) {
  const filePath = getFilePath(type);
  const backupDir = path.join(DATA_DIR, 'backups');
  try {
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    if (fs.existsSync(filePath)) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(backupDir, `${FILES[type]}.${timestamp}.bak`);
      fs.copyFileSync(filePath, backupPath);
      // Keep only last 10 backups
      const backups = fs.readdirSync(backupDir)
        .filter(f => f.startsWith(FILES[type]))
        .sort()
        .reverse();
      for (const old of backups.slice(10)) {
        fs.unlinkSync(path.join(backupDir, old));
      }
    }
  } catch (err) {
    console.error(`Backup failed for ${type}:`, err.message);
  }
}

async function read(type) {
  const data = readRaw(type);
  if (data === null) {
    return { data: getDefaults(type), hash: null };
  }
  return { data, hash: computeHash(data) };
}

async function write(type, data) {
  const validate = VALIDATORS[type];
  if (validate && !validate(data)) {
    throw new Error(`Invalid data for ${type}`);
  }
  await acquireLock(type);
  try {
    backup(type);
    const filePath = getFilePath(type);
    writeAtomic(filePath, data);
    return { success: true, hash: computeHash(data) };
  } finally {
    releaseLock(type);
  }
}

async function appendActivityLog(entry) {
  const { data: log } = await read('activityLog');
  const newEntry = {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    actor: entry.actor || 'system',
    action: entry.action,
    targetType: entry.targetType || null,
    targetId: entry.targetId || null,
    beforeHash: entry.beforeHash || null,
    afterHash: entry.afterHash || null,
    result: entry.result || 'success',
    details: entry.details || null,
  };
  log.unshift(newEntry);
  if (log.length > SCHEMAS.activityLog.maxItems) {
    log.length = SCHEMAS.activityLog.maxItems;
  }
  await write('activityLog', log);
  return newEntry;
}

function getDefaults(type) {
  if (type === 'draft') {
    return {
      entity: {
        id: 'draft-letan-media',
        name: 'LETAN MEDIA',
        aliases: ['Letan Media', 'Le Tan Media', 'Lê Tấn Media'],
        domains: [
          {
            url: 'https://letanmedia.me',
            type: 'ai-marketing-agency',
            label: 'AI marketing agency website',
          },
          {
            url: 'https://letanmedia.site',
            type: 'social-media-services',
            label: 'Social media services website',
          },
        ],
        entityTypes: ['brand', 'digital media project'],
        legalStatus: 'LEGAL_STATUS_UNVERIFIED',
        canonicalDomain: null,
        officialWebsiteWikidata: null,
        qid: null,
      },
      proposedStatements: {
        instanceOf: [],
        officialName: 'LETAN MEDIA',
        country: null,
        headquarters: null,
        officialWebsite: null,
        inception: null,
        industry: [],
        socialProfiles: [],
      },
      duplicateResults: [],
      lastUpdated: new Date().toISOString(),
    };
  }
  if (type === 'sources') return [];
  if (type === 'activityLog') return [];
  return null;
}

module.exports = {
  read,
  write,
  appendActivityLog,
  getDefaults,
  computeHash,
};
