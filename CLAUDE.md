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
- WhatsApp: the store's **real number** +212 7 68 80 81 46 (same as the old store), set as `wa` in `site-data.json` since 2026-11-21 (before: fictional 212600000000). The number is **not displayed** on the page; buttons open WhatsApp with a prefilled message.
- Products: 30 (duplicate #21 removed; #25 labelled "style 2"). **4 shown by default** (no slideshow: it showed stickered photos); "See all products" reveals the rest. Search / category / sort reveal all.
- Ordering: product page form (one product) or the **WhatsApp cart** (several products, one message). Both send a prefilled WhatsApp message; nothing is stored server-side. The cart lives in the visitor's `localStorage` (`nx_cart`); favorites (`nx_fav`, heart on cards and product page, `/favorites/` page) and recently viewed products (`nx_seen`) too. All are read only in the browser after the page is displayed.
- Design ("brand blue", chosen by the owner): tokens at the top of `redesign-app/src/styles.css` — ink #0B1530, brand blue #1F4FE0 (primary buttons), green #0A8F45 for WhatsApp only, sale red #D92D20, page #F6F7FB. Font: Manrope. Soft motion only, disabled with reduced motion.
- Only use facts from the store itself (free delivery Salé & Rabat, Témara on weekends, cash on delivery, after-sales 24/7). Do not invent delivery times, ratings or reviews.
- Footer signature: "Redesign by OA".
- Trust pages (`/info/…`, texts in `redesign-app/src/app/data/info-pages.ts`), validated by the owner on 2026-11-21: answers 9:00–21:00, delivery 24–48 h in Salé and Rabat (free), Témara on weekends, other cities on request; returns within 7 days, return cost paid by the customer when changing their mind, by the store for defective products; no return once opened for the nose clip, electric toothbrush and ear cleaner (hygiene); seller Achraf, Rabat; e-mail achraf.nexproma@gmail.com. Do not change these commitments without the owner.

## Deploying
- Push to `main` → GitHub Pages redeploys (two jobs: branch build from `docs/` and `.github/workflows/static.yml`, which also uploads `docs/`).
- Work on a branch, open a PR, merge. Hard refresh (Ctrl+Shift+R) to see changes.

## Related repo
- `DevOpsAchrafOu/Templates-site-web` — FOCAL template; its redesign is `redesign/index.html` there.
