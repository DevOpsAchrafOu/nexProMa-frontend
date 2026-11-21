import { Component, inject } from '@angular/core';
import { I18n } from '../i18n';
import { Icon } from '../shared/icons';
import { Cart } from './cart';

/** Short confirmation after "Add to cart", with a button to open the cart. */
@Component({
  selector: 'app-cart-toast',
  imports: [Icon],
  host: { style: 'display:contents' },
  template: `
    <div class="toast" role="status" aria-live="polite" [class.on]="!!cart.toast()">
      @if (cart.toast(); as title) {
        <app-icon name="check" />
        <span class="msg"><b>{{ i18n.t('cart_added') }}</b><span class="t">{{ title }}</span></span>
        <button type="button" class="btn primary sm" (click)="cart.show()">{{ i18n.t('cart_view') }}</button>
      }
    </div>
  `,
})
export class CartToast {
  protected readonly i18n = inject(I18n);
  protected readonly cart = inject(Cart);
}
