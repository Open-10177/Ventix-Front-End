import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Notification } from '../domain/model/notification.entity';
import { NotificationResource, NotificationResponse } from './notification-response';

export class NotificationAssembler implements BaseAssembler<Notification, NotificationResource, NotificationResponse> {

  toEntityFromResource(resource: NotificationResource): Notification {
    return new Notification({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      action: resource.action,
      severity: resource.severity,
      time: resource.time,
      icon: resource.icon
    });
  }

  toResourceFromEntity(entity: Notification): NotificationResource {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      action: entity.action,
      severity: entity.severity,
      time: entity.time,
      icon: entity.icon
    } as NotificationResource;
  }

  toEntitiesFromResponse(response: NotificationResponse): Notification[] {
    return response.notifications.map(resource => this.toEntityFromResource(resource as NotificationResource));
  }
}
