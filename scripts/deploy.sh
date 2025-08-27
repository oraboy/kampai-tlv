#!/bin/bash
echo "🚀 Deploying Kampai TLV"

# Deploy website to Netlify
echo "📦 Deploying website..."
cd kampai-app
git add .
git commit -m "Deploy: $(date +%Y-%m-%d)"
git push origin main

echo "✅ Deployment complete!"
echo "Website will be live at your Netlify URL in ~1 minute"
