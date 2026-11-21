import { Component, computed, inject, signal } from '@angular/core';
import { I18n, prefersReducedMotion } from '../i18n';
import { Icon } from '../shared/icons';
import { ProductCard } from './product-card';
import { CatKey, DATA, FEATURED, Product, discount } from '../data/site-data';

type Sort = 'rec' | 'low' | 'high' | 'off';
type Filter = CatKey | 'all';

const POP_STEP_MS = 45;
const POP_MAX_STEPS = 12;

/** Lower case, without accents, for search. */
function norm(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

const SORT_KEY: Record<Sort, (p: Product, rank: number) => number> = {
  rec: (_, rank) => rank,
  low: (p) => p.price,
  high: (p) => -p.price,
  off: (p) => -discount(p),
};

@Component({
  selector: 'section[appProducts]',
  imports: [Icon, ProductCard],
  host: { id: 'products' },
  template: `
    <div class="wrap">
      <h2>{{ i18n.t('p_h') }}</h2>
      <p class="sub">{{ i18n.t('p_sub') }}</p>

      <div class="tools">
        <input type="search" id="q" aria-label="Search" [placeholder]="i18n.t('search')" [value]="query()" (input)="setQuery($event)" />
        <label for="sort">
          <span>{{ i18n.t('sort_l') }}</span>
          <select id="sort" [value]="sort()" (change)="setSort($event)">
            @for (s of sorts; track s.value) {
              <option [value]="s.value" [selected]="sort() === s.value">{{ i18n.t(s.label) }}</option>
            }
          </select>
        </label>
      </div>

      <div class="chips" role="group">
        <button class="chip" type="button" [class.on]="filter() === 'all'" [attr.aria-pressed]="filter() === 'all'" (click)="setFilter('all')">
          {{ i18n.t('all') }} ({{ products.length }})
        </button>
        @for (c of chips; track c.key) {
          <button class="chip" type="button" [class.on]="filter() === c.key" [attr.aria-pressed]="filter() === c.key" (click)="setFilter(c.key)">
            <span>{{ i18n.cat(c.key) }}</span> ({{ c.count }})
          </button>
        }
      </div>

      <div class="grid" id="grid" [class.collapsed]="!expanded()">
        @for (item of visible(); track item.p.id) {
          <article
            appProductCard
            [product]="item.p"
            [more]="item.rank >= featured"
            [featured]="item.rank < featured"
            [order]="item.rank"
            [popDelay]="popDelays().get(item.p.id) ?? null"
          ></article>
        }
      </div>

      <div class="morewrap" id="morewrap" [hidden]="expanded()">
        <button class="btn more" type="button" id="more" (click)="expand(true)">
          <span>{{ i18n.t('more') }}</span> ({{ products.length }})<app-icon name="chevron" />
        </button>
      </div>
      <p class="none" id="none" [style.display]="visible().length ? 'none' : 'block'">{{ i18n.t('none') }}</p>
    </div>
  `,
})
export class ProductsSection {
  protected readonly i18n = inject(I18n);

  protected readonly products = DATA.products;
  protected readonly featured = FEATURED;
  protected readonly sorts: { value: Sort; label: string }[] = [
    { value: 'rec', label: 'sort_rec' },
    { value: 'low', label: 'sort_low' },
    { value: 'high', label: 'sort_high' },
    { value: 'off', label: 'sort_off' },
  ];
  protected readonly chips = DATA.catOrder.map((key) => ({
    key,
    count: DATA.products.filter((p) => p.cat === key).length,
  }));

  protected readonly query = signal('');
  protected readonly sort = signal<Sort>('rec');
  protected readonly filter = signal<Filter>('all');
  protected readonly expanded = signal(false);
  /** Product id → animation delay, for the cards revealed by "See all products". */
  protected readonly popDelays = signal(new Map<number, number>());

  /** Search text per product: titles and category names in all 3 languages. */
  private readonly haystack = new Map(
    DATA.products.map((p) => [p.id, norm([...p.title, ...DATA.cats[p.cat]].join(' '))]),
  );

  protected readonly visible = computed(() => {
    const q = norm(this.query().trim());
    const f = this.filter();
    const key = SORT_KEY[this.sort()];
    return this.products
      .map((p, rank) => ({ p, rank }))
      .filter(({ p }) => (f === 'all' || p.cat === f) && (!q || this.haystack.get(p.id)!.includes(q)))
      .sort((a, b) => key(a.p, a.rank) - key(b.p, b.rank));
  });

  protected setQuery(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
    if (this.query().trim()) this.expand(false);
  }

  protected setSort(e: Event): void {
    this.sort.set((e.target as HTMLSelectElement).value as Sort);
    if (this.sort() !== 'rec') this.expand(false);
  }

  protected setFilter(f: Filter): void {
    this.filter.set(f);
    if (f !== 'all') this.expand(false);
  }

  /** Show every product. Searching, filtering or sorting also does it, without animation. */
  protected expand(animate: boolean): void {
    if (this.expanded()) return;
    this.expanded.set(true);
    if (!animate || prefersReducedMotion()) return;
    const delays = new Map<number, number>();
    let k = 0;
    for (const { p, rank } of this.visible()) {
      if (rank >= FEATURED) delays.set(p.id, Math.min(k++, POP_MAX_STEPS) * POP_STEP_MS);
    }
    this.popDelays.set(delays);
  }
}
