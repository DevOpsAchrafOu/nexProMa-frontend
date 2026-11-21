import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n';
import { Icon } from '../shared/icons';
import { LANGS, Lang } from '../data/site-data';

@Component({
  selector: 'header[appSiteHeader]',
  imports: [Icon, RouterLink],
  host: { class: 'top' },
  template: `
    <div class="wrap">
      <a class="logo" [routerLink]="i18n.link('')" aria-label="nexProMa"><img src="img/logo.svg" alt="nexProMa" width="160" height="40" /></a>
      <nav aria-label="Menu">
        @for (n of nav; track n.id) {
          <a [routerLink]="i18n.link('')" [fragment]="n.id">{{ i18n.t(n.label) }}</a>
        }
      </nav>
      <div class="right">
        <div class="lang" role="group" aria-label="Language" [style.--i]="i18n.index()">
          <svg class="globe" aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <div class="seg">
            <span class="thumb" aria-hidden="true"></span>
            @for (l of langs; track l) {
              <!-- Real links to the same page in the other language (readable by search engines). -->
              <a class="opt" [routerLink]="i18n.switchTo(l)" [attr.aria-current]="i18n.lang() === l ? 'true' : null"
                [attr.title]="names[l]" [attr.hreflang]="l" [attr.lang]="l">{{ labels[l] }}</a>
            }
          </div>
        </div>
        <a class="btn ghost-wa sm hide-sm" [href]="i18n.waQuestion()" target="_blank" rel="noopener"><app-icon name="wa" />WhatsApp</a>
      </div>
    </div>
  `,
})
export class SiteHeader {
  protected readonly i18n = inject(I18n);
  protected readonly langs = LANGS;
  protected readonly labels: Record<Lang, string> = { en: 'EN', fr: 'FR' };
  protected readonly names: Record<Lang, string> = { en: 'English', fr: 'Français' };
  protected readonly nav = [
    { id: 'products', label: 'nav_products' },
    { id: 'how', label: 'nav_how' },
    { id: 'avis', label: 'nav_reviews' },
    { id: 'faq', label: 'nav_faq' },
  ];
}
