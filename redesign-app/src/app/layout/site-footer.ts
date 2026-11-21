import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n';
import { Icon } from '../shared/icons';
import { Logo } from '../shared/logo';
import { Cart } from '../cart/cart';
import { CONTACT, INFO, INFO_KEYS } from '../data/info-pages';

/** Footer (shop, help pages, contact), sticky mobile bar and floating WhatsApp button. */
@Component({
  selector: 'app-site-footer',
  imports: [Icon, RouterLink, Logo],
  host: { style: 'display:contents' },
  template: `
    <footer>
      <div class="wrap foot-grid">
        <div class="foot-brand">
          <app-logo [dark]="true" [size]="32" />
          <p>{{ i18n.t('foot_about') }}</p>
        </div>
        <nav [attr.aria-label]="i18n.t('foot_shop')">
          <p class="foot-h">{{ i18n.t('foot_shop') }}</p>
          <a [routerLink]="i18n.link('')" fragment="products">{{ i18n.t('nav_products') }}</a>
          <a [routerLink]="i18n.link('favorites')">{{ i18n.t('fav_nav') }}</a>
          <a [routerLink]="i18n.link('')" fragment="faq">{{ i18n.t('nav_faq') }}</a>
        </nav>
        <nav [attr.aria-label]="i18n.t('info_nav')">
          <p class="foot-h">{{ i18n.t('info_nav') }}</p>
          @for (k of infoKeys; track k) {
            <a [routerLink]="i18n.link('info', k)">{{ i18n.pick(info[k].nav) }}</a>
          }
        </nav>
        <div>
          <p class="foot-h">{{ i18n.t('foot_contact') }}</p>
          <a [href]="i18n.waQuestion()" target="_blank" rel="noopener"><app-icon name="wa" />WhatsApp</a>
          <a [href]="'mailto:' + contact.email"><app-icon name="mail" />{{ contact.email }}</a>
          <span>{{ i18n.t('foot_hours') }}</span>
        </div>
      </div>
      <div class="wrap foot-bottom"><span>{{ i18n.t('rights') }}</span><span>Redesign by OA</span></div>
    </footer>
    <div class="bar">
      <a class="btn wa" [href]="i18n.waQuestion()" target="_blank" rel="noopener"><app-icon name="wa" />WhatsApp</a>
      @if (cart.count()) {
        <button class="btn primary" type="button" (click)="cart.show()"><app-icon name="bag" />{{ i18n.t('cart') }} ({{ cart.count() }})</button>
      } @else {
        <a class="btn primary" [routerLink]="i18n.link('')" fragment="products">{{ i18n.t('bar_p') }}</a>
      }
    </div>
    <a class="fab" [href]="i18n.waQuestion()" target="_blank" rel="noopener" [attr.aria-label]="i18n.t('fab')" [attr.title]="i18n.t('fab')"><app-icon name="wa" /></a>
  `,
})
export class SiteFooter {
  protected readonly i18n = inject(I18n);
  protected readonly cart = inject(Cart);
  protected readonly contact = CONTACT;
  protected readonly info = INFO;
  protected readonly infoKeys = INFO_KEYS;
}
