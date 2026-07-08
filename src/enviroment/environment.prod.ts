export const environment = {
  production: true,

  baseUrl: 'https://ventix-backend-1.onrender.com/api/v1',

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
