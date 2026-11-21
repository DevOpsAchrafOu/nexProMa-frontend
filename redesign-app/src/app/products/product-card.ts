import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n';
import { Icon } from '../shared/icons';
import { Product, discount } from '../data/site-data';
import { Cart } from '../cart/cart';
import { FavButton } from '../shared/fav-button';

@Component({
  selector: 'article[appProductCard]',
  imports: [Icon, RouterLink, FavButton],
  host: {
    class: 'card',
    '[class.more]': 'more()',
    '[class.pop]': 'popDelay() !== null',
    '[style.animation-delay.ms]': 'popDelay()',
  },
  template: `
    @let p = product();
    <a class="ph" [routerLink]="link()" [attr.aria-label]="title()">
      <img [src]="'img/p' + p.id + '.jpg'" [alt]="title()" loading="lazy" width="600" height="600" />
      <span class="off" dir="ltr">-{{ off() }}%</span>
    </a>
    <app-fav-button [productId]="p.id" />
    <div class="cb">
      <span class="cat">{{ i18n.cat(p.cat) }}</span>
      <h3><a class="tl" [routerLink]="link()">{{ title() }}</a></h3>
      <div class="pr">
        <strong>{{ p.price }} {{ i18n.t('cur') }}</strong><s>{{ p.old }} {{ i18n.t('cur') }}</s>
      </div>
      <span class="fd"><app-icon name="truck" />{{ i18n.t('fd') }}</span>
      <div class="actions">
        <a class="btn primary sm" [routerLink]="link()" fragment="order">{{ i18n.t('order_short') }}</a>
        <button class="btn outline sm add" type="button" [attr.aria-label]="i18n.t('cart_add')" [attr.title]="i18n.t('cart_add')"
          (click)="cart.add(p.id, title())"><app-icon name="bag-plus" /></button>
      </div>
    </div>
  `,
})
export class ProductCard {
  protected readonly i18n = inject(I18n);
  protected readonly cart = inject(Cart);

  readonly product = input.required<Product>();
  /** Hidden while the grid is collapsed. */
  readonly more = input(false);
  /** Set when the card appears after "See all products" (ms of delay), else null. */
  readonly popDelay = input<number | null>(null);

  protected readonly title = computed(() => this.i18n.pick(this.product().title));
  protected readonly off = computed(() => discount(this.product()));
  /** Product page in the current language. "Order" adds #order to open it on the form. */
  protected readonly link = computed(() => this.i18n.link('p', this.product().slug));
}
