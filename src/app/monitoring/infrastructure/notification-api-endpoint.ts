import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { NotificationAssembler } from './notification-assembler';
import { environment } from '../../../environment/environment';
import { Notification } from '../domain/model/notification.entity';
import { NotificationResource, NotificationResponse } from './notification-response';
import { SignInAssembler } from '../../iam/infrastructure/sign-in-assembler';

/**
 * Infrastructure endpoint client for notification integration.
 */
export class NotificationApiEndpoint extends BaseApiEndpoint<
  Notification,
  NotificationResource,
  NotificationResponse,
  NotificationAssembler
> {
  /**
   * Creates a notification endpoint adapter.
   * @param http - Angular HTTP client used to call the remote API.
   */
  constructor(http: HttpClient) {
    super(http, environment.baseUrl + environment.monitoringAlertsEndpointPath, new NotificationAssembler());

  }
}
