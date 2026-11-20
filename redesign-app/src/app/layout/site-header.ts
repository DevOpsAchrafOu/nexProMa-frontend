import { Component, inject } from '@angular/core';
import { I18n } from '../i18n';
import { Icon } from '../shared/icons';
import { LANGS, Lang } from '../data/site-data';

@Component({
  selector: 'header[appSiteHeader]',
  imports: [Icon],
  host: { class: 'top' },
  template: `
    <div class="wrap">
      <a class="logo" href="#top" aria-label="nexProMa"><img src="img/logo.svg" alt="nexProMa" width="160" height="40" /></a>
      <nav aria-label="Menu">
        <a href="#products">{{ i18n.t('nav_products') }}</a>
        <a href="#how">{{ i18n.t('nav_how') }}</a>
        <a href="#avis">{{ i18n.t('nav_reviews') }}</a>
        <a href="#faq">{{ i18n.t('nav_faq') }}</a>
      </nav>
      <div class="right">
        <div class="lang" role="group" aria-label="Language">
          @for (l of langs; track l) {
            <button type="button" [attr.aria-pressed]="i18n.lang() === l" [attr.lang]="l === 'ar' ? 'ar' : null" (click)="i18n.lang.set(l)">
              {{ labels[l] }}
            </button>
          }
        </div>
        <a class="btn wa hide-sm" [href]="i18n.waQuestion()" target="_blank" rel="noopener"><app-icon name="wa" />WhatsApp</a>
      </div>
    </div>
  `,
})
export class SiteHeader {
  protected readonly i18n = inject(I18n);
  protected readonly langs = LANGS;
  protected readonly labels: Record<Lang, string> = { en: 'EN', fr: 'FR', ar: 'ع' };
}
