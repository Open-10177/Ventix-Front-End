export enum RefundStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
}

export class Refund {
  constructor(
    public refundId: string,
    public refundUuid: string,
    public reason: string,
    public amount: number,
    public currency: string,
    public status: RefundStatus,
    public stripeRefundId: string,
    public processedAt: Date | null,
  ) {}
}
