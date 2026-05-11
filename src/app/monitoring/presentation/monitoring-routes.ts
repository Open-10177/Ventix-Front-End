import { Routes } from '@angular/router';

export const monitoringRoutes: Routes = [
  {
    path: 'notifications',
    loadComponent: () => import('./views/notifications/notifications.component').then(m => m.NotificationsComponent)
  }
];
