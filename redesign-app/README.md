# nexProMa redesign (Angular 22)

Source of the site published at
https://devopsachrafou.github.io/nexProMa-frontend/redesign/

Needs Node 22.22+ (or 24.15+). The old store in `../src` still uses Angular 12 and Node 16.

```bash
cd redesign-app
npm install
npm start        # dev server: http://localhost:4200/nexProMa-frontend/redesign/
npm run build    # writes the static site and sitemap.xml to ../docs/redesign/ (commit it)
```

`npm run build` empties `../docs/redesign/` and rebuilds it. Never edit files there by hand.

## Pages (all generated as static HTML at build time)

| URL | Page |
| --- | --- |
| `/` and `/fr/` | Home in English (default) and French |
| `/p/{slug}/` and `/fr/p/{slug}/` | One page per product: photos, description, order form, similar products |
| `/sitemap.xml` | Every page with its EN / FR links, for Google Search Console |

Each page has its own title, description, share preview (Open Graph), canonical URL, hreflang links and
schema.org data (`Product` with price in MAD on product pages, `Store` on the home page): see `src/app/seo.ts`.

## Where things are

| Path | What it holds |
| --- | --- |
| `src/app/data/site-data.json` | WhatsApp number, interface texts (EN / FR), categories, cities, the 30 products (slug, prices, photos, title, description, features) in "Recommended" order |
| `src/app/data/site-data.ts` | Types, helpers, `SITE_URL` (public address) and `FEATURED` (products shown before "See all") |
| `src/app/i18n.ts` | Language from the URL (`/fr/…`), `t('key')`, language-aware links, WhatsApp links |
| `src/app/seo.ts` | Title, meta, Open Graph, canonical, hreflang, JSON-LD |
| `src/app/pages/` | Home page and product page |
| `src/app/layout/` | Header (menu, language switch), footer, mobile bar, floating WhatsApp button |
| `src/app/sections/` | Hero + trust strip, How to order, Reviews (lightbox), About, FAQ, final call to action |
| `src/app/products/` | Search / categories / sort, product card, photo gallery, order form |
| `src/app/app.routes.ts`, `src/app/app.routes.server.ts` | Routes, and which ones are prerendered |
| `scripts/sitemap.mjs` | Writes `sitemap.xml` after the build |
| `src/styles.css` | All styles (global) |
| `public/img/` | Product covers (`p{id}.jpg`), galleries (`g/p{id}_{n}.jpg`), review screenshots, logo |

Every new text needs its 2 languages in `site-data.json` (`ui`), in the order English, French.

Moving to its own domain: change `SITE_URL` in `site-data.ts` and `baseHref` in `angular.json`, then rebuild.
