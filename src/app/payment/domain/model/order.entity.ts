import { PlanType } from './subscription.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export class Order {
  constructor(
    public orderId: string,
    public orderUuid: string,
    public userUuid: string,
    public nodeUuid: string,
    public planType: PlanType,
    public status: OrderStatus,
    public amount: number,
    public currency: string,
    public stripePaymentIntentId: string,
  ) {}

  confirm(): void {
    this.status = OrderStatus.CONFIRMED;
  }

  refund(): void {
    this.status = OrderStatus.REFUNDED;
  }
}
