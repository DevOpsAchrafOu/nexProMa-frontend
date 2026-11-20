import raw from './site-data.json';

/** One text in the 3 languages, in this order: English, French, Arabic. */
export type Tr = [string, string, string];

export type Lang = 'en' | 'fr' | 'ar';
export const LANGS: Lang[] = ['en', 'fr', 'ar'];

export type CatKey = 'elec' | 'sport' | 'acc' | 'home';

export interface Product {
  id: number;
  cat: CatKey;
  /** Price in MAD. */
  price: number;
  /** Old (crossed-out) price in MAD. */
  old: number;
  /** Number of photos in img/g/ (p{id}_1.jpg … p{id}_{photos}.jpg). */
  photos: number;
  title: Tr;
}

interface SiteData {
  /** WhatsApp number (fictional, never displayed). */
  wa: string;
  ui: Record<string, Tr>;
  cats: Record<CatKey, Tr>;
  catOrder: CatKey[];
  /** In "Recommended" order. The first 4 are shown by default. */
  products: Product[];
}

export const DATA = raw as unknown as SiteData;

/** Number of products shown before "See all products". */
export const FEATURED = 4;

export const REVIEWS = Array.from({ length: 12 }, (_, i) => i + 1);

export function discount(p: Product): number {
  return Math.round(((p.old - p.price) * 100) / p.old);
}

export function photo(id: number, k: number): string {
  return `img/g/p${id}_${k}.jpg`;
}
