import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { BaseResponse } from '../../shared/infrastructure/base-response';
import { Notification } from '../domain/model/notification.entity';
import { NotificationResource } from './notification-response';

export class NotificationAssembler implements BaseAssembler<Notification, NotificationResource, BaseResponse> {
  toEntityFromResource(resource: NotificationResource): Notification {
    return {
      id: resource.id,
      title: resource.title,
      description: resource.description,
      action: resource.action,
      severity: resource.severity,
      time: resource.time,
      icon: resource.icon
    };
  }

  toResourceFromEntity(entity: Notification): NotificationResource {
    return { ...entity };
  }

  toEntitiesFromResponse(response: BaseResponse): Notification[] {
    return [];
  }
}
