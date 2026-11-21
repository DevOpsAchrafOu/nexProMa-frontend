import { Component, computed, inject, input } from '@angular/core';
import { I18n } from '../i18n';
import { RecentlyViewed } from '../shared/saved-products';
import { ProductCard } from './product-card';

/**
 * "Recently viewed": the last products the visitor opened (from their browser).
 * Shows nothing until there is something to show, so the generated HTML has no empty section.
 */
@Component({
  selector: 'section[appRecentlyViewed]',
  imports: [ProductCard],
  host: { class: 'seen', '[hidden]': '!items().length' },
  template: `
    @if (items().length) {
      <div class="wrap">
        <div class="seen-head">
          <h2>{{ i18n.t('seen_h') }}</h2>
          <button type="button" class="link" (click)="seen.clear()">{{ i18n.t('seen_clear') }}</button>
        </div>
        <div class="grid">
          @for (p of items(); track p.id) {
            <article appProductCard [product]="p"></article>
          }
        </div>
      </div>
    }
  `,
})
export class RecentlyViewedSection {
  protected readonly i18n = inject(I18n);
  protected readonly seen = inject(RecentlyViewed);
  /** Product of the current page, left out of the list. */
  readonly exclude = input<number | null>(null);
  protected readonly items = computed(() => this.seen.except(this.exclude(), 4));
}
