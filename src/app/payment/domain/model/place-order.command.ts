import { PlanType } from './subscription.entity';

export class PlaceOrderCommand {
  constructor(
    public userId: string,
    public nodeUuid: string,
    public planType: PlanType,
  ) {}
}
