import { Component, DestroyRef, OnInit, computed, inject, input, output, signal } from '@angular/core';
import { I18n, prefersReducedMotion } from '../i18n';
import { Icon } from '../shared/icons';
import { Product, discount, photo } from '../data/site-data';

const SLIDE_MS = 3200;
const MAX_SLIDES = 4;

@Component({
  selector: 'article[appProductCard]',
  imports: [Icon],
  host: {
    class: 'card',
    '[class.more]': 'more()',
    '[class.pop]': 'popDelay() !== null',
    '[style.animation-delay.ms]': 'popDelay()',
  },
  template: `
    @let p = product();
    <button class="ph" type="button" (click)="open.emit(p.id)">
      <img [src]="'img/p' + p.id + '.jpg'" [alt]="title()" loading="lazy" width="600" height="600" />
      @for (src of layers(); track src; let k = $index) {
        <img class="layer" [class.show]="slide() === k + 2" [src]="src" alt="" loading="lazy" />
      }
      <span class="off" dir="ltr">-{{ off() }}%</span>
      <span class="cnt"><app-icon name="camera" /><span dir="ltr">{{ p.photos }}</span></span>
      <span class="sr">{{ i18n.t('details') }}</span>
      @if (slides() > 1) {
        <span class="dots" aria-hidden="true">
          @for (d of dots(); track d) {
            <i [class.on]="slide() === d"></i>
          }
        </span>
      }
    </button>
    <div class="cb">
      <span class="cat">{{ i18n.cat(p.cat) }}</span>
      <h3><button class="tl" type="button" (click)="open.emit(p.id)">{{ title() }}</button></h3>
      <div class="pr">
        <strong>{{ p.price }} {{ i18n.t('cur') }}</strong><s>{{ p.old }} {{ i18n.t('cur') }}</s>
      </div>
      <span class="fd"><app-icon name="truck" />{{ i18n.t('fd') }}</span>
      <button class="btn wa" type="button" (click)="buy.emit(p.id)"><app-icon name="wa" />{{ i18n.t('order') }}</button>
    </div>
  `,
})
export class ProductCard implements OnInit {
  protected readonly i18n = inject(I18n);
  private readonly destroyRef = inject(DestroyRef);

  readonly product = input.required<Product>();
  /** Hidden while the grid is collapsed. */
  readonly more = input(false);
  /** Featured cards rotate through their first photos; `order` staggers them. */
  readonly featured = input(false);
  readonly order = input(0);
  /** Set when the card appears after "See all products" (ms of delay), else null. */
  readonly popDelay = input<number | null>(null);

  readonly open = output<number>();
  /** "Order" opens the product dialog on its order form. */
  readonly buy = output<number>();

  protected readonly title = computed(() => this.i18n.pick(this.product().title));
  protected readonly off = computed(() => discount(this.product()));

  /** Number of photos in the slideshow (1 = no slideshow). */
  protected readonly slides = computed(() => (this.featured() ? Math.min(this.product().photos, MAX_SLIDES) : 1));
  /** Photos 2…n, stacked over the main photo. */
  protected readonly layers = computed(() =>
    Array.from({ length: this.slides() - 1 }, (_, i) => photo(this.product().id, i + 2)),
  );
  protected readonly dots = computed(() => Array.from({ length: this.slides() }, (_, i) => i + 1));
  /** Current photo, 1-based. */
  protected readonly slide = signal(1);

  ngOnInit(): void {
    if (this.slides() < 2 || prefersReducedMotion()) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        if (!document.hidden) this.slide.update((s) => (s % this.slides()) + 1);
      }, SLIDE_MS);
    }, SLIDE_MS + this.order() * 350);
    this.destroyRef.onDestroy(() => {
      clearTimeout(start);
      clearInterval(timer);
    });
  }
}
