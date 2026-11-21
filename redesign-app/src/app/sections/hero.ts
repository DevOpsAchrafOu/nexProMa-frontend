import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n';
import { Icon } from '../shared/icons';
import { DATA } from '../data/site-data';

/** Hero (white, brand blue accents, clean product photos) + trust strip. */
@Component({
  selector: 'app-hero',
  imports: [Icon, RouterLink],
  host: { style: 'display:contents' },
  template: `
    <div class="hero">
      <div class="wrap">
        <div class="txt">
          <span class="pill">{{ i18n.t('pill') }}</span>
          <h1>{{ i18n.t('h1a') }}<span class="accent">{{ i18n.t('h1b') }}</span></h1>
          <p class="lead">{{ i18n.t('lead') }}</p>
          <div class="ctas">
            <a class="btn primary" [routerLink]="i18n.link('')" fragment="products">{{ i18n.t('see') }} ({{ count }})</a>
            <a class="btn ghost-wa" [href]="i18n.waQuestion()" target="_blank" rel="noopener"><app-icon name="wa" />{{ i18n.t('ask') }}</a>
          </div>
          <p class="micro"><app-icon name="check" />{{ i18n.t('nocash') }}</p>
        </div>
        <div class="showcase" aria-hidden="true">
          <div class="blob"></div>
          <img class="s1" src="img/p12.jpg" alt="" width="600" height="600" />
          <img class="s2" src="img/p3.jpg" alt="" width="600" height="600" />
          <img class="s3" src="img/p31.jpg" alt="" width="600" height="600" />
          <span class="badge b1"><app-icon name="check" />{{ i18n.t('t1') }}</span>
          <span class="badge b2"><app-icon name="truck" />{{ i18n.t('fd') }}</span>
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
  protected readonly trust = ['t1', 't2', 't3', 't4'];
}
