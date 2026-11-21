import { Component, afterNextRender, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { I18n } from '../i18n';
import { Seo } from '../seo';
import { Hero } from '../sections/hero';
import { About, Faq, FinalCta, HowToOrder, Reviews } from '../sections/info-sections';
import { ProductsSection } from '../products/products-section';
import { DATA, SITE_URL } from '../data/site-data';
import { Reveal } from '../shared/reveal';

@Component({
  selector: 'app-home-page',
  imports: [Hero, ProductsSection, HowToOrder, Reviews, About, Faq, FinalCta, Reveal],
  host: { style: 'display:contents' },
  template: `
    <app-hero />
    <section appProducts></section>
    <section appHowToOrder appReveal></section>
    <section appReviews appReveal></section>
    <section appAbout appReveal></section>
    <section appFaq appReveal></section>
    <section appFinalCta appReveal></section>
  `,
})
export class HomePage {
  private readonly i18n = inject(I18n);
  private readonly seo = inject(Seo);

  constructor() {
    // Coming from another page with #products, #faq…: scroll there once the page is drawn.
    const route = inject(ActivatedRoute);
    const scroller = inject(ViewportScroller);
    afterNextRender(() => {
      const id = route.snapshot.fragment;
      if (id) scroller.scrollToAnchor(id);
    });
    effect(() => {
      const lang = this.i18n.lang();
      this.seo.set({
        lang,
        title: this.i18n.t('title'),
        description: this.i18n.t('lead'),
        path: '',
        image: 'img/p23.jpg',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: 'nexProMa',
          url: SITE_URL + (lang === 'fr' ? 'fr/' : ''),
          image: SITE_URL + 'img/logo.svg',
          foundingDate: '2024',
          areaServed: ['Salé', 'Rabat', 'Témara'],
          paymentAccepted: 'Cash on delivery',
          description: this.i18n.t('lead'),
          makesOffer: DATA.products.map((p) => ({
            '@type': 'Offer',
            price: p.price,
            priceCurrency: 'MAD',
            url: SITE_URL + (lang === 'fr' ? 'fr/' : '') + 'p/' + p.slug + '/',
            itemOffered: { '@type': 'Product', name: this.i18n.pick(p.title) },
          })),
        },
      });
    });
  }
}
