import { PlanType, SubscriptionStatus } from '../domain/model/subscription.entity';

export interface SubscriptionResponse {
  subId: string;
  subUuid: string;
  userUuid: string;
  planType: PlanType;
  status: SubscriptionStatus;
  renewsAt: string;
  cancelledAt: string | null;
  stripeSubscriptionId: string;
}
