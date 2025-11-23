# 🚀 GitHub Pages Deployment Checklist

Follow these steps to deploy your KaTeX Whiteboard to GitHub Pages.

## ✅ Pre-Deployment Checklist

- [ ] Code is working locally (`npm run dev`)
- [ ] Production build works (`npm run build:gh-pages`)
- [ ] All changes are committed
- [ ] Repository exists on GitHub

## 📋 Deployment Steps

### Step 1: Push Your Code

```bash
# Make sure you're on the main branch
git checkout main

# Add all files
git add .

# Commit your changes
git commit -m "Setup GitHub Pages deployment"

# Push to GitHub
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select **GitHub Actions** (not "Deploy from a branch")
5. Save

### Step 3: Wait for Deployment

1. Go to the **Actions** tab
2. You'll see "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-5 minutes)
4. Once green ✅, your site is live!

### Step 4: Access Your Site

Your site will be available at:
```
https://[YOUR-GITHUB-USERNAME].github.io/katexwhiteboard/
```

Replace `[YOUR-GITHUB-USERNAME]` with your actual GitHub username.

## 🔍 Verification

Visit your deployed site and test:
- [ ] Page loads without errors
- [ ] Sidebar appears on the left
- [ ] Excalidraw canvas loads
- [ ] Can enter a KaTeX expression
- [ ] "Draw Equation" button works
- [ ] Equations render on the canvas
- [ ] Example equations work

## 🐛 Troubleshooting

### Site shows 404

**Solution:**
- Make sure GitHub Pages is enabled
- Verify Source is set to "GitHub Actions"
- Check that workflow completed successfully
- Wait a few minutes and refresh

### Blank white page

**Solution:**
- Open browser console (F12)
- Check for errors
- Verify the base path in `webapp/vite.config.ts` matches your repo name
- Make sure it's `/katexwhiteboard/` (with slashes)

### Build fails in Actions

**Solution:**
- Go to Actions tab and check the error log
- Common issues:
  - Missing dependencies: Run `npm install` locally
  - TypeScript errors: Run `npm run build:gh-pages` locally to see errors
  - Fix errors and push again

### Assets not loading

**Solution:**
- Check that base path is correct in `vite.config.ts`
- Should be: `base: '/katexwhiteboard/'`
- Clear browser cache and try again

## 🔄 Updating Your Deployment

Every time you push to `main`, GitHub Actions will automatically:
1. Build the library
2. Build the webapp
3. Deploy to GitHub Pages

So just:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

And wait for the Action to complete!

## 📝 Notes

- **First deployment** may take 5-10 minutes
- **Subsequent deployments** usually take 2-3 minutes
- You can see deployment progress in the **Actions** tab
- The site is served over HTTPS automatically
- You can use a custom domain if desired (see DEPLOYMENT.md)

## ✨ Success!

Once deployed, share your link:
```
https://[YOUR-USERNAME].github.io/katexwhiteboard/
```

Enjoy your handwritten math equations! 🎉

