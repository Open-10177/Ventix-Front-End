import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { LayoutComponent } from './shared/presentation/components/layout/layout.component';

const about        = () => import('./shared/presentation/views/about/about.component').then(m => m.AboutComponent);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);
const monitoring   = () => import('./monitoring/presentation/monitoring-routes').then(m => m.monitoringRoutes);
const device       = () => import('./device/presentation/device-routes').then(m => m.deviceRoutes);
const analytics    = () => import('./analytics/presentation/analytics-routes').then(m => m.analyticsRoutes);
const settings     = () => import('./shared/presentation/views/settings/settings.component').then(m => m.SettingsComponent);
const iam          = () => import('./iam/presentation/iam.routes').then(m => m.iamRoutes);
const payment      = () => import('./payment/presentation/payment.routes').then(m => m.paymentRoutes);

const baseTitle = 'Ventix';
export const routes: Routes = [
  // ── Root redirect → ask user to sign in first ─────────────────────────────
  { path: '', redirectTo: '/iam/sign-in', pathMatch: 'full' },

  // ── Auth routes (no sidebar) ──────────────────────────────────────────────
  { path: 'iam', loadChildren: iam },

  // ── Authenticated routes (with sidebar) ───────────────────────────────────
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home',       component: Home,         title: `Home - ${baseTitle}`          },
      { path: 'monitoring', loadChildren: monitoring                                        },
      { path: 'device',     loadChildren: device                                            },
      { path: 'analytics',  loadChildren: analytics                                         },
      { path: 'settings',   loadComponent: settings, title: `Configuración - ${baseTitle}` },
      { path: 'about',      loadComponent: about,    title: `About - ${baseTitle}`          },
      { path: 'payment',    loadChildren: payment                                            },
    ],
  },

  { path: '**', loadComponent: pageNotFound, title: `404 - ${baseTitle}` },
];
