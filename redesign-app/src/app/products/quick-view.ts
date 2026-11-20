import { Component, ElementRef, Injector, afterNextRender, computed, effect, inject, signal, viewChild } from '@angular/core';
import { I18n } from '../i18n';
import { Icon } from '../shared/icons';
import { QuickViewState } from '../shared/quick-view.service';
import { DATA, photo } from '../data/site-data';
import { OrderForm } from './order-form';

const SWIPE_PX = 40;

/** Product dialog: photo gallery, price, WhatsApp order and question links. */
@Component({
  selector: 'app-quick-view',
  imports: [Icon, OrderForm],
  host: { style: 'display:contents' },
  template: `
    <dialog #dlg id="qv" aria-labelledby="qvt" (close)="state.close()" (click)="backdrop($event)" (keydown)="keys($event)">
      <button class="x" type="button" [attr.aria-label]="i18n.t('close')" (click)="dlg.close()">×</button>
      @if (product(); as p) {
        <div class="qv">
          <div class="gal">
            <div class="main">
              <img id="qvimg" [src]="src(current())" [alt]="title() + ' — ' + current() + '/' + p.photos" (touchstart)="touchStart($event)" (touchend)="touchEnd($event)" />
              <button class="nav pv" type="button" [hidden]="p.photos < 2" [attr.aria-label]="i18n.t('prev')" (click)="back()">‹</button>
              <button class="nav nx" type="button" [hidden]="p.photos < 2" [attr.aria-label]="i18n.t('next')" (click)="forward()">›</button>
            </div>
            <div class="thumbs">
              @for (k of thumbs(); track k) {
                <button type="button" [attr.aria-label]="k + '/' + p.photos" [attr.aria-current]="k === current()" (click)="show(k)">
                  <img [src]="src(k)" alt="" loading="lazy" />
                </button>
              }
            </div>
          </div>
          <div class="info">
            <span class="cat">{{ i18n.cat(p.cat) }}</span>
            <h2 id="qvt">{{ title() }}</h2>
            <div class="pr">
              <strong>{{ p.price }} {{ i18n.t('cur') }}</strong><s>{{ p.old }} {{ i18n.t('cur') }}</s>
            </div>
            <span class="saveb">{{ i18n.t('save', { s: p.old - p.price }) }}</span>
            <p class="desc">{{ i18n.pick(p.about) }}</p>
            <h3 class="feat-h">{{ i18n.t('feat_h') }}</h3>
            <ul class="feat">
              @for (pt of p.points; track $index) {
                <li>{{ i18n.pick(pt) }}</li>
              }
            </ul>
            <ul>
              <li><app-icon name="check" />{{ i18n.t('m1') }}</li>
              <li><app-icon name="check" />{{ i18n.t('m2') }}</li>
              <li><app-icon name="check" />{{ i18n.t('m3') }}</li>
            </ul>
            <form appOrderForm [product]="p"></form>
            <a class="ask" [href]="i18n.wa(i18n.t('wa_ask', { t: title() }))" target="_blank" rel="noopener">{{ i18n.t('askp') }}</a>
          </div>
        </div>
      }
    </dialog>
  `,
})
export class QuickView {
  protected readonly i18n = inject(I18n);
  protected readonly state = inject(QuickViewState);
  private readonly injector = inject(Injector);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');
  private readonly orderForm = viewChild(OrderForm);

  protected readonly product = computed(() => {
    const id = this.state.productId();
    return id === null ? null : (DATA.products.find((p) => p.id === id) ?? null);
  });
  protected readonly title = computed(() => {
    const p = this.product();
    return p ? this.i18n.pick(p.title) : '';
  });
  protected readonly thumbs = computed(() => Array.from({ length: this.product()?.photos ?? 0 }, (_, i) => i + 1));
  /** Current photo, 1-based. */
  protected readonly current = signal(1);
  private touchX: number | null = null;

  constructor() {
    effect(() => {
      const dlg = this.dialog().nativeElement;
      if (this.state.productId() === null) return;
      this.current.set(1);
      if (!dlg.open) dlg.showModal();
      if (this.state.toOrder()) {
        // Wait for the form to render, then put the cursor in the first field.
        afterNextRender(() => this.orderForm()?.focus(), { injector: this.injector });
      }
    });
  }

  protected src(k: number): string {
    const p = this.product();
    return p ? photo(p.id, k) : '';
  }

  protected show(k: number): void {
    const n = this.product()?.photos ?? 1;
    this.current.set(((k - 1 + n) % n) + 1);
  }

  protected back(): void {
    this.show(this.current() - 1);
  }

  protected forward(): void {
    this.show(this.current() + 1);
  }

  protected keys(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft') this.back();
    if (e.key === 'ArrowRight') this.forward();
  }

  protected backdrop(e: MouseEvent): void {
    if (e.target === this.dialog().nativeElement) this.dialog().nativeElement.close();
  }

  protected touchStart(e: TouchEvent): void {
    this.touchX = e.touches[0].clientX;
  }

  protected touchEnd(e: TouchEvent): void {
    if (this.touchX === null) return;
    const d = e.changedTouches[0].clientX - this.touchX;
    if (Math.abs(d) > SWIPE_PX) this.show(d < 0 ? this.current() + 1 : this.current() - 1);
    this.touchX = null;
  }
}
