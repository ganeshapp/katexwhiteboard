# 🚀 GitHub Pages Manual Deployment Checklist

Follow these steps to deploy your KaTeX Whiteboard to GitHub Pages (without GitHub Actions).

## ✅ Pre-Deployment Checklist

- [ ] Code is working locally (`npm run dev`)
- [ ] Production build works (`npm run build:gh-pages`)
- [ ] All changes are committed to main branch
- [ ] Repository exists on GitHub
- [ ] SSH key is set up (or ready to use HTTPS)

## 📋 Deployment Steps

### Step 1: Configure GitHub Pages (One-Time Setup)

1. Go to your GitHub repository: `https://github.com/ganeshapp/katexwhiteboard`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select **"Deploy from a branch"**
   - **Branch**: Select **"gh-pages"** and **"/ (root)"**
   - Click **Save**

**Note:** The `gh-pages` branch will be created automatically when you first deploy.

### Step 2: Deploy Using the Script

Simply run:

```bash
./deploy.sh
```

This will:
- Build the library
- Build the webapp
- Push to the `gh-pages` branch
- Deploy to GitHub Pages

### Step 3: Wait for GitHub Pages

1. Wait 1-2 minutes for GitHub to process
2. You'll get a notification that your site is published

### Step 4: Access Your Site

Your site will be available at:
```
https://ganeshapp.github.io/katexwhiteboard/
```

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

### "Permission denied (publickey)" error

**Solution:**
If you see this when deploying, edit `deploy.sh` and change the push line to use HTTPS:
```bash
git push -f https://github.com/ganeshapp/katexwhiteboard.git gh-pages:gh-pages
```

### "gh-pages branch not found" in Settings

**Solution:**
Run the deploy script once first to create the branch:
```bash
./deploy.sh
```
Then go back to Settings → Pages and select `gh-pages`.

### Site shows 404

**Solution:**
- Wait 2-3 minutes and refresh
- Verify GitHub Pages is enabled in Settings → Pages
- Check that Source is "Deploy from a branch"
- Check that Branch is "gh-pages" and "/ (root)"
- Clear browser cache

### Blank white page

**Solution:**
- Open browser console (F12) and check for errors
- Verify base path in `vite.config.ts` is `/katexwhiteboard/`
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Build fails

**Solution:**
Run locally to see the error:
```bash
npm run build:gh-pages
```
Fix any TypeScript or build errors, then deploy again.

### Deploy script fails

**Solution:**
Run commands manually (see MANUAL_DEPLOY.md):
```bash
npm run build:gh-pages
cd webapp/dist
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy"
git push -f https://github.com/ganeshapp/katexwhiteboard.git gh-pages:gh-pages
cd ../..
```

## 🔄 Updating Your Deployment

To update your live site:

```bash
# 1. Make changes and test locally
npm run dev

# 2. Commit changes to main branch
git add .
git commit -m "Your update message"
git push origin main

# 3. Deploy to GitHub Pages
./deploy.sh
```

That's it! Your site will update in 1-2 minutes.

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

