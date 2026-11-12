# NaiApps

A static showcase site for my apps, ready for GitHub Pages. No build step: plain
HTML, CSS and a little JavaScript.

```
index.html               hub page listing every app
apps/bodapro/            BodaPro page (+ img/)
assets/css/style.css     shared styles; each app page adds its own brand theme
assets/js/bodapro.js     BodaPro ring demo + Bike Yangu payoff simulator
.nojekyll                tells GitHub Pages to serve files as-is
```

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Publish on GitHub Pages

```bash
git init -b main
git add .
git commit -m "NaiApps: hub + BodaPro page"
git remote add origin git@github.com:<your-user>/NaiApps.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Deploy from a branch →
`main` / `(root)`**. The site appears at `https://<your-user>.github.io/NaiApps/`.

All links are relative, so the site works under `/NaiApps/` or on a custom domain.

## Adding another app (e.g. FitCrew)

1. Copy `apps/bodapro/` to `apps/fitcrew/` and replace the content and images.
2. Add a `.theme-fitcrew { … }` block in `style.css` with that app's colours.
3. Replace the "More apps coming" card in `index.html` with a card that links to it.
