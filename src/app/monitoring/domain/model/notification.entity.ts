export type NotificationSeverity = 'critical' | 'warning' | 'info';

export interface Notification {
  id: number;
  title: string;
  description: string;
  action: string;
  severity: NotificationSeverity;
  time: string;
  icon: string;
}
