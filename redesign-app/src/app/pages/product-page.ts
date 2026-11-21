import { Component, Injector, afterNextRender, computed, effect, inject, input, untracked, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { I18n, inBrowser } from '../i18n';
import { RecentlyViewed } from '../shared/saved-products';
import { FavButton } from '../shared/fav-button';
import { RecentlyViewedSection } from '../products/recently-viewed';
import { Seo, pageUrl } from '../seo';
import { Icon } from '../shared/icons';
import { ProductGallery } from '../products/product-gallery';
import { OrderForm } from '../products/order-form';
import { ProductCard } from '../products/product-card';
import { HowToOrder } from '../sections/info-sections';
import { DATA, Product, SITE_URL, photo, productBySlug } from '../data/site-data';
import { Cart } from '../cart/cart';

const RELATED = 4;

/** One product: photos, price, description, order form, then similar products. */
@Component({
  selector: 'app-product-page',
  imports: [RouterLink, Icon, ProductGallery, OrderForm, ProductCard, HowToOrder, FavButton, RecentlyViewedSection],
  host: { style: 'display:contents' },
  template: `
    @if (product(); as p) {
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a [routerLink]="i18n.link('')">{{ i18n.t('crumb_home') }}</a>
          <span aria-hidden="true">›</span>
          <a [routerLink]="i18n.link('')" fragment="products">{{ i18n.cat(p.cat) }}</a>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{{ title() }}</span>
        </nav>
      </div>

      <section class="pp"><div class="wrap">
        <div class="qv">
          <app-product-gallery [product]="p" />
          <div class="info">
            <span class="cat">{{ i18n.cat(p.cat) }}</span>
            <h1 class="pt">{{ title() }}</h1>
            <div class="pr">
              <strong>{{ p.price }} {{ i18n.t('cur') }}</strong><s>{{ p.old }} {{ i18n.t('cur') }}</s>
            </div>
            <span class="saveb">{{ i18n.t('save', { s: p.old - p.price }) }}</span>
            <p class="desc">{{ i18n.pick(p.about) }}</p>
            <h2 class="feat-h">{{ i18n.t('feat_h') }}</h2>
            <ul class="feat">
              @for (pt of p.points; track $index) {
                <li>{{ i18n.pick(pt) }}</li>
              }
            </ul>
            <ul>
              <li><app-icon name="check" />{{ i18n.t('m1') }}</li>
              <li><app-icon name="check" />{{ i18n.t('m2') }}</li>
              <li><app-icon name="check" />{{ i18n.t('m3') }}</li>
            </ul>
            <div class="buy-row">
              <button class="btn outline add-cart" type="button" (click)="cart.add(p.id, title())">
                <app-icon name="bag-plus" />{{ i18n.t('cart_add') }}
              </button>
              <app-fav-button [productId]="p.id" />
            </div>
            <form appOrderForm id="order" [product]="p"></form>
            <a class="ask" [href]="i18n.wa(i18n.t('wa_ask', { t: title() }))" target="_blank" rel="noopener">{{ i18n.t('askp') }}</a>
          </div>
        </div>
      </div></section>

      @if (related().length) {
        <section class="related"><div class="wrap">
          <h2>{{ i18n.t('related_h') }}</h2>
          <div class="grid">
            @for (r of related(); track r.id) {
              <article appProductCard [product]="r"></article>
            }
          </div>
        </div></section>
      }

      <section appRecentlyViewed [exclude]="p.id"></section>

      <section appHowToOrder></section>
    }
  `,
})
export class ProductPage {
  protected readonly i18n = inject(I18n);
  protected readonly cart = inject(Cart);
  private readonly seo = inject(Seo);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private readonly orderForm = viewChild(OrderForm);
  private readonly seen = inject(RecentlyViewed);
  private readonly browser = inBrowser();

  /** From the URL p/:slug. */
  readonly slug = input.required<string>();

  protected readonly product = computed(() => productBySlug(this.slug()));
  protected readonly title = computed(() => {
    const p = this.product();
    return p ? this.i18n.pick(p.title) : '';
  });
  /** Same category first, then the next products, never the product itself. */
  protected readonly related = computed(() => {
    const p = this.product();
    if (!p) return [];
    const others = DATA.products.filter((x) => x.id !== p.id);
    return [...others.filter((x) => x.cat === p.cat), ...others.filter((x) => x.cat !== p.cat)].slice(0, RELATED);
  });

  constructor() {
    effect(() => {
      const p = this.product();
      if (!p) {
        this.router.navigateByUrl(this.i18n.link(''));
        return;
      }
      this.seo.set(this.pageSeo(p));
      // Remember the visit in the browser, for "Recently viewed".
      if (this.browser) untracked(() => this.seen.add(p.id));
      // "Order" on a card links here with #order: put the cursor in the form.
      if (this.route.snapshot.fragment === 'order') {
        afterNextRender(() => this.orderForm()?.focus(), { injector: this.injector });
      }
    });
  }

  private pageSeo(p: Product) {
    const lang = this.i18n.lang();
    const title = this.title();
    const url = pageUrl(lang, 'p/' + p.slug);
    return {
      lang,
      title: `${title} — ${p.price} ${this.i18n.t('cur')} | nexProMa`,
      description: `${this.i18n.pick(p.about)} ${this.i18n.t('m1')}. ${this.i18n.t('m2')}.`,
      path: 'p/' + p.slug,
      image: `img/p${p.id}.jpg`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: title,
        description: this.i18n.pick(p.about),
        sku: String(p.id),
        category: this.i18n.cat(p.cat),
        image: [SITE_URL + `img/p${p.id}.jpg`, ...Array.from({ length: Math.min(p.photos, 4) }, (_, i) => SITE_URL + photo(p.id, i + 1))],
        offers: {
          '@type': 'Offer',
          url,
          price: p.price,
          priceCurrency: 'MAD',
          seller: { '@type': 'Organization', name: 'nexProMa' },
        },
      },
    };
  }
}
