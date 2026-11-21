import { Injectable, computed, signal } from '@angular/core';
import { DATA } from '../data/site-data';
import { MAX_QTY, OrderLine } from '../products/order-form';

const STORAGE_KEY = 'nx_cart';
const TOAST_MS = 3500;

interface Saved {
  id: number;
  qty: number;
}

/**
 * The WhatsApp cart: products and quantities, kept in the visitor's browser (localStorage)
 * so it survives a reload. Nothing is sent anywhere until the visitor sends the WhatsApp message.
 */
@Injectable({ providedIn: 'root' })
export class Cart {
  private readonly saved = signal<Saved[]>([]);
  /** Whether the cart panel is open. */
  readonly open = signal(false);
  /** Title of the product just added (shown in a short confirmation), or null. */
  readonly toast = signal<string | null>(null);
  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  readonly lines = computed<OrderLine[]>(() =>
    this.saved().flatMap((s) => {
      const product = DATA.products.find((p) => p.id === s.id);
      return product ? [{ product, qty: s.qty }] : [];
    }),
  );
  readonly count = computed(() => this.lines().reduce((n, l) => n + l.qty, 0));
  readonly total = computed(() => this.lines().reduce((s, l) => s + l.product.price * l.qty, 0));

  /** Reads the saved cart. Called once in the browser, after the page is displayed. */
  restore(): void {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (Array.isArray(raw)) {
        this.saved.set(
          raw
            .filter((x) => Number.isInteger(x?.id) && Number.isInteger(x?.qty) && x.qty > 0)
            .map((x) => ({ id: x.id, qty: Math.min(x.qty, MAX_QTY) })),
        );
      }
    } catch {
      // Private window or blocked storage: the cart simply starts empty.
    }
  }

  add(id: number, title: string, qty = 1): void {
    this.update((items) => {
      const found = items.find((x) => x.id === id);
      return found
        ? items.map((x) => (x.id === id ? { ...x, qty: Math.min(x.qty + qty, MAX_QTY) } : x))
        : [...items, { id, qty: Math.min(qty, MAX_QTY) }];
    });
    this.toast.set(title);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), TOAST_MS);
  }

  setQty(id: number, qty: number): void {
    if (qty < 1) return this.remove(id);
    this.update((items) => items.map((x) => (x.id === id ? { ...x, qty: Math.min(qty, MAX_QTY) } : x)));
  }

  remove(id: number): void {
    this.update((items) => items.filter((x) => x.id !== id));
  }

  clear(): void {
    this.update(() => []);
  }

  show(): void {
    this.toast.set(null);
    this.open.set(true);
  }

  private update(fn: (items: Saved[]) => Saved[]): void {
    this.saved.update(fn);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.saved()));
    } catch {
      // Storage unavailable: the cart still works until the page is closed.
    }
  }
}
