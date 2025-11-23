# Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment

Every push to the `main` branch will automatically:
1. Build the library
2. Build the webapp
3. Deploy to GitHub Pages

The site will be available at: `https://[your-username].github.io/katexwhiteboard/`

### Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: Select **GitHub Actions**

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

3. **Monitor the deployment:**
   - Go to the **Actions** tab in your repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Once complete, your site will be live!

### Manual Deployment

If you prefer to deploy manually:

1. **Build the project:**
   ```bash
   npm run build:gh-pages
   ```

2. **The build output will be in `webapp/dist/`**

3. **Deploy using GitHub CLI or manually:**
   ```bash
   # Using GitHub CLI (if installed)
   gh workflow run deploy.yml
   ```

### Local Testing of Production Build

To test the production build locally:

```bash
# Build for production
npm run build:gh-pages

# Preview the build (from webapp directory)
cd webapp
npx vite preview --port 3000
```

### Configuration

The deployment is configured in:
- **`.github/workflows/deploy.yml`** - GitHub Actions workflow
- **`webapp/vite.config.ts`** - Base path set to `/katexwhiteboard/`
- **`package.json`** - Build scripts

### Troubleshooting

**404 on GitHub Pages:**
- Make sure GitHub Pages is enabled in Settings
- Verify the source is set to "GitHub Actions"
- Check that the base path in `vite.config.ts` matches your repository name

**Build fails:**
- Check the Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Test the build locally with `npm run build:gh-pages`

**Blank page after deployment:**
- Verify the base path in `vite.config.ts` is correct
- Check browser console for errors
- Ensure all assets are loading from the correct path

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `webapp/public/`:
   ```
   yourdomain.com
   ```

2. Configure your domain's DNS settings
3. Enable custom domain in GitHub Pages settings

### Environment Variables

If you need environment variables:

1. Add them to GitHub repository secrets
2. Update `.github/workflows/deploy.yml` to include them
3. Access them in your code via `import.meta.env`

---

**Your site will be live at:**
`https://[your-username].github.io/katexwhiteboard/`

Replace `[your-username]` with your actual GitHub username.

