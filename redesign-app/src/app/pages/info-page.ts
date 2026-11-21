import { Component, computed, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { I18n } from '../i18n';
import { Seo } from '../seo';
import { Icon } from '../shared/icons';
import { CONTACT, INFO, INFO_KEYS, InfoKey } from '../data/info-pages';
import { SITE_URL } from '../data/site-data';

/** Trust pages: /info/contact, /info/delivery, /info/returns, /info/terms, /info/privacy (and /fr/…). */
@Component({
  selector: 'app-info-page',
  imports: [RouterLink, Icon],
  host: { style: 'display:contents' },
  template: `
    @if (info(); as page) {
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a [routerLink]="i18n.link('')">{{ i18n.t('crumb_home') }}</a>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{{ i18n.pick(page.nav) }}</span>
        </nav>
      </div>
      <section class="info-page"><div class="wrap info-layout">
        <article class="info-body">
          <h1 class="page-h">{{ i18n.pick(page.title) }}</h1>
          <p class="lead">{{ i18n.pick(page.intro) }}</p>

          @if (key() === 'contact') {
            <div class="contact-cards">
              <a class="contact-card" [href]="i18n.waQuestion()" target="_blank" rel="noopener">
                <app-icon name="wa" /><span><b>WhatsApp</b><span dir="ltr">{{ contact.phoneDisplay }}</span></span>
              </a>
              <a class="contact-card" [href]="'mailto:' + contact.email">
                <app-icon name="mail" /><span><b>E-mail</b><span>{{ contact.email }}</span></span>
              </a>
            </div>
          }

          @for (s of page.sections; track $index) {
            <h2>{{ i18n.pick(s.h) }}</h2>
            @if (s.items.length > 1) {
              <ul>
                @for (it of s.items; track $index) { <li>{{ i18n.pick(it) }}</li> }
              </ul>
            } @else {
              <p>{{ i18n.pick(s.items[0]) }}</p>
            }
          }

          @if (key() !== 'contact') {
            <div class="info-cta">
              <p>{{ i18n.t('info_q') }}</p>
              <a class="btn wa" [href]="i18n.waQuestion()" target="_blank" rel="noopener"><app-icon name="wa" />{{ i18n.t('ask') }}</a>
            </div>
          }
        </article>

        <aside class="info-nav" [attr.aria-label]="i18n.t('info_nav')">
          <p class="feat-h">{{ i18n.t('info_nav') }}</p>
          @for (k of keys; track k) {
            <a [routerLink]="i18n.link('info', k)" [attr.aria-current]="k === key() ? 'page' : null">{{ i18n.pick(pages[k].nav) }}</a>
          }
        </aside>
      </div></section>
    }
  `,
})
export class InfoPageComponent {
  protected readonly i18n = inject(I18n);
  private readonly seo = inject(Seo);
  private readonly router = inject(Router);
  protected readonly contact = CONTACT;
  protected readonly keys = INFO_KEYS;
  protected readonly pages = INFO;

  /** From the URL info/:page. */
  readonly page = input.required<string>();
  protected readonly key = computed(() => (INFO_KEYS as string[]).includes(this.page()) ? (this.page() as InfoKey) : null);
  protected readonly info = computed(() => {
    const k = this.key();
    return k ? INFO[k] : null;
  });

  constructor() {
    effect(() => {
      const k = this.key();
      const page = this.info();
      if (!k || !page) {
        this.router.navigateByUrl(this.i18n.link(''));
        return;
      }
      const lang = this.i18n.lang();
      const title = this.i18n.pick(page.title);
      this.seo.set({
        lang,
        title: `${title} | nexProMa`,
        description: this.i18n.pick(page.intro),
        path: 'info/' + k,
        image: 'img/p12.jpg',
        jsonLd:
          k === 'contact'
            ? {
                '@context': 'https://schema.org',
                '@type': 'ContactPage',
                name: title,
                mainEntity: {
                  '@type': 'Store',
                  name: 'nexProMa',
                  url: SITE_URL,
                  email: CONTACT.email,
                  telephone: CONTACT.phoneDisplay.replace(/\s/g, ''),
                  address: { '@type': 'PostalAddress', addressLocality: CONTACT.city, addressCountry: 'MA' },
                },
              }
            : { '@context': 'https://schema.org', '@type': 'WebPage', name: title },
      });
    });
  }
}
