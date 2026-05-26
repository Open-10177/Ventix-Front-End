import { Component, inject, OnInit } from '@angular/core';
import { PaymentStore } from '../../../application/payment.store';
import { GetInvoicesQuery } from '../../../domain/model/get-invoices.query';

@Component({
  selector: 'app-invoice-list',
  imports: [],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css',
})
export class InvoiceListComponent implements OnInit {
  protected store = inject(PaymentStore);

  ngOnInit(): void {
    this.store.loadInvoices(new GetInvoicesQuery('current-customer'));
  }

  onDownloadInvoice(id: string): void {
    this.store.downloadInvoice(id);
  }
}
