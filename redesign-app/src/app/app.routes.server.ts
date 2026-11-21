import { RenderMode, ServerRoute } from '@angular/ssr';
import { DATA } from './data/site-data';

const slugs = async () => DATA.products.map((p) => ({ slug: p.slug }));

/** Every page is generated as static HTML at build time (no server needed on GitHub Pages). */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'fr', renderMode: RenderMode.Prerender },
  { path: 'p/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: slugs },
  { path: 'fr/p/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: slugs },
  { path: '**', renderMode: RenderMode.Client },
];
