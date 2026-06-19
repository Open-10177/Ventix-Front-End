export const environment = {
  production: false,

  baseUrl: 'http://localhost:8080/api/v1',

  iamSignInEndpointPath: '/auth/sign-in',
  iamSignUpEndpointPath: '/auth/sign-up',
  iamRecoverPasswordEndpointPath: '/auth/recover-password',

  monitoringTelemetryEndpointPath: '/telemetry',
  monitoringAlertsEndpointPath: '/alerts',

  deviceManagementEndpointPath: '/devices',
  thresholdConfigEndpointPath: '/threshold-configs',

  paymentSubscriptionEndpointPath: '/subscriptions',
  paymentInvoicesEndpointPath: '/invoices',
  paymentCurrentPlanEndpointPath: '/current-plan',

  analyticsReportsEndpointPath: '/reports',
  analyticsKpisEndpointPath: '/kpis',
};
