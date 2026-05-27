import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { BaseResponse } from '../../shared/infrastructure/base-response';
import { Notification } from '../domain/model/notification.entity';
import { NotificationResource } from './notification-response';
import { NotificationAssembler } from './notification-assembler';
import { environment } from '../../../enviroment/enviroment';

export class NotificationApiEndpoint extends BaseApiEndpoint<
  Notification,
  NotificationResource,
  BaseResponse,
  NotificationAssembler
> {
  constructor(http: HttpClient) {
    super(http, environment.baseUrl + environment.monitoringAlertsEndpointPath, new NotificationAssembler());
  }
}


