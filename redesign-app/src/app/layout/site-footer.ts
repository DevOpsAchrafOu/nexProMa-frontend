import { Component, inject } from '@angular/core';
import { I18n } from '../i18n';
import { Icon } from '../shared/icons';

/** Footer, sticky mobile bar and floating WhatsApp button. */
@Component({
  selector: 'app-site-footer',
  imports: [Icon],
  host: { style: 'display:contents' },
  template: `
    <footer>
      <div class="wrap"><span>{{ i18n.t('rights') }}</span><span>Redesign by OA</span></div>
    </footer>
    <div class="bar">
      <a class="btn wa" [href]="i18n.waQuestion()" target="_blank" rel="noopener"><app-icon name="wa" />WhatsApp</a>
      <a class="btn blue" href="#products">{{ i18n.t('bar_p') }}</a>
    </div>
    <a class="btn wa fab" [href]="i18n.waQuestion()" target="_blank" rel="noopener"><app-icon name="wa" />{{ i18n.t('fab') }}</a>
  `,
})
export class SiteFooter {
  protected readonly i18n = inject(I18n);
}
