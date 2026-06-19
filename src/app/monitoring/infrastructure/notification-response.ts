import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface NotificationResource extends BaseResource {
  title: string;
  description: string;
  action: string;
  severity: 'critical' | 'warning' | 'info';
  time: string;
  icon: string;
}

export interface NotificationResponse extends BaseResponse {
  notifications: NotificationResource[];
}
