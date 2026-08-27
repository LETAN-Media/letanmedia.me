/**
 * UTM Attribution — captures UTM parameters from URL and persists
 * in sessionStorage so attribution survives multi-page journeys.
 *
 * No fingerprinting. No third-party tracking.
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const STORAGE_KEY = 'letan_utm';

/**
 * Capture UTM params from current URL and persist to sessionStorage.
 * Call once on app init or on each route change.
 */
export function captureUtm() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  let hasUtm = false;

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) {
      utm[key] = val;
      hasUtm = true;
    }
  }

  if (hasUtm) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
    } catch { /* quota exceeded — ignore */ }
  }
}

/**
 * Get persisted UTM params. Returns empty object if none.
 */
export function getUtm() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Build UTM payload for API submission.
 */
export function buildUtmPayload() {
  const utm = getUtm();
  return {
    utmSource: utm.utm_source || null,
    utmMedium: utm.utm_medium || null,
    utmCampaign: utm.utm_campaign || null,
    utmContent: utm.utm_content || null,
    utmTerm: utm.utm_term || null,
  };
}
