import { PlanType } from './subscription.entity';

export class CreateSubscriptionCommand {
  constructor(
    public userId: string,
    public planType: PlanType,
  ) {}
}
