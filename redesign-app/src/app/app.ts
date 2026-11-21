import { Component, afterNextRender, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { SiteHeader } from './layout/site-header';
import { SiteFooter } from './layout/site-footer';
import { CartDrawer } from './cart/cart-drawer';
import { CartToast } from './cart/cart-toast';
import { Cart } from './cart/cart';
import { Favorites, RecentlyViewed } from './shared/saved-products';
import { I18n } from './i18n';

/** Height of the sticky header, kept free above the target of an anchor link. */
const HEADER_PX = 64;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter, CartDrawer, CartToast],
  host: { style: 'display:contents' },
  template: `
    <header appSiteHeader></header>
    <main id="top"><router-outlet /></main>
    <app-site-footer />
    <app-cart-drawer />
    <app-cart-toast />
  `,
})
export class App {
  constructor() {
    const router = inject(Router);
    const i18n = inject(I18n);
    const cart = inject(Cart);
    const favorites = inject(Favorites);
    const seen = inject(RecentlyViewed);
    // Anchor links (#products, #faq…) stop below the sticky header instead of under it.
    inject(ViewportScroller).setOffset([0, HEADER_PX]);
    afterNextRender(() => {
      // The saved cart is read in the browser only, after the generated page is displayed.
      cart.restore();
      favorites.restore();
      seen.restore();
      // Old links used ?lang=fr: send them to the French page.
      if (new URLSearchParams(location.search).get('lang') === 'fr' && i18n.lang() === 'en') {
        router.navigateByUrl(i18n.switchTo('fr'), { replaceUrl: true });
      }
    });
  }
}
