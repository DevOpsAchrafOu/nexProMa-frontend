import { Component, DestroyRef, OnInit, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n, inBrowser, prefersReducedMotion } from '../i18n';
import { Icon } from '../shared/icons';
import { Product, discount, photo } from '../data/site-data';

const SLIDE_MS = 3200;
const MAX_SLIDES = 4;

@Component({
  selector: 'article[appProductCard]',
  imports: [Icon, RouterLink],
  host: {
    class: 'card',
    '[class.more]': 'more()',
    '[class.pop]': 'popDelay() !== null',
    '[style.animation-delay.ms]': 'popDelay()',
  },
  template: `
    @let p = product();
    <a class="ph" [routerLink]="link()">
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
    </a>
    <div class="cb">
      <span class="cat">{{ i18n.cat(p.cat) }}</span>
      <h3><a class="tl" [routerLink]="link()">{{ title() }}</a></h3>
      <div class="pr">
        <strong>{{ p.price }} {{ i18n.t('cur') }}</strong><s>{{ p.old }} {{ i18n.t('cur') }}</s>
      </div>
      <span class="fd"><app-icon name="truck" />{{ i18n.t('fd') }}</span>
      <a class="btn wa" [routerLink]="link()" fragment="order"><app-icon name="wa" />{{ i18n.t('order') }}</a>
    </div>
  `,
})
export class ProductCard implements OnInit {
  protected readonly i18n = inject(I18n);
  private readonly destroyRef = inject(DestroyRef);
  private readonly browser = inBrowser();

  readonly product = input.required<Product>();
  /** Hidden while the grid is collapsed. */
  readonly more = input(false);
  /** Featured cards rotate through their first photos; `order` staggers them. */
  readonly featured = input(false);
  readonly order = input(0);
  /** Set when the card appears after "See all products" (ms of delay), else null. */
  readonly popDelay = input<number | null>(null);

  protected readonly title = computed(() => this.i18n.pick(this.product().title));
  protected readonly off = computed(() => discount(this.product()));
  /** Product page in the current language. "Order" adds #order to open it on the form. */
  protected readonly link = computed(() => this.i18n.link('p', this.product().slug));

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
    // The slideshow runs only in the visitor's browser, never while pages are generated.
    if (!this.browser || this.slides() < 2 || prefersReducedMotion()) return;
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
