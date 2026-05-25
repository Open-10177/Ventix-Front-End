import { OrderStatus } from '../domain/model/order.entity';
import { PlanType } from '../domain/model/subscription.entity';

export interface OrderResponse {
  orderId: string;
  orderUuid: string;
  userUuid: string;
  nodeUuid: string;
  planType: PlanType;
  status: OrderStatus;
  amount: number;
  currency: string;
  stripePaymentIntentId: string;
}
