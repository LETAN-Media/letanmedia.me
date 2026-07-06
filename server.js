import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 4000;

// Proxy API calls to the original server
app.use(
  '/api/report-tiktok/chat',
  createProxyMiddleware({
    target: 'https://letanmedia.site',
    changeOrigin: true,
    secure: true,
  })
);

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

// SPA fallback: serve index.html for all routes, EXCEPT static assets
app.use((req, res, next) => {
  // If the request is for a static asset (has a file extension), do not fall back to index.html
  const ext = path.extname(req.path);
  if (ext && ext !== '.html') {
    return res.status(404).send('Not Found');
  }

  // Set no-cache headers for the index.html fallback
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
});
