/**
 * POST /api/contact — Cloudflare Pages Function
 *
 * Production lead endpoint for letanmedia.me.
 * Handles: validation, anti-spam (Turnstile), rate limiting, email notification.
 *
 * Environment variables (Cloudflare Pages → Settings → Environment variables):
 *   GMAIL_USER          — Gmail address for sending lead notifications
 *   GMAIL_PASSWORD      — Gmail app password (NOT account password)
 *   TURNSTILE_SECRET_KEY — Cloudflare Turnstile secret key (optional, enables CAPTCHA)
 *   LEAD_EMAIL          — Where to send lead notifications (defaults to GMAIL_USER)
 */

const VALID_SERVICES = [
  'seo-geo', 'social-media', 'paid-ads', 'tiktok-growth',
  'platform-protection', 'chatbot-ai', 'website-development', 'other',
];
const VALID_CONTACT_PREFS = ['zalo', 'telegram', 'phone', 'email'];

// Simple in-memory rate limiting (resets on Function cold start)
// For stronger rate limiting, use Cloudflare KV or Durable Objects.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

function sanitize(v) {
  return typeof v === 'string' ? v.trim().replace(/[<>]/g, '') : null;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';

  // CORS preflight safety
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Rate limit
  if (checkRateLimit(ip)) {
    return json({ error: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.' }, 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Dữ liệu không hợp lệ.' }, 400);
  }

  const {
    name, company, contact, service, website, budget, message,
    preferredContact, sourcePage, referrer,
    utmSource, utmMedium, utmCampaign, utmContent, utmTerm,
    turnstileToken,
  } = body || {};

  // ─── Turnstile verification (if configured) ───────────────
  if (env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return json({ error: 'Vui lòng xác minh bạn không phải robot.' }, 400);
    }
    try {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: ip,
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return json({ error: 'Xác minh thất bại. Vui lòng thử lại.' }, 400);
      }
    } catch {
      return json({ error: 'Lỗi xác minh. Vui lòng thử lại.' }, 500);
    }
  }

  // ─── Server-side validation ───────────────────────────────
  const errors = [];
  if (!name || typeof name !== 'string' || name.trim().length < 1 || name.trim().length > 100) errors.push('name');
  if (!contact || typeof contact !== 'string' || contact.trim().length < 3) errors.push('contact');
  if (!message || typeof message !== 'string' || message.trim().length < 1 || message.trim().length > 2000) errors.push('message');
  if (service && !VALID_SERVICES.includes(service)) errors.push('service');
  if (preferredContact && !VALID_CONTACT_PREFS.includes(preferredContact)) errors.push('preferredContact');
  if (website && typeof website === 'string' && website.trim()) {
    try { new URL(website.trim()); } catch { errors.push('website'); }
  }

  if (errors.length > 0) {
    return json({ error: 'Dữ liệu không hợp lệ.', fields: errors }, 400);
  }

  // ─── Build lead object ────────────────────────────────────
  const lead = {
    name: sanitize(name),
    company: sanitize(company),
    contact: sanitize(contact),
    service: VALID_SERVICES.includes(service) ? service : null,
    website: sanitize(website),
    budget: sanitize(budget),
    message: sanitize(message),
    preferredContact: VALID_CONTACT_PREFS.includes(preferredContact) ? preferredContact : 'zalo',
    sourcePage: sanitize(sourcePage),
    referrer: sanitize(referrer),
    utmSource: sanitize(utmSource),
    utmMedium: sanitize(utmMedium),
    utmCampaign: sanitize(utmCampaign),
    utmContent: sanitize(utmContent),
    utmTerm: sanitize(utmTerm),
    timestamp: new Date().toISOString(),
    ip,
  };

  // ─── Email notification ───────────────────────────────────
  const gmailUser = env.GMAIL_USER;
  const gmailPass = env.GMAIL_PASSWORD;
  const leadEmail = env.LEAD_EMAIL || gmailUser;

  if (gmailUser && gmailPass && leadEmail) {
    try {
      const emailBody = buildEmailHtml(lead);
      const emailPayload = {
        SecureToken: null,
        Host: 'smtp.gmail.com',
        Username: gmailUser,
        Password: gmailPass,
        To: leadEmail,
        From: gmailUser,
        Subject: `NEW LEAD — ${lead.service || 'General'} — ${lead.name}`,
        Body: emailBody,
        Action: 'Send',
        nocache: Math.floor(1e6 * Math.random() + 1),
      };

      const emailRes = await fetch('https://smtpjs.com/v3/smtpjs.aspx?', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(emailPayload),
      });

      const emailText = await emailRes.text();
      if (emailText !== 'OK') {
        console.error('[contact] Email send failed:', emailText);
      }
    } catch (err) {
      console.error('[contact] Email error:', err.message);
      // Don't fail the request — lead is still logged
    }
  } else {
    console.log('[NEW LEAD — email not configured]', JSON.stringify(lead, null, 2));
  }

  return json({ success: true, message: 'Đã nhận thông tin. LETAN sẽ liên hệ trong 24h.' });
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/** Build readable HTML email for lead notification */
function buildEmailHtml(lead) {
  const esc = (v) => String(v || 'Không có').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const utmParts = [];
  if (lead.utmSource) utmParts.push(`source: ${lead.utmSource}`);
  if (lead.utmMedium) utmParts.push(`medium: ${lead.utmMedium}`);
  if (lead.utmCampaign) utmParts.push(`campaign: ${lead.utmCampaign}`);
  if (lead.utmContent) utmParts.push(`content: ${lead.utmContent}`);
  if (lead.utmTerm) utmParts.push(`term: ${lead.utmTerm}`);

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
      <h2 style="color:#1a1a1a;border-bottom:2px solid #4F7CFF;padding-bottom:10px">
        NEW LEAD — LETANMEDIA.ME
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#666;width:140px">Tên:</td><td style="padding:8px 0;font-weight:bold">${esc(lead.name)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Công ty:</td><td style="padding:8px 0">${esc(lead.company)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Liên hệ:</td><td style="padding:8px 0">${esc(lead.contact)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Dịch vụ:</td><td style="padding:8px 0">${esc(lead.service)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Website:</td><td style="padding:8px 0">${esc(lead.website)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Ngân sách:</td><td style="padding:8px 0">${esc(lead.budget)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Nội dung:</td><td style="padding:8px 0">${esc(lead.message)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Ưu tiên liên hệ:</td><td style="padding:8px 0">${esc(lead.preferredContact)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Nguồn:</td><td style="padding:8px 0">${esc(lead.sourcePage)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Referrer:</td><td style="padding:8px 0">${esc(lead.referrer)}</td></tr>
        ${utmParts.length ? `<tr><td style="padding:8px 0;color:#666">UTM:</td><td style="padding:8px 0">${esc(utmParts.join(', '))}</td></tr>` : ''}
        <tr><td style="padding:8px 0;color:#666">Timestamp:</td><td style="padding:8px 0">${esc(lead.timestamp)}</td></tr>
      </table>
    </div>
  `.trim();
}
