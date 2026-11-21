import { RenderMode, ServerRoute } from '@angular/ssr';
import { DATA } from './data/site-data';
import { INFO_KEYS } from './data/info-pages';

const slugs = async () => DATA.products.map((p) => ({ slug: p.slug }));
const infoPages = async () => INFO_KEYS.map((page) => ({ page }));

/** Every page is generated as static HTML at build time (no server needed on GitHub Pages). */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'fr', renderMode: RenderMode.Prerender },
  { path: 'p/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: slugs },
  { path: 'fr/p/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: slugs },
  { path: 'info/:page', renderMode: RenderMode.Prerender, getPrerenderParams: infoPages },
  { path: 'fr/info/:page', renderMode: RenderMode.Prerender, getPrerenderParams: infoPages },
  // Favorites are filled in the browser; the generated page is the empty shell.
  { path: 'favorites', renderMode: RenderMode.Prerender },
  { path: 'fr/favorites', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
