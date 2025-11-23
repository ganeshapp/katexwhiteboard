# 🚀 Manual Deployment to GitHub Pages

Since GitHub Actions requires billing, here's how to deploy manually by building locally and pushing to a `gh-pages` branch.

## 📋 One-Time Setup

### Step 1: Configure GitHub Pages

1. Go to your repository on GitHub: `https://github.com/ganeshapp/katexwhiteboard`
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select **"Deploy from a branch"**
   - **Branch**: Select **"gh-pages"** and **"/ (root)"**
4. Click **Save**

### Step 2: Verify Your Git Remote

```bash
cd /Users/gapp/Documents/github/katexwhiteboard
git remote -v
```

Make sure you see:
```
origin  git@github.com:ganeshapp/katexwhiteboard.git (fetch)
origin  git@github.com:ganeshapp/katexwhiteboard.git (push)
```

If not, set it up:
```bash
git remote add origin git@github.com:ganeshapp/katexwhiteboard.git
```

## 🚀 How to Deploy

Every time you want to deploy updates:

### Option 1: Use the Deploy Script (Easiest)

```bash
./deploy.sh
```

That's it! The script will:
1. Build the library
2. Build the webapp
3. Push to the `gh-pages` branch
4. Deploy to GitHub Pages

### Option 2: Manual Commands

If you prefer to run commands manually:

```bash
# 1. Build everything
npm run build:gh-pages

# 2. Navigate to build output
cd webapp/dist

# 3. Initialize git (first time only)
git init
git checkout -b gh-pages

# 4. Add and commit
git add -A
git commit -m "Deploy to GitHub Pages"

# 5. Push to gh-pages branch
git push -f git@github.com:ganeshapp/katexwhiteboard.git gh-pages:gh-pages

# 6. Go back to project root
cd ../..
```

## 🔍 Verification

After deploying:

1. Wait 1-2 minutes for GitHub to process
2. Visit: `https://ganeshapp.github.io/katexwhiteboard/`
3. Your site should be live!

## 🐛 Troubleshooting

### "Permission denied (publickey)"

**Problem:** Can't push to GitHub

**Solution:** Set up SSH key or use HTTPS instead

Change the deploy script to use HTTPS:
```bash
# In deploy.sh, replace the git push line with:
git push -f https://github.com/ganeshapp/katexwhiteboard.git gh-pages:gh-pages
```

### "gh-pages branch not found" in GitHub Pages settings

**Problem:** Branch doesn't exist yet

**Solution:** Run the deploy script once to create it:
```bash
./deploy.sh
```

Then go back to Settings → Pages and select the `gh-pages` branch.

### Site shows 404

**Solutions:**
1. Wait a few minutes and refresh
2. Verify GitHub Pages is enabled in Settings → Pages
3. Check that "Source" is set to "Deploy from a branch"
4. Check that "Branch" is set to "gh-pages" and "/ (root)"
5. Clear your browser cache

### Build fails

**Solution:** Run the build locally to see errors:
```bash
npm run build:gh-pages
```

Fix any errors, then deploy again.

## 📝 Workflow

Your typical workflow:

```bash
# 1. Make changes to your code
# ... edit files ...

# 2. Test locally
npm run dev

# 3. Commit your changes to main branch
git add .
git commit -m "Your changes"
git push origin main

# 4. Deploy to GitHub Pages
./deploy.sh
```

## 🎯 What Gets Deployed

The deploy script builds and deploys:
- All webapp files from `webapp/dist/`
- The built library (embedded in the webapp)
- All static assets

Your source code stays in the `main` branch, and the built site goes to the `gh-pages` branch.

## ✨ Success!

Once deployed, your site is live at:
```
https://ganeshapp.github.io/katexwhiteboard/
```

Share it with the world! 🎉

## 🔄 Updating Your Site

To update your deployed site:

1. Make changes to your code
2. Test locally with `npm run dev`
3. Run `./deploy.sh`
4. Wait 1-2 minutes
5. Refresh your browser

That's it!

