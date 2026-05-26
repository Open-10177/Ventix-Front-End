export const environment = {
  production: false,

  baseUrl: 'http://localhost:3000',

  iamSignInEndpointPath: '/auth/sign-in',
  iamSignUpEndpointPath: '/auth/sign-up',
  iamRecoverPasswordEndpointPath: '/auth/recover-password',

  monitoringTelemetryEndpointPath: '/telemetry',
  monitoringAlertsEndpointPath: '/alerts',

  deviceManagementEndpointPath: '/devices',
  thresholdConfigEndpointPath: '/threshold-configs',

  paymentSubscriptionEndpointPath: '/subscriptions',
  paymentInvoicesEndpointPath: '/invoices',

  analyticsReportsEndpointPath: '/reports',
  analyticsKpisEndpointPath: '/kpis',
};
