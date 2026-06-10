import { Subscription } from './subscription.entity';

export class Customer {
  constructor(
    public customerId: string,
    public customerUuid: string,
    public userUuid: string,
    public institutionId: string,
    public stripeCustomerId: string,
    public subscriptions: Subscription[] = [],
  ) {}

  hasActiveSubscription(): boolean {
    return this.subscriptions.some((subscription) => subscription.isActive());
  }
}
