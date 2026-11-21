import { DOCUMENT, Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { CatKey, DATA, LANGS, Lang, Tr } from './data/site-data';

/**
 * Current language, read from the URL: /fr/… is French, everything else is English (default).
 * Also builds the WhatsApp links and the language-aware internal links.
 */
@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly url = signal(this.router.url);

  readonly lang = computed<Lang>(() => (/^\/fr(\/|$|\?|#)/.test(this.url()) ? 'fr' : 'en'));
  readonly index = computed(() => LANGS.indexOf(this.lang()));

  constructor() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) this.url.set(e.urlAfterRedirects);
    });
    effect(() => {
      this.doc.documentElement.lang = this.lang();
    });
  }

  /** Internal link in the current language: link('p', slug) → '/fr/p/slug' in French. */
  link(...segments: string[]): string {
    return this.linkIn(this.lang(), ...segments);
  }

  linkIn(lang: Lang, ...segments: string[]): string {
    const path = segments.filter(Boolean).join('/');
    return (lang === 'fr' ? '/fr' : '') + '/' + path;
  }

  /** The same page in another language (path without the /fr prefix, then re-prefixed). */
  switchTo(lang: Lang): string {
    const path = this.url().split(/[?#]/)[0].replace(/^\/fr(?=\/|$)/, '').replace(/^\//, '');
    return this.linkIn(lang, path);
  }

  /** Interface text for the current language. `{t}`, `{p}`, `{s}` are replaced from `vars`. */
  t(key: string, vars: Record<string, string | number> = {}): string {
    const tr = DATA.ui[key];
    if (!tr) return key;
    return tr[this.index()].replace(/\{(\w)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  }

  pick(tr: Tr): string {
    return tr[this.index()];
  }

  cat(key: CatKey): string {
    return this.pick(DATA.cats[key]);
  }

  /** wa.me link with a prefilled message. */
  wa(text: string): string {
    return `https://wa.me/${DATA.wa}?text=${encodeURIComponent(text)}`;
  }

  /** Generic "I have a question" WhatsApp link. */
  readonly waQuestion = computed(() => this.wa(this.t('wa_q')));
}

/** True only in the visitor's browser (false while pages are generated at build time). */
export function inBrowser(): boolean {
  return isPlatformBrowser(inject(PLATFORM_ID));
}

export const prefersReducedMotion = (): boolean =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
