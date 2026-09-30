# OT Routine Planner — GitHub Pages v18

This repository is ready to host directly with **GitHub Pages**.

## What is included

- One-time name entry
- The browser remembers the name on that device
- Activity Bank
- Custom activities
- Activity countdown timers
- Smart/offline “I’m stuck” task breakdown
- Motivation timer
- Support tools
- Save / backup features
- PWA manifest
- Service worker / offline app shell
- iPhone/iPad/Android Home Screen support
- GitHub Pages deployment workflow

## Publish it on GitHub Pages

### 1. Create a repository
Create a new GitHub repository.

### 2. Upload everything in this folder
The repository root should contain:

- `index.html`
- `planner.html`
- `manifest.webmanifest`
- `sw.js`
- `icon-192.png`
- `icon-512.png`
- `.nojekyll`
- `.github/workflows/deploy-pages.yml`

Do not upload the ZIP itself as the website content. Unzip it first and upload the files/folders.

### 3. Enable GitHub Pages
In the repository:

**Settings → Pages → Build and deployment → Source → GitHub Actions**

### 4. Push/commit to `main`
The included workflow deploys automatically.

The site address will normally look like:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

## Add to a phone or iPad

### iPhone / iPad
Open the GitHub Pages URL in Safari:

**Share → Add to Home Screen**

Then open the Home Screen icon.

### Android
Open the URL in Chrome and choose:

**Install app / Add to Home screen**

## Important notification limitation

GitHub Pages is static hosting.

The activity timer and alarm work normally while the planner webpage/PWA is still running.

A **reliable system notification after the planner is completely closed** cannot be scheduled by GitHub Pages alone. That requires a small external Web Push backend, such as a Cloudflare Worker.

The included `sw.js` is already able to receive Web Push later, so a backend can be connected without rebuilding the whole planner.

## Data storage

The entered name, routine, custom activities and progress use browser local storage.

That means:
- the data stays on the same browser/device,
- a different phone will not automatically have the same data,
- clearing website data can remove it.

Use **Export backup** if the information is important.

## Updating the planner

Replace/edit the repository files and commit to `main`.

GitHub Actions will automatically republish the site while keeping the same GitHub Pages URL.
