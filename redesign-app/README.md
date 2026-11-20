# nexProMa redesign (Angular 22)

Source of the redesign page published at
https://devopsachrafou.github.io/nexProMa-frontend/redesign/

Needs Node 22.22+ (or 24.15+). The old store in `../src` still uses Angular 12 and Node 16.

```bash
cd redesign-app
npm install
npm start        # dev server: http://localhost:4200/
npm run build    # writes the site to ../docs/redesign/ (commit it)
```

`npm run build` empties `../docs/redesign/` and rebuilds it. Never edit files there by hand.

## Where things are

| Path | What it holds |
| --- | --- |
| `src/app/data/site-data.json` | WhatsApp number, every interface text (EN / FR / AR), categories, the 30 products in "Recommended" order |
| `src/app/data/site-data.ts` | Types and helpers for that data (`FEATURED` = products shown before "See all") |
| `src/app/i18n.ts` | Current language, RTL for Arabic, `t('key')`, WhatsApp links |
| `src/app/layout/` | Header (menu, language switch), footer, mobile bar, floating WhatsApp button |
| `src/app/sections/` | Hero + trust strip, How to order, Reviews (lightbox), About, FAQ, final call to action |
| `src/app/products/` | Search / categories / sort, product card with photo slideshow, product dialog |
| `src/styles.css` | All styles (global) |
| `public/img/` | Product photos (`p{id}.jpg`), galleries (`g/p{id}_{n}.jpg`), review screenshots, logo |

Every new text needs its 3 languages in `site-data.json` (`ui`), in the order English, French, Arabic.
