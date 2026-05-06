import { Routes } from '@angular/router';

export const monitoringRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home.component').then(m => m.MonitoringHomeComponent)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./views/notifications/notifications.component').then(m => m.NotificationsComponent)
  }
];
