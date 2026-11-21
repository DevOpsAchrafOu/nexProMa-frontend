import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page';
import { ProductPage } from './pages/product-page';

/** English at the root (default), French under /fr. */
export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: 'p/:slug', component: ProductPage },
  { path: 'fr', component: HomePage, pathMatch: 'full' },
  { path: 'fr/p/:slug', component: ProductPage },
  { path: '**', redirectTo: '' },
];
