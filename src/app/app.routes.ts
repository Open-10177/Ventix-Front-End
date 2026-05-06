import { Routes } from '@angular/router';
import { HomeComponent } from './shared/presentation/views/home/home.component';

const about = () => import('./shared/presentation/views/about/about.component').then(m => m.AboutComponent);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);

const baseTitle = 'Ventix';
export const routes: Routes = [
  { path: 'home',  component:     HomeComponent, title: `Home - ${baseTitle}` },
  { path: 'about', loadComponent: about,         title: `About - ${baseTitle}` },
  { path: '',      redirectTo:    '/home',        pathMatch: 'full' },
  { path: '**',    loadComponent: pageNotFound,   title: `Page Not Found - ${baseTitle}` }
];
