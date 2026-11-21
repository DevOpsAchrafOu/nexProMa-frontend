import { Component, computed, inject, input } from '@angular/core';
import { I18n } from '../i18n';
import { Icon } from './icons';
import { Favorites } from './saved-products';

/** Heart button: adds the product to the favorites, or removes it. */
@Component({
  selector: 'app-fav-button',
  imports: [Icon],
  host: { style: 'display:contents' },
  template: `
    <button class="fav" type="button" [class.on]="on()" [attr.aria-pressed]="on()"
      [attr.aria-label]="i18n.t(on() ? 'fav_remove' : 'fav_add')" [attr.title]="i18n.t(on() ? 'fav_remove' : 'fav_add')"
      (click)="toggle($event)">
      <app-icon name="heart" />
    </button>
  `,
})
export class FavButton {
  protected readonly i18n = inject(I18n);
  private readonly favorites = inject(Favorites);
  readonly productId = input.required<number>();
  protected readonly on = computed(() => this.favorites.products().some((p) => p.id === this.productId()));

  protected toggle(e: Event): void {
    // The button sits on top of the product link: don't open the product.
    e.preventDefault();
    e.stopPropagation();
    this.favorites.toggle(this.productId());
  }
}
