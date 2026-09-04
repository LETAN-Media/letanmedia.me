#!/bin/bash
set -e
echo === Deploying letanmedia.me ===

# Pull latest
git pull origin main

# Install dependencies if changed
npm install --production=false

# Build
npm run build

# Restart PM2
pm2 restart letan-web

echo === Deploy complete ===
