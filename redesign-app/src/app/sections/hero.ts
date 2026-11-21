import { Component, inject } from '@angular/core';
import { I18n } from '../i18n';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/icons';
import { DATA } from '../data/site-data';

const SPARK = 'M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z';

/** Hero + trust strip. */
@Component({
  selector: 'app-hero',
  imports: [Icon, RouterLink],
  host: { style: 'display:contents' },
  template: `
    <div class="hero">
      <div class="wrap">
        <div class="txt">
          <span class="pill">{{ i18n.t('pill') }}</span>
          <h1>{{ i18n.t('h1a') }}{{ i18n.t('h1b') }}</h1>
          <p class="lead">{{ i18n.t('lead') }}</p>
          <div class="ctas">
            <a class="btn blue" [routerLink]="i18n.link('')" fragment="products">{{ i18n.t('see') }} ({{ count }})</a>
            <a class="btn wa" [href]="i18n.waQuestion()" target="_blank" rel="noopener"><app-icon name="wa" />{{ i18n.t('ask') }}</a>
          </div>
          <p class="micro"><app-icon name="check" />{{ i18n.t('nocash') }}</p>
        </div>
        <div class="collage" aria-hidden="true">
          <svg class="spark" aria-hidden="true" style="top:-26px;inset-inline-start:-22px;z-index:2" width="54" height="54" viewBox="0 0 24 24"><path fill="#FFC93C" [attr.d]="spark" /></svg>
          <svg class="spark" aria-hidden="true" style="bottom:-18px;inset-inline-end:-14px;z-index:2" width="40" height="40" viewBox="0 0 24 24"><path fill="#00D555" [attr.d]="spark" /></svg>
          <img src="img/p23.jpg" alt="" /><img src="img/p1.jpg" alt="" /><img src="img/p12.jpg" alt="" />
        </div>
      </div>
    </div>

    <div class="trust">
      <div class="wrap">
        @for (k of trust; track k) {
          <span><app-icon name="check" />{{ i18n.t(k) }}</span>
        }
      </div>
    </div>
  `,
})
export class Hero {
  protected readonly i18n = inject(I18n);
  protected readonly count = DATA.products.length;
  protected readonly spark = SPARK;
  protected readonly trust = ['t1', 't2', 't3', 't4'];
}
