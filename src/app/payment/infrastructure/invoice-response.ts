import { InvoiceStatus } from '../domain/model/invoice.entity';

export interface InvoiceResponse {
  invoiceId: string;
  invoiceUuid: string;
  userUuid: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  dueAt: string;
  paidAt: string | null;
  stripeInvoiceId: string;
  downloadUrl: string;
}
