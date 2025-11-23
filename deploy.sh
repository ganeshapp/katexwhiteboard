#!/bin/bash

# Deploy to GitHub Pages (Manual)
# This script builds the project and pushes to gh-pages branch

set -e

echo "🔨 Building the project..."

# Build the library
echo "Building library..."
npm run lib:build

# Build the webapp
echo "Building webapp..."
npm run build --workspace=webapp

echo "✅ Build complete!"

# Navigate to build output
cd webapp/dist

# Initialize git if needed
if [ ! -d .git ]; then
  git init
  git checkout -b gh-pages
fi

# Add all files
git add -A

# Commit
echo "📝 Committing changes..."
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
echo "🚀 Deploying to GitHub Pages..."
git push -f https://github.com/ganeshapp/katexwhiteboard.git gh-pages:gh-pages

echo "✨ Deployment complete!"
echo "Your site will be available at: https://ganeshapp.github.io/katexwhiteboard/"
echo "It may take a few minutes to update."

cd ../..

