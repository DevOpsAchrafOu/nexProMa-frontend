import { Injectable, signal } from '@angular/core';

/** Which product is open in the quick view dialog (null = closed). */
@Injectable({ providedIn: 'root' })
export class QuickViewState {
  readonly productId = signal<number | null>(null);

  open(id: number): void {
    this.productId.set(id);
  }

  close(): void {
    this.productId.set(null);
  }
}
