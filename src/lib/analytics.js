/**
 * Analytics abstraction.
 *
 * No hard-coded provider IDs. The GA4 measurement ID is read from
 * import.meta.env.VITE_GA4_ID (set in Cloudflare Pages env / .env).
 * If absent, tracking is a no-op so we never ship a fake ID.
 *
 * All event names are centralized here so call sites stay declarative.
 */

export const ANALYTICS_EVENTS = {
  CLICK_PRIMARY_CTA: 'click_primary_cta',
  CLICK_PHONE: 'click_phone',
  CLICK_ZALO: 'click_zalo',
  CLICK_TELEGRAM: 'click_telegram',
  CLICK_EMAIL: 'click_email',
  OPEN_CHAT: 'open_chat',
  SUBMIT_CONTACT: 'submit_contact',
  VIEW_SERVICE: 'view_service',
  VIEW_CASE_STUDY: 'view_case_study',
  VIEW_INSIGHT: 'view_insight',
  VIEW_WORK: 'view_work',
  VIEW_PRODUCT: 'view_product',
  VIEW_CONTACT: 'view_contact',
  FORM_START: 'form_start',
  FORM_ERROR: 'form_error',
  GENERATE_LEAD: 'generate_lead',
};

let initialized = false;
let ga4Id = null;

export function initAnalytics() {
  if (initialized) return;
  initialized = true;
  ga4Id = import.meta.env.VITE_GA4_ID || null;
  if (!ga4Id) {
    if (import.meta.env.DEV) {
      console.info('[analytics] no VITE_GA4_ID set — tracking disabled (no-op).');
    }
    return;
  }
  // Minimal gtag bootstrap. Replace/extend when real provider config exists.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', ga4Id);
}

export function track(event, props = {}) {
  if (!ga4Id) return;
  try {
    window.gtag('event', event, props);
  } catch (e) {
    if (import.meta.env.DEV) console.warn('[analytics] track failed', e);
  }
}

export function trackClick(eventName, props = {}) {
  track(eventName, { ...props, _interaction: true });
}
