import { Component, afterNextRender, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SiteHeader } from './layout/site-header';
import { SiteFooter } from './layout/site-footer';
import { ViewportScroller } from '@angular/common';
import { I18n } from './i18n';

/** Height of the sticky header, kept free above the target of an anchor link. */
const HEADER_PX = 64;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  host: { style: 'display:contents' },
  template: `
    <header appSiteHeader></header>
    <main id="top"><router-outlet /></main>
    <app-site-footer />
  `,
})
export class App {
  constructor() {
    const router = inject(Router);
    const i18n = inject(I18n);
    // Anchor links (#products, #faq…) stop below the sticky header instead of under it.
    inject(ViewportScroller).setOffset([0, HEADER_PX]);
    // Old links used ?lang=fr: send them to the French page.
    afterNextRender(() => {
      if (new URLSearchParams(location.search).get('lang') === 'fr' && i18n.lang() === 'en') {
        router.navigateByUrl(i18n.switchTo('fr'), { replaceUrl: true });
      }
    });
  }
}
