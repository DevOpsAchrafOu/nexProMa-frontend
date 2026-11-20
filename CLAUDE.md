# nexProMa — context for Claude Code

Owner: Ouakka Achraf (OA), freelance web/mobile team (Morocco), selling to local businesses.
Conversation language with the owner: French / Moroccan Darija.

## What lives where
- `src/` — original Angular 12 store (nexProMa). Built output is in `docs/` and served by GitHub Pages.
- `docs/redesign/` — conversion-focused redesign of the home page (static HTML, no framework).
  Live: https://devopsachrafou.github.io/nexProMa-frontend/redesign/
- `tools/redesign/` — generator for `docs/redesign/index.html`. Edit sources there, then run
  `python3 tools/redesign/build.py` from the repo root. Never hand-edit the generated index.html.
  See `tools/redesign/README.md`.

## Decisions already made (keep them)
- Languages EN / FR / AR, **English by default**; AR switches the page to RTL. Every new text needs all 3 (in `gen.py` / `build.py` UI dict).
- WhatsApp: the redesign uses a **fictional number** (212600000000) and the number is **not displayed** anywhere; buttons still open WhatsApp with a prefilled order message.
- Products: 30 (duplicate #21 removed; #25 labelled "style 2"). **4 shown by default** with photo slideshow; "See all products" reveals the rest. Search / category / sort reveal all.
- Design tokens: navy #0F1B3D text, brand blue #1F4FE0, buy green #078A3E, discount yellow #FFC93C, page #F2F4F8. Fonts: Plus Jakarta Sans (EN/FR), IBM Plex Sans Arabic (AR).
- Only use facts from the store itself (free delivery Salé & Rabat, Témara on weekends, cash on delivery, after-sales 24/7). Do not invent delivery times, ratings or reviews.
- Footer signature: "Redesign by OA".

## Deploying
- Push to `main` → GitHub Pages redeploys (two jobs: branch build from `docs/` and `.github/workflows/static.yml`, which also uploads `docs/`).
- Work on a branch, open a PR, merge. Hard refresh (Ctrl+Shift+R) to see changes.

## Related repo
- `DevOpsAchrafOu/Templates-site-web` — FOCAL template; its redesign is `redesign/index.html` there.
