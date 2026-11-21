import { Component, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n';
import { Icon } from '../shared/icons';
import { OrderForm, MAX_QTY } from '../products/order-form';
import { Cart } from './cart';

/** Cart panel sliding in from the right: lines, quantities, total, then the WhatsApp order form. */
@Component({
  selector: 'app-cart-drawer',
  imports: [Icon, RouterLink, OrderForm],
  host: { style: 'display:contents' },
  template: `
    <dialog #dlg class="drawer" aria-labelledby="cart-title" (close)="cart.open.set(false)" (click)="backdrop($event)">
      <div class="drawer-head">
        <h2 id="cart-title">{{ i18n.t('cart_title') }} @if (cart.count()) { <span class="count">({{ cart.count() }})</span> }</h2>
        <button class="icon-btn" type="button" [attr.aria-label]="i18n.t('close')" (click)="dlg.close()">×</button>
      </div>

      @if (cart.lines().length) {
        <div class="drawer-body">
          <ul class="lines">
            @for (l of cart.lines(); track l.product.id) {
              @let p = l.product;
              <li>
                <a class="thumb" [routerLink]="i18n.link('p', p.slug)" (click)="dlg.close()">
                  <img [src]="'img/p' + p.id + '.jpg'" alt="" width="72" height="72" loading="lazy" />
                </a>
                <div class="meta">
                  <a class="name" [routerLink]="i18n.link('p', p.slug)" (click)="dlg.close()">{{ i18n.pick(p.title) }}</a>
                  <span class="unit">{{ p.price }} {{ i18n.t('cur') }}</span>
                  <div class="row">
                    <div class="qty" role="group" [attr.aria-label]="i18n.t('f_qty')">
                      <button type="button" [attr.aria-label]="i18n.t('f_less')" (click)="cart.setQty(p.id, l.qty - 1)">−</button>
                      <output aria-live="polite">{{ l.qty }}</output>
                      <button type="button" [attr.aria-label]="i18n.t('f_plus')" [disabled]="l.qty >= maxQty" (click)="cart.setQty(p.id, l.qty + 1)">+</button>
                    </div>
                    <button class="remove" type="button" (click)="cart.remove(p.id)">{{ i18n.t('cart_remove') }}</button>
                  </div>
                </div>
                <strong class="sub">{{ p.price * l.qty }} {{ i18n.t('cur') }}</strong>
              </li>
            }
          </ul>

          <form appOrderForm prefix="cart" [lines]="cart.lines()" (sent)="sent.set(true)"></form>

          @if (sent()) {
            <p class="sent" role="status">
              {{ i18n.t('cart_sent') }}
              <button type="button" class="link" (click)="clear()">{{ i18n.t('cart_clear') }}</button>
            </p>
          }
        </div>
      } @else {
        <div class="empty">
          <app-icon name="bag" />
          <p>{{ i18n.t('cart_empty') }}</p>
          <a class="btn primary" [routerLink]="i18n.link('')" fragment="products" (click)="dlg.close()">{{ i18n.t('see') }}</a>
        </div>
      }
    </dialog>
  `,
})
export class CartDrawer {
  protected readonly i18n = inject(I18n);
  protected readonly cart = inject(Cart);
  protected readonly maxQty = MAX_QTY;
  /** True after the order was sent to WhatsApp: offers to empty the cart. */
  protected readonly sent = signal(false);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');

  constructor() {
    effect(() => {
      const dlg = this.dialog().nativeElement;
      if (this.cart.open() && !dlg.open) {
        this.sent.set(false);
        dlg.showModal();
      } else if (!this.cart.open() && dlg.open) {
        dlg.close();
      }
    });
  }

  protected backdrop(e: MouseEvent): void {
    if (e.target === this.dialog().nativeElement) this.dialog().nativeElement.close();
  }

  protected clear(): void {
    this.cart.clear();
    this.sent.set(false);
  }
}
