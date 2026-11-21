import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LANGS, Lang, SITE_URL } from './data/site-data';

export interface PageSeo {
  lang: Lang;
  title: string;
  description: string;
  /** Path of the page without language prefix and without leading slash ('' = home, 'p/slug'). */
  path: string;
  /** Image path relative to the site (e.g. img/p23.jpg). */
  image: string;
  /** schema.org data for search engines. */
  jsonLd: object;
}

/** Absolute URL of a page; directories end with "/" like GitHub Pages serves them. */
export function pageUrl(lang: Lang, path: string): string {
  const p = (lang === 'fr' ? 'fr/' : '') + path;
  return SITE_URL + (p && !p.endsWith('/') ? p + '/' : p);
}

/** Sets title, description, share preview (Open Graph), canonical, hreflang and JSON-LD of the page. */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  set(page: PageSeo): void {
    const url = pageUrl(page.lang, page.path);
    const image = SITE_URL + page.image;
    this.title.setTitle(page.title);

    const tags: Record<string, string> = {
      description: page.description,
      'og:type': page.path ? 'product' : 'website',
      'og:site_name': 'nexProMa',
      'og:title': page.title,
      'og:description': page.description,
      'og:url': url,
      'og:image': image,
      'og:locale': page.lang === 'fr' ? 'fr_MA' : 'en_US',
      'twitter:card': 'summary_large_image',
    };
    for (const [key, content] of Object.entries(tags)) {
      const attr = key.startsWith('og:') ? 'property' : 'name';
      this.meta.updateTag({ [attr]: key, content }, `${attr}="${key}"`);
    }

    this.link('canonical', url);
    for (const l of LANGS) this.link('alternate', pageUrl(l, page.path), l);
    this.link('alternate', pageUrl('en', page.path), 'x-default');

    let script = this.doc.head.querySelector<HTMLScriptElement>('script#ld');
    if (!script) {
      script = this.doc.createElement('script');
      script.id = 'ld';
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(page.jsonLd);
  }

  private link(rel: string, href: string, hreflang?: string): void {
    const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
    let el = this.doc.head.querySelector<HTMLLinkElement>(sel);
    if (!el) {
      el = this.doc.createElement('link');
      el.rel = rel;
      if (hreflang) el.hreflang = hreflang;
      this.doc.head.appendChild(el);
    }
    el.href = href;
  }
}
