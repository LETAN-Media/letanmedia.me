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

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback: serve index.html for all routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
});
