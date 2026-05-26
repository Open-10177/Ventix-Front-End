import { Routes } from '@angular/router';

export const paymentRoutes: Routes = [
  {
    path: 'plans',
    loadComponent: () =>
      import('./views/plan-selector/plan-selector.component').then((m) => m.PlanSelectorComponent),
  },
  {
    path: 'checkout/:planType',
    loadComponent: () =>
      import('./views/checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: 'subscription',
    loadComponent: () =>
      import('./views/subscription-detail/subscription-detail.component').then(
        (m) => m.SubscriptionDetailComponent,
      ),
  },
  {
    path: 'invoices',
    loadComponent: () =>
      import('./views/invoice-list/invoice-list.component').then((m) => m.InvoiceListComponent),
  },
  {
    path: '',
    redirectTo: 'plans',
    pathMatch: 'full',
  },
];
