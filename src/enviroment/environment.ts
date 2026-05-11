export const environment = {
  production: false, // Cambiar a false para desarrollo

  // Base API URL
  baseUrl: 'http://localhost:8080/api/v1',

  // IAM (Identity and Access Management)
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
