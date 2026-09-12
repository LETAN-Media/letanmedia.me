import 'dotenv/config';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { askMetaAI } from './aimeta/ai.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 4000;

app.use(express.json({ limit: '1mb' }));

// ─── Contact / Lead API ──────────────────────────────────────
const CONTACT_RATE_LIMIT = new Map(); // ip -> { count, resetAt }
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max 5 submissions per hour

function rateLimit(ip) {
  const now = Date.now();
  const entry = CONTACT_RATE_LIMIT.get(ip);
  if (!entry || now > entry.resetAt) {
    CONTACT_RATE_LIMIT.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

// Cleanup stale entries every 10 min
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of CONTACT_RATE_LIMIT) {
    if (now > entry.resetAt) CONTACT_RATE_LIMIT.delete(ip);
  }
}, 10 * 60 * 1000);

const VALID_SERVICES = [
  'seo-geo', 'social-media', 'paid-ads', 'tiktok-growth',
  'platform-protection', 'chatbot-ai', 'website-development', 'other',
];
const VALID_CONTACT_PREFS = ['zalo', 'telegram', 'phone', 'email'];

app.post('/api/contact', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  // Rate limit
  if (rateLimit(ip)) {
    return res.status(429).json({ error: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.' });
  }

  const { name, company, contact, service, website, budget, message, preferredContact, sourcePage, referrer, utmSource, utmMedium, utmCampaign, utmContent, utmTerm } = req.body || {};

  // Server-side validation
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
    return res.status(400).json({ error: 'Dữ liệu không hợp lệ.', fields: errors });
  }

  // Sanitize
  const sanitize = (v) => typeof v === 'string' ? v.trim().replace(/[<>]/g, '') : null;
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

  // Log lead (production: send email / store in DB)
  console.log('[NEW LEAD]', JSON.stringify(lead, null, 2));

  // TODO: When email credentials are configured, send lead notification email.
  // const { SENDGRID_API_KEY, LEAD_EMAIL } = process.env;
  // if (SENDGRID_API_KEY && LEAD_EMAIL) { ... }

  return res.status(200).json({ success: true, message: 'Đã nhận thông tin. LETAN sẽ liên hệ trong 24h.' });
});

// GEO Entity Manager API (Phase 1A — local only)
const geoRoutes = require('./api/geo-entity/routes.cjs');
app.use('/api/geo', geoRoutes);

// Proxy API calls to the original server
app.use(
  ['/api/report-tiktok/chat', '/api/report-youtube/chat', '/api/home-chat/chat'],
  createProxyMiddleware({
    target: 'https://letanmedia.me',
    changeOrigin: true,
    secure: true,
  })
);


// Facebook Messenger Webhook
const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;

// Meta webhook verification
app.get('/webhook/facebook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === FB_VERIFY_TOKEN) {
    console.log('[Facebook] Webhook verified');
    return res.status(200).send(challenge);
  }

  console.warn('[Facebook] Webhook verification failed');
  return res.sendStatus(403);
});



async function sendFacebookMessage(psid, text) {
  const token = process.env.FB_PAGE_ACCESS_TOKEN;

  text = String(text || '').trim();
  if (text.length > 950) {
    text = text.slice(0, 940).trim() + '…';
  }

  if (!text) {
    console.warn('[Facebook] Suppressed empty message to psid:', psid);
    return;
  }

  if (!token) {
    console.error('[Facebook] Missing FB_PAGE_ACCESS_TOKEN');
    return;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v23.0/me/messages?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: { id: psid },
          messaging_type: 'RESPONSE',
          message: { text },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('[Facebook] Send failed:', data);
      return;
    }

    console.log('[Facebook] Reply sent:', data);
  } catch (err) {
    console.error('[Facebook] Send error:', err.message);
  }
}

// Receive Messenger events
app.post('/webhook/facebook', (req, res) => {
  const body = req.body;

  console.log('[Facebook] Incoming webhook:', JSON.stringify(body));

  if (body.object !== 'page') {
    return res.sendStatus(404);
  }

  for (const entry of body.entry || []) {
    for (const event of entry.messaging || []) {
      if (event.message?.text && !event.message?.is_echo) {
        const senderId = event.sender?.id;
        const text = event.message.text;

        console.log(
          '[Facebook] Message:',
          'sender=', senderId,
          'text=', text
        );

        askMetaAI(senderId, text)
          .then(reply => {
            if (reply) {
              return sendFacebookMessage(senderId, reply);
            }
          })
          .catch(err => {
            console.error('[AIMeta] Reply error:', err);
            return sendFacebookMessage(
              senderId,
              'Chào bạn, LÊ TẤN MEDIA có thể hỗ trợ gì cho bạn ạ? Bạn có thể nhắn chi tiết hoặc liên hệ hotline/Zalo: 0765178999 để bên mình tư vấn nhanh nhất nhé!'
            );
          });
      }
    }
  }

  // Meta expects a fast 200 response
  return res.status(200).send('EVENT_RECEIVED');
});

// Serve static files with proper caching for hashed assets
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  setHeaders: (res, filePath) => {
    // If it's the index.html, never cache it
    if (path.basename(filePath) === 'index.html') {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    }
  }
}));

// SPA fallback: serve the React shell for all routes, EXCEPT static assets.
// NOTE: dist/index.html is the static V2 Peach homepage, not the React app,
// so the fallback must use dist/app-shell.html (written by promote-v2-home.mjs).
const APP_SHELL = path.join(__dirname, 'dist', 'app-shell.html');
const SPA_FALLBACK = fs.existsSync(APP_SHELL)
  ? APP_SHELL
  : path.join(__dirname, 'dist', 'index.html');

app.use((req, res, next) => {
  // If the request is for a static asset (has a file extension), do not fall back to the shell
  const ext = path.extname(req.path);
  if (ext && ext !== '.html') {
    return res.status(404).send('Not Found');
  }

  // Set no-cache headers for the SPA shell fallback
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.sendFile(SPA_FALLBACK);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log('Server running on port ' + PORT);
});
