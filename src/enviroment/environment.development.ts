export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080/api/v1',

  iamSignInEndpointPath: '/auth/sign-in',

  iamSignUpEndpointPath: '/auth/sign-up',
  iamRecoverPasswordEndpointPath: '/auth/recover-password',

  // Monitoring & Automation (En lugar de Laboratory/Batch)
  monitoringTelemetryEndpointPath: '/telemetry',
  monitoringAlertsEndpointPath: '/alerts',

  // Device & Asset Management (En lugar de Equipment)
  deviceManagementEndpointPath: '/devices',
  deviceInventoryEndpointPath: '/inventory',

  // Payment (Stripe)
  paymentSubscriptionEndpointPath: '/subscriptions',
  paymentInvoicesEndpointPath: '/invoices',

  // Analytics & Reporting
  analyticsReportsEndpointPath: '/reports',
  analyticsKpisEndpointPath: '/kpis',
};
