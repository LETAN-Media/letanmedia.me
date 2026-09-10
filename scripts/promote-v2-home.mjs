/**
 * Promote V2 static Peach runtime to the site root.
 *
 * public/v2/index.html is the canonical source of the homepage.
 * vite build copies it verbatim to dist/v2/index.html; this script
 * additionally publishes it as dist/index.html so https://letanmedia.me/
 * serves V2 without any client-side redirect.
 *
 * MUST run AFTER prerender + sitemap, otherwise prerender overwrites
 * dist/index.html with the V1 React shell.
 */

import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SRC = resolve(ROOT, 'public/v2/index.html');
const DIST_ROOT = resolve(ROOT, 'dist/index.html');
const DIST_V2 = resolve(ROOT, 'dist/v2/index.html');
const DIST_SHELL = resolve(ROOT, 'dist/app-shell.html');

if (!existsSync(SRC)) {
  throw new Error(`[promote-v2-home] Missing V2 source: ${SRC}`);
}
if (!existsSync(DIST_V2)) {
  throw new Error(`[promote-v2-home] Missing dist/v2/index.html — did vite build copy public/?`);
}

// Preserve the React shell (prerendered "/" output) before overwriting it.
// server.js uses it as the SPA fallback for routes without a prerendered file
// (/data-deletion, /geo-entity-manager, /solutions/*, ...).
copyFileSync(DIST_ROOT, DIST_SHELL);

copyFileSync(SRC, DIST_ROOT);

const a = readFileSync(SRC);
const b = readFileSync(DIST_ROOT);

if (!a.equals(b)) {
  throw new Error('[promote-v2-home] dist/index.html does not match public/v2/index.html');
}

if (!b.includes('pwb-body-wrap')) {
  throw new Error('[promote-v2-home] dist/index.html missing pwb-body-wrap — not the V2 runtime');
}

const shell = readFileSync(DIST_SHELL, 'utf-8');
if (!shell.includes('<div id="root"')) {
  throw new Error('[promote-v2-home] dist/app-shell.html is not a React shell');
}

console.log(`[promote-v2-home] / -> V2 (${b.length} bytes), /v2/ intact, SPA shell -> dist/app-shell.html`);
