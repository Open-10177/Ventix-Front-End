import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaymentApi } from './payment-api';
import { GetInvoicesQuery } from '../domain/model/get-invoices.query';
import { Invoice } from '../domain/model/invoice.entity';
import { InvoiceAssembler } from './invoice-assembler';
import { InvoiceResponse } from './invoice-response';

@Injectable({
  providedIn: 'root',
})
export class InvoiceApiEndpoint extends PaymentApi {
  private http = inject(HttpClient);

  getInvoices(query: GetInvoicesQuery): Observable<Invoice[]> {
    return this.http
      .get<InvoiceResponse[]>(`${this.baseUrl}/customers/${query.customerId}/invoices`)
      .pipe(map((responses) => responses.map(InvoiceAssembler.toDomain)));
  }

  download(invoiceId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/invoices/${invoiceId}/download`, {
      responseType: 'blob',
    });
  }
}
