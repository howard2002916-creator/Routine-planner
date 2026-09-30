# Routine Planner — GitHub Pages v19

This folder is the website.

Upload the **contents of this folder** to the root of your GitHub repository.

It includes:
- `index.html`
- `planner.html`
- `sw.js`
- `manifest.webmanifest`
- icons
- GitHub Pages workflow

## Closed-app notifications

The website now has a **Background timer notifications** section.

After you deploy the companion Cloudflare Worker from the `cloudflare-worker` folder:

1. Copy the Worker URL, for example:
   `https://routine-planner-notifications.your-subdomain.workers.dev`
2. Open the planner.
3. Paste the Worker URL into **Background timer notifications**.
4. Tap **Save server**.
5. On iPad/iPhone, add the GitHub Pages site to the Home Screen first.
6. Open the Home Screen app.
7. Tap **Enable notifications** and allow permission.
8. Tap **Test notification**.

The Worker URL is remembered on that device/browser.
v19 notification update
