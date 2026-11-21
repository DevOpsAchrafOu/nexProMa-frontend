import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n';
import { Seo } from '../seo';
import { Icon } from '../shared/icons';
import { Favorites } from '../shared/saved-products';
import { ProductCard } from '../products/product-card';
import { RecentlyViewedSection } from '../products/recently-viewed';

/** The visitor's favorites (saved in their browser). Not indexed by search engines. */
@Component({
  selector: 'app-favorites-page',
  imports: [RouterLink, Icon, ProductCard, RecentlyViewedSection],
  host: { style: 'display:contents' },
  template: `
    <section class="favs"><div class="wrap">
      <h1 class="page-h">{{ i18n.t('fav_title') }} @if (fav.count()) { <span class="count">({{ fav.count() }})</span> }</h1>
      <p class="sub">{{ i18n.t('fav_sub') }}</p>
      @if (fav.products().length) {
        <div class="grid">
          @for (p of fav.products(); track p.id) {
            <article appProductCard [product]="p"></article>
          }
        </div>
      } @else {
        <div class="empty-state">
          <app-icon name="heart" />
          <p>{{ i18n.t('fav_empty') }}</p>
          <a class="btn primary" [routerLink]="i18n.link('')" fragment="products">{{ i18n.t('see') }}</a>
        </div>
      }
    </div></section>
    <section appRecentlyViewed></section>
  `,
})
export class FavoritesPage {
  protected readonly i18n = inject(I18n);
  protected readonly fav = inject(Favorites);
  private readonly seo = inject(Seo);

  constructor() {
    effect(() => {
      const lang = this.i18n.lang();
      this.seo.set({
        lang,
        title: `${this.i18n.t('fav_title')} | nexProMa`,
        description: this.i18n.t('fav_sub'),
        path: 'favorites',
        image: 'img/p12.jpg',
        jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: this.i18n.t('fav_title') },
        noindex: true,
      });
    });
  }
}
