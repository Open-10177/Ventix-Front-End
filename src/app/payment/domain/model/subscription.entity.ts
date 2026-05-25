export enum PlanType {
  NORMAL = 'NORMAL',
  PLUS = 'PLUS',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  PAST_DUE = 'PAST_DUE',
}

export class Plan {
  constructor(
    public planId: string,
    public name: PlanType,
    public price: number,
    public isRecurring: boolean,
    public features: string[],
  ) {}
}

export class Subscription {
  constructor(
    public subId: string,
    public subUuid: string,
    public userUuid: string,
    public planType: PlanType,
    public status: SubscriptionStatus,
    public renewsAt: Date,
    public cancelledAt: Date | null,
    public stripeSubscriptionId: string,
  ) {}

  isActive(): boolean {
    return this.status === SubscriptionStatus.ACTIVE;
  }

  cancel(): void {
    this.status = SubscriptionStatus.CANCELLED;
    this.cancelledAt = new Date();
  }
}
