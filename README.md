# Buchule Group — website

Static site. No build step. All assets are relative, so the folder can be
served as-is by any static host (GitHub Pages, Netlify, Cloudflare Pages, etc.).

## Files
- `index.html` — the site (entry point)
- `Buchule Group Website.html` — identical copy (working file)
- `styles.css`, `app.js` — styles + interactions
- `tweaks-panel.jsx`, `tweaks-app.jsx` — the in-page Tweaks panel (hidden in production)
- `assets/buchule-logo.png` — the original logo

## Publish on GitHub Pages
1. Create a new repository on github.com (e.g. `buchule-website`).
2. Upload these files to the repo root — either:
   - drag-and-drop the unzipped folder contents into the repo's "Add file → Upload files" page, or
   - `git init && git add . && git commit -m "site" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`
3. In the repo: **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, **Branch: `main` / `(root)`**, then **Save**.
5. Wait ~1 minute. Your site goes live at `https://<your-username>.github.io/<repo-name>/`.

A `.nojekyll` file is included so GitHub serves every file as-is.

## Custom domain (optional)
Settings → Pages → Custom domain → enter e.g. `buchulegroup.co.za`, then add the
DNS records GitHub shows you at your domain registrar.
