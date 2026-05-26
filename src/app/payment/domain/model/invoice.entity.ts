export enum InvoiceStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export class Invoice {
  constructor(
    public invoiceId: string,
    public invoiceUuid: string,
    public userUuid: string,
    public amount: number,
    public currency: string,
    public status: InvoiceStatus,
    public dueAt: Date,
    public paidAt: Date | null,
    public stripeInvoiceId: string,
    public downloadUrl: string,
  ) {}
}
