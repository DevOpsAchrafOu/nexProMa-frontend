# nexProMa — context for Claude Code

Owner: Ouakka Achraf (OA), freelance web/mobile team (Morocco), selling to local businesses.
Conversation language with the owner: French / Moroccan Darija.

## What lives where
- `src/` — original Angular 12 store (nexProMa). Built output is in `docs/` and served by GitHub Pages.
- `redesign-app/` — conversion-focused redesign of the home page, **Angular 22** (standalone components, signals, zoneless).
  Needs Node 22.22+ (the old `src/` app needs Node 16). See `redesign-app/README.md`.
- `docs/redesign/` — build output of `redesign-app` (`cd redesign-app && npm run build`). Never hand-edit; commit it after building.
  Every page is prerendered to static HTML (Angular `outputMode: static`): home + 30 product pages, in EN (root) and FR (`/fr/`), plus `sitemap.xml`.
  Live: https://devopsachrafou.github.io/nexProMa-frontend/redesign/
- If the site moves to its own domain: change `SITE_URL` in `redesign-app/src/app/data/site-data.ts` and `baseHref` in `redesign-app/angular.json`.

## Decisions already made (keep them)
- Languages EN / FR only, **English by default** (Arabic was removed at the owner's request on 2026-11-20; it is in git history before PR "Modern language switch"). Every new text needs both (`ui` in `redesign-app/src/app/data/site-data.json`).
- WhatsApp: the redesign uses a **fictional number** (212600000000) and the number is **not displayed** anywhere; buttons still open WhatsApp with a prefilled order message.
- Products: 30 (duplicate #21 removed; #25 labelled "style 2"). **4 shown by default** with photo slideshow; "See all products" reveals the rest. Search / category / sort reveal all.
- Design tokens: navy #0F1B3D text, brand blue #1F4FE0, buy green #078A3E, discount yellow #FFC93C, page #F2F4F8. Font: Plus Jakarta Sans. Language switch: pill with a sliding blue thumb.
- Only use facts from the store itself (free delivery Salé & Rabat, Témara on weekends, cash on delivery, after-sales 24/7). Do not invent delivery times, ratings or reviews.
- Footer signature: "Redesign by OA".

## Deploying
- Push to `main` → GitHub Pages redeploys (two jobs: branch build from `docs/` and `.github/workflows/static.yml`, which also uploads `docs/`).
- Work on a branch, open a PR, merge. Hard refresh (Ctrl+Shift+R) to see changes.

## Related repo
- `DevOpsAchrafOu/Templates-site-web` — FOCAL template; its redesign is `redesign/index.html` there.
