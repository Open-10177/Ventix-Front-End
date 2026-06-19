import { Routes } from '@angular/router';

const planSelector = () => import('./views/plan-selector/plan-selector.component').then(m => m.PlanSelectorComponent);
const checkout     = () => import('./views/checkout/checkout.component').then(m => m.CheckoutComponent);

export const paymentRoutes: Routes = [
  { path: 'plans',    loadComponent: planSelector },
  { path: 'checkout', loadComponent: checkout     },
  { path: '',         redirectTo: 'plans', pathMatch: 'full' },
];
