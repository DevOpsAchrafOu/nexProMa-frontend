import { Injectable, signal } from '@angular/core';

/** Which product is open in the quick view dialog (null = closed). */
@Injectable({ providedIn: 'root' })
export class QuickViewState {
  readonly productId = signal<number | null>(null);
  /** True when the dialog was opened to order: the order form gets the focus. */
  readonly toOrder = signal(false);

  open(id: number, toOrder = false): void {
    this.toOrder.set(toOrder);
    this.productId.set(id);
  }

  close(): void {
    this.productId.set(null);
  }
}
