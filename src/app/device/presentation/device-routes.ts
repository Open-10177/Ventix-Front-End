import { Routes } from '@angular/router';

export const deviceRoutes: Routes = [
  {
    path: 'map',
    loadComponent: () => import('./views/home-map/home-map.component').then(m => m.HomeMapComponent)
  },
  {
    path: 'thresholds',
    loadComponent: () => import('./views/threshold-config/threshold-config.component').then(m => m.ThresholdConfigComponent)
  }
];
