import { Component } from '@angular/core';
import { SiteHeader } from './layout/site-header';
import { SiteFooter } from './layout/site-footer';
import { Hero } from './sections/hero';
import { About, Faq, FinalCta, HowToOrder, Reviews } from './sections/info-sections';
import { ProductsSection } from './products/products-section';
import { QuickView } from './products/quick-view';

@Component({
  selector: 'app-root',
  imports: [SiteHeader, Hero, ProductsSection, HowToOrder, Reviews, About, Faq, FinalCta, SiteFooter, QuickView],
  host: { style: 'display:contents' },
  template: `
    <header appSiteHeader></header>
    <main id="top">
      <app-hero />
      <section appProducts></section>
      <section appHowToOrder></section>
      <section appReviews></section>
      <section appAbout></section>
      <section appFaq></section>
      <section appFinalCta></section>
    </main>
    <app-site-footer />
    <app-quick-view />
  `,
})
export class App {}
