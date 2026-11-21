import { Component, ElementRef, Injectable, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { I18n } from '../i18n';
import { Icon } from '../shared/icons';
import { DATA, Product } from '../data/site-data';

export const MAX_QTY = 10;
const OTHER = 'other';

/** One product and its quantity, in the order form or the cart. */
export interface OrderLine {
  product: Product;
  qty: number;
}

/** Moroccan mobile or landline: 05/06/07 + 8 digits, or +212 / 00212 + 9 digits. */
export function normalizePhone(raw: string): string | null {
  const s = raw.replace(/[\s.\-()]/g, '');
  const m = s.match(/^(?:\+212|00212|0)([5-7]\d{8})$/);
  return m ? '0' + m[1] : null;
}

/** Customer details, kept while the page is open so a second order needs no retyping. */
@Injectable({ providedIn: 'root' })
export class Customer {
  readonly name = signal('');
  readonly phone = signal('');
  readonly city = signal('');
  readonly otherCity = signal('');
  readonly address = signal('');
}

/**
 * Cash-on-delivery order form: the order is sent as a prefilled WhatsApp message.
 * With `product`: one product and a quantity stepper (product page).
 * With `lines`: every product of the cart, quantities chosen in the cart.
 */
@Component({
  selector: 'form[appOrderForm]',
  imports: [Icon],
  host: { class: 'order', novalidate: '', '(submit)': 'submit($event)' },
  template: `
    @let id = prefix();
    <h3>{{ i18n.t(lines() ? 'cart_form_h' : 'f_h') }}</h3>

    <div class="f">
      <label [for]="id + '-name'">{{ i18n.t('f_name') }}</label>
      <input #nameInput [id]="id + '-name'" autocomplete="name" [value]="c.name()" (input)="c.name.set(val($event))"
        [attr.aria-invalid]="tried() && errors().name" [attr.aria-describedby]="id + '-name-e'" />
      @if (tried() && errors().name) { <span class="err" [id]="id + '-name-e'">{{ i18n.t('e_name') }}</span> }
    </div>

    <div class="f">
      <label [for]="id + '-phone'">{{ i18n.t('f_phone') }}</label>
      <input #phoneInput [id]="id + '-phone'" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" placeholder="06 12 34 56 78"
        [value]="c.phone()" (input)="c.phone.set(val($event))"
        [attr.aria-invalid]="tried() && errors().phone" [attr.aria-describedby]="id + '-phone-e'" />
      @if (tried() && errors().phone) { <span class="err" [id]="id + '-phone-e'">{{ i18n.t('e_phone') }}</span> }
    </div>

    <div class="f">
      <label [for]="id + '-city'">{{ i18n.t('f_city') }}</label>
      <select #cityInput [id]="id + '-city'" [value]="c.city()" (change)="c.city.set(val($event))"
        [attr.aria-invalid]="tried() && errors().city" [attr.aria-describedby]="id + '-city-e ' + id + '-city-d'">
        <option value="" disabled [selected]="!c.city()">—</option>
        @for (city of cities; track city.key) {
          <option [value]="city.key" [selected]="c.city() === city.key">{{ i18n.pick(city.name) }}</option>
        }
        <option [value]="other" [selected]="c.city() === other">{{ i18n.t('f_other') }}</option>
      </select>
      @if (c.city() === other) {
        <input #otherInput [id]="id + '-other'" autocomplete="address-level2" [attr.aria-label]="i18n.t('f_city_name')"
          [placeholder]="i18n.t('f_city_name')" [value]="c.otherCity()" (input)="c.otherCity.set(val($event))"
          [attr.aria-invalid]="tried() && errors().city" />
      }
      @if (tried() && errors().city) { <span class="err" [id]="id + '-city-e'">{{ i18n.t('e_city') }}</span> }
      @if (delivery(); as d) { <span class="hint" [id]="id + '-city-d'"><app-icon name="truck" />{{ d }}</span> }
    </div>

    <div class="f">
      <label [for]="id + '-addr'">{{ i18n.t('f_addr') }}</label>
      <input [id]="id + '-addr'" autocomplete="street-address" [value]="c.address()" (input)="c.address.set(val($event))" />
    </div>

    @if (!lines()) {
      <div class="qtyrow">
        <span [id]="id + '-qty'">{{ i18n.t('f_qty') }}</span>
        <div class="qty" role="group" [attr.aria-labelledby]="id + '-qty'">
          <button type="button" [attr.aria-label]="i18n.t('f_less')" [disabled]="qty() <= 1" (click)="qty.set(qty() - 1)">−</button>
          <output aria-live="polite">{{ qty() }}</output>
          <button type="button" [attr.aria-label]="i18n.t('f_plus')" [disabled]="qty() >= maxQty" (click)="qty.set(qty() + 1)">+</button>
        </div>
      </div>
    }

    <div class="total">
      <span>{{ i18n.t('f_total') }}</span>
      <strong>{{ total() }} {{ i18n.t('cur') }}</strong>
    </div>

    <button class="btn wa" type="submit"><app-icon name="wa" />{{ i18n.t(lines() ? 'cart_send' : 'f_send') }}</button>
    <p class="note">{{ i18n.t('f_note') }}</p>
  `,
})
export class OrderForm {
  protected readonly i18n = inject(I18n);
  protected readonly c = inject(Customer);

  /** Single product (product page). */
  readonly product = input<Product>();
  /** Several products (cart). Takes precedence over `product`. */
  readonly lines = input<OrderLine[]>();
  /** Prefix of the field ids, so two forms can be on the same page. */
  readonly prefix = input('of');
  /** Emitted when WhatsApp is opened with the order. */
  readonly sent = output<void>();

  protected readonly cities = DATA.cities;
  protected readonly other = OTHER;
  protected readonly maxQty = MAX_QTY;
  protected readonly qty = signal(1);
  /** Errors are shown only after a first send attempt. */
  protected readonly tried = signal(false);

  private readonly nameInput = viewChild.required<ElementRef<HTMLInputElement>>('nameInput');
  private readonly phoneInput = viewChild.required<ElementRef<HTMLInputElement>>('phoneInput');
  private readonly cityInput = viewChild.required<ElementRef<HTMLSelectElement>>('cityInput');
  private readonly otherInput = viewChild<ElementRef<HTMLInputElement>>('otherInput');

  /** What is being ordered: the cart lines, or the single product with its quantity. */
  private readonly items = computed<OrderLine[]>(() => {
    const lines = this.lines();
    if (lines) return lines;
    const p = this.product();
    return p ? [{ product: p, qty: this.qty() }] : [];
  });

  protected readonly total = computed(() => this.items().reduce((s, l) => s + l.product.price * l.qty, 0));

  private readonly cityName = computed(() => {
    const key = this.c.city();
    if (key === OTHER) return this.c.otherCity().trim();
    const city = this.cities.find((x) => x.key === key);
    return city ? this.i18n.pick(city.name) : '';
  });

  protected readonly delivery = computed(() => {
    const key = this.c.city();
    if (!key) return '';
    if (key === OTHER) return this.i18n.t('d_other');
    const city = this.cities.find((x) => x.key === key);
    return city ? this.i18n.t(city.delivery) : '';
  });

  protected readonly errors = computed(() => ({
    name: this.c.name().trim().length < 2,
    phone: normalizePhone(this.c.phone()) === null,
    city: !this.cityName(),
  }));

  constructor() {
    // A new product starts again at quantity 1.
    effect(() => {
      this.product();
      this.qty.set(1);
      this.tried.set(false);
    });
  }

  focus(): void {
    this.nameInput().nativeElement.focus();
  }

  protected val(e: Event): string {
    return (e.target as HTMLInputElement | HTMLSelectElement).value;
  }

  protected submit(e: Event): void {
    e.preventDefault();
    this.tried.set(true);
    const err = this.errors();
    if (err.name) return this.nameInput().nativeElement.focus();
    if (err.phone) return this.phoneInput().nativeElement.focus();
    if (err.city) return (this.otherInput() ?? this.cityInput()).nativeElement.focus();
    if (!this.items().length) return;
    window.open(this.i18n.wa(this.message()), '_blank', 'noopener');
    this.sent.emit();
  }

  /** The WhatsApp message, in the page's language. */
  private message(): string {
    const t = (k: string) => this.i18n.t(k);
    const sep = this.i18n.lang() === 'fr' ? ' : ' : ': ';
    const cur = t('cur');
    const items = this.items();
    const lines = [
      t('msg_head'),
      // One product: "Title × 2". Several: each line with its subtotal.
      ...items.map((l) =>
        items.length > 1
          ? `• ${this.i18n.pick(l.product.title)} × ${l.qty} — ${l.product.price * l.qty} ${cur}`
          : `• ${this.i18n.pick(l.product.title)} × ${l.qty}`,
      ),
      `• ${t('f_total')}${sep}${this.total()} ${cur} (${t('msg_cod')})`,
      '',
      `${t('f_name')}${sep}${this.c.name().trim()}`,
      `${t('f_phone')}${sep}${normalizePhone(this.c.phone())}`,
      `${t('f_city')}${sep}${this.cityName()}`,
    ];
    const addr = this.c.address().trim();
    if (addr) lines.push(`${t('msg_addr')}${sep}${addr}`);
    return lines.join('\n');
  }
}
