# Redesign page generator

Builds `docs/redesign/index.html` (the nexProMa redesign) from these files.
Run from the repository root:

```bash
python3 tools/redesign/build.py
```

| File | What it holds |
| --- | --- |
| `articles.json` | Product catalog (prices, categories, image folders) — copied from `all-product.component.ts` |
| `tr.json` | Product titles in EN / FR / AR |
| `gen.py` | WhatsApp number, categories and all interface texts (EN / FR / AR) |
| `build.py` | Builds the product cards and writes the page |
| `tpl.html` | Page template (HTML + JavaScript) |
| `style.css`, `style2.css` | Styles |
| `gal.json` | Number of gallery photos per product (images in `docs/redesign/img/g/`) |

Images in `docs/redesign/img/` were generated once from `docs/assets/images/` and are committed as is.
