import { Routes } from '@angular/router';

export const deviceRoutes: Routes = [
  {
    path: 'map',
    loadComponent: () => import('./views/home-map/home-map.component').then(m => m.HomeMapComponent)
  },
  {
    path: 'thresholds',
    loadComponent: () =>
      import('./views/threshold-config/threshold-config.component').then(m => m.ThresholdConfigComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./views/device-register/device-register.component').then(m => m.DeviceRegisterComponent)
  },
  {
    path: 'register/by-code',
    loadComponent: () =>
      import('./views/register-by-code/register-by-code.component').then(m => m.RegisterByCodeComponent)
  },
  {
    path: 'register/by-qr',
    loadComponent: () =>
      import('./views/register-by-qr/register-by-qr.component').then(m => m.RegisterByQrComponent)
  },
  {
    path: 'register/setup',
    loadComponent: () =>
      import('./views/device-setup/device-setup.component').then(m => m.DeviceSetupComponent)
  }
];
