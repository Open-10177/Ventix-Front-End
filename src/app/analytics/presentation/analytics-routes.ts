import { Routes } from '@angular/router';

export const analyticsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'history',
    pathMatch: 'full',
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./views/analytics-dashboard/analytics-dashboard').then((m) => m.AnalyticsDashboard),
  },
];
