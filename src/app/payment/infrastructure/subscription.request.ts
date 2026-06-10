import { PlanType } from '../domain/model/subscription.entity';

export interface SubscriptionRequest {
  userId: string;
  planType: PlanType;
}
