export const environment = {
  production: false,

  baseUrl: 'http://localhost:3000',

  iamSignInEndpointPath: '/users',
  iamSignUpEndpointPath: '/users',
  iamRecoverPasswordEndpointPath: '/users',

  monitoringTelemetryEndpointPath: '/telemetry',
  monitoringAlertsEndpointPath: '/alerts',

  deviceManagementEndpointPath: '/devices',
  thresholdConfigEndpointPath: '/threshold-configs',

  paymentSubscriptionEndpointPath: '/subscriptions',
  paymentInvoicesEndpointPath: '/invoices',

  analyticsReportsEndpointPath: '/reports',
  analyticsKpisEndpointPath: '/kpis',
};
