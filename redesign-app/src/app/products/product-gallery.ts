import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { I18n } from '../i18n';
import { Product, photo } from '../data/site-data';

const SWIPE_PX = 40;

/** Main photo with ‹ › buttons, swipe and arrow keys, and the thumbnails below. */
@Component({
  selector: 'app-product-gallery',
  host: { class: 'gal', '(keydown)': 'keys($event)' },
  template: `
    @let p = product();
    <div class="main">
      <img [src]="src(current())" [alt]="title() + ' — ' + current() + '/' + p.photos" width="600" height="600"
        (touchstart)="touchStart($event)" (touchend)="touchEnd($event)" />
      @if (p.photos > 1) {
        <button class="nav pv" type="button" [attr.aria-label]="i18n.t('prev')" (click)="show(current() - 1)">‹</button>
        <button class="nav nx" type="button" [attr.aria-label]="i18n.t('next')" (click)="show(current() + 1)">›</button>
      }
    </div>
    @if (p.photos > 1) {
      <div class="thumbs">
        @for (k of thumbs(); track k) {
          <button type="button" [attr.aria-label]="k + '/' + p.photos" [attr.aria-current]="k === current()" (click)="show(k)">
            <img [src]="src(k)" alt="" loading="lazy" width="80" height="80" />
          </button>
        }
      </div>
    }
  `,
})
export class ProductGallery {
  protected readonly i18n = inject(I18n);
  readonly product = input.required<Product>();

  protected readonly title = computed(() => this.i18n.pick(this.product().title));
  protected readonly thumbs = computed(() => Array.from({ length: this.product().photos }, (_, i) => i + 1));
  /** Current photo, 1-based. */
  protected readonly current = signal(1);
  private touchX: number | null = null;

  constructor() {
    // Another product starts again at its first photo.
    effect(() => {
      this.product();
      this.current.set(1);
    });
  }

  protected src(k: number): string {
    return photo(this.product().id, k);
  }

  protected show(k: number): void {
    const n = this.product().photos;
    this.current.set(((k - 1 + n) % n) + 1);
  }

  protected keys(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft') this.show(this.current() - 1);
    if (e.key === 'ArrowRight') this.show(this.current() + 1);
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
