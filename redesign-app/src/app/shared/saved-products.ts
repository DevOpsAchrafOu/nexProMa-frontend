import { Injectable, computed, signal } from '@angular/core';
import { DATA, Product } from '../data/site-data';

/** Product ids kept in the visitor's browser (localStorage). Read only after the page is displayed. */
abstract class SavedIds {
  protected abstract readonly key: string;
  protected abstract readonly max: number;
  protected readonly ids = signal<number[]>([]);
  private loaded = false;

  readonly products = computed<Product[]>(() =>
    this.ids().flatMap((id) => DATA.products.filter((p) => p.id === id)),
  );
  readonly count = computed(() => this.ids().length);

  /** Reads the saved list once (browser only). Called after the page is displayed, and before any change. */
  restore(): void {
    if (this.loaded) return;
    this.loaded = true;
    try {
      const raw = JSON.parse(localStorage.getItem(this.key) ?? '[]');
      if (Array.isArray(raw)) this.ids.set(raw.filter((x) => Number.isInteger(x)).slice(0, this.max));
    } catch {
      // Private window or blocked storage: start empty.
    }
  }

  has(id: number): boolean {
    return this.ids().includes(id);
  }

  clear(): void {
    this.save([]);
  }

  protected save(ids: number[]): void {
    this.restore();
    this.ids.set(ids.slice(0, this.max));
    try {
      localStorage.setItem(this.key, JSON.stringify(this.ids()));
    } catch {
      // Storage unavailable: works until the page is closed.
    }
  }
}

/** Products the visitor saved with the heart button. */
@Injectable({ providedIn: 'root' })
export class Favorites extends SavedIds {
  protected readonly key = 'nx_fav';
  protected readonly max = 60;

  toggle(id: number): void {
    this.restore();
    this.save(this.has(id) ? this.ids().filter((x) => x !== id) : [id, ...this.ids()]);
  }
}

/** Last product pages the visitor opened, most recent first. */
@Injectable({ providedIn: 'root' })
export class RecentlyViewed extends SavedIds {
  protected readonly key = 'nx_seen';
  protected readonly max = 12;

  add(id: number): void {
    this.restore();
    this.save([id, ...this.ids().filter((x) => x !== id)]);
  }

  /** Recent products except the given one, at most `n`. */
  except(id: number | null, n = 4): Product[] {
    return this.products()
      .filter((p) => p.id !== id)
      .slice(0, n);
  }
}
