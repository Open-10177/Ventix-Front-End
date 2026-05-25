import { Invoice } from '../domain/model/invoice.entity';
import { InvoiceResponse } from './invoice-response';

export class InvoiceAssembler {
  static toDomain(response: InvoiceResponse): Invoice {
    return new Invoice(
      response.invoiceId,
      response.invoiceUuid,
      response.userUuid,
      response.amount,
      response.currency,
      response.status,
      new Date(response.dueAt),
      response.paidAt ? new Date(response.paidAt) : null,
      response.stripeInvoiceId,
      response.downloadUrl,
    );
  }
}
