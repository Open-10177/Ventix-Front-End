import { CreateSubscriptionCommand } from '../domain/model/create-subscription.command';
import { Subscription } from '../domain/model/subscription.entity';
import { SubscriptionRequest } from './subscription.request';
import { SubscriptionResponse } from './subscription-response';

export class SubscriptionAssembler {
  static toDomain(response: SubscriptionResponse): Subscription {
    return new Subscription(
      response.subId,
      response.subUuid,
      response.userUuid,
      response.planType,
      response.status,
      new Date(response.renewsAt),
      response.cancelledAt ? new Date(response.cancelledAt) : null,
      response.stripeSubscriptionId,
    );
  }

  static toRequest(command: CreateSubscriptionCommand): SubscriptionRequest {
    return {
      userId: command.userId,
      planType: command.planType,
    };
  }
}
