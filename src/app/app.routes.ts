import { Routes } from '@angular/router';
import { MonitoringHomeComponent } from './monitoring/presentation/views/home/home.component';

const about        = () => import('./shared/presentation/views/about/about.component').then(m => m.AboutComponent);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);
const monitoring   = () => import('./monitoring/presentation/monitoring-routes').then(m => m.monitoringRoutes);
const device       = () => import('./device/presentation/device-routes').then(m => m.deviceRoutes);

const baseTitle = 'Ventix';
export const routes: Routes = [
  { path: 'home',       component:     MonitoringHomeComponent, title: `Home - ${baseTitle}` },
  { path: 'monitoring', loadChildren:  monitoring },
  { path: 'device',     loadChildren:  device },
  { path: 'about',      loadComponent: about,                   title: `About - ${baseTitle}` },
  { path: '',           redirectTo:    '/home',                  pathMatch: 'full' },
  { path: '**',         loadComponent: pageNotFound,            title: `Page Not Found - ${baseTitle}` }
];
