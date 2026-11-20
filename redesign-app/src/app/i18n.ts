import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';
import { CatKey, DATA, LANGS, Lang, Tr } from './data/site-data';

const STORAGE_KEY = 'nx_lang';

/** Current language (EN by default, FR, AR in RTL) and the WhatsApp links. */
@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly doc = inject(DOCUMENT);

  readonly lang = signal<Lang>(this.initialLang());
  readonly index = computed(() => LANGS.indexOf(this.lang()));
  readonly rtl = computed(() => this.lang() === 'ar');

  constructor() {
    effect(() => {
      const l = this.lang();
      const html = this.doc.documentElement;
      html.lang = l;
      html.dir = l === 'ar' ? 'rtl' : 'ltr';
      this.doc.title = this.t('title');
      try {
        localStorage.setItem(STORAGE_KEY, l);
      } catch {}
    });
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

  private initialLang(): Lang {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const q = new URLSearchParams(this.doc.defaultView?.location.search ?? '').get('lang');
    const l = q || stored || 'en';
    return (LANGS as string[]).includes(l) ? (l as Lang) : 'en';
  }
}

export const prefersReducedMotion = (): boolean =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
