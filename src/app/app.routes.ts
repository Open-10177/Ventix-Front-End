import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const about        = () => import('./shared/presentation/views/about/about.component').then(m => m.AboutComponent);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);
const monitoring   = () => import('./monitoring/presentation/monitoring-routes').then(m => m.monitoringRoutes);
const device       = () => import('./device/presentation/device-routes').then(m => m.deviceRoutes);
const iam = () => import('./iam/presentation/iam.routes').then(m => m.iamRoutes);

const baseTitle = 'Ventix';
export const routes: Routes = [
  { path: 'iam',        loadChildren: iam},
  { path: 'home',       component:     Home, title: `Home - ${baseTitle}` },
  { path: 'monitoring', loadChildren:  monitoring },
  { path: 'device',     loadChildren:  device },
  { path: 'about',      loadComponent: about,                   title: `About - ${baseTitle}` },
  { path: '',           redirectTo:    '/home',                  pathMatch: 'full' },
  { path: '**',         loadComponent: pageNotFound,            title: `Page Not Found - ${baseTitle}` }
];
