import { Injectable, signal } from '@angular/core';
import { Plan, PlanType, Subscription } from '../domain/model/subscription.entity';
import { Order } from '../domain/model/order.entity';
import { Invoice } from '../domain/model/invoice.entity';
import { CreateSubscriptionCommand } from '../domain/model/create-subscription.command';
import { CancelSubscriptionCommand } from '../domain/model/cancel-subscription.command';
import { PlaceOrderCommand } from '../domain/model/place-order.command';
import { GetInvoicesQuery } from '../domain/model/get-invoices.query';
import { SubscriptionApiEndpoint } from '../infrastructure/subscription-api-endpoint';
import { SubscriptionAssembler } from '../infrastructure/subscription-assembler';
import { OrderApiEndpoint } from '../infrastructure/order-api-endpoint';
import { OrderAssembler } from '../infrastructure/order-assembler';
import { InvoiceApiEndpoint } from '../infrastructure/invoice-api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class PaymentStore {
  readonly plans = signal<Plan[]>([]);
  readonly subscription = signal<Subscription | null>(null);
  readonly orders = signal<Order[]>([]);
  readonly invoices = signal<Invoice[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(
    private subscriptionApi: SubscriptionApiEndpoint,
    private orderApi: OrderApiEndpoint,
    private invoiceApi: InvoiceApiEndpoint,
  ) {}

  loadPlans(): void {
    this.plans.set([
      new Plan('normal-plan', PlanType.NORMAL, 19.9, true, [
        'Monitoreo basico de calidad del aire',
        'Alertas esenciales',
        'Historial limitado',
      ]),
      new Plan('plus-plan', PlanType.PLUS, 39.9, true, [
        'Monitoreo avanzado en tiempo real',
        'Alertas inteligentes',
        'Historial completo',
        'Reportes mensuales',
      ]),
    ]);
  }

  loadSubscription(userId: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.subscriptionApi.getSubscription(userId).subscribe({
      next: (subscription) => {
        this.subscription.set(subscription);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la suscripcion.');
        this.isLoading.set(false);
      },
    });
  }

  createSubscription(command: CreateSubscriptionCommand): void {
    this.isLoading.set(true);
    this.error.set(null);

    const request = SubscriptionAssembler.toRequest(command);

    this.subscriptionApi.create(request).subscribe({
      next: (subscription) => {
        this.subscription.set(subscription);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudo crear la suscripcion.');
        this.isLoading.set(false);
      },
    });
  }

  cancelSubscription(command: CancelSubscriptionCommand): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.subscriptionApi.cancel(command.subscriptionId).subscribe({
      next: () => {
        const currentSubscription = this.subscription();

        if (currentSubscription) {
          currentSubscription.cancel();
          this.subscription.set(currentSubscription);
        }

        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cancelar la suscripcion.');
        this.isLoading.set(false);
      },
    });
  }

  placeOrder(command: PlaceOrderCommand): void {
    this.isLoading.set(true);
    this.error.set(null);

    const request = OrderAssembler.toRequest(command);

    this.orderApi.placeOrder(request).subscribe({
      next: (order) => {
        this.orders.update((orders) => [...orders, order]);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudo registrar la orden.');
        this.isLoading.set(false);
      },
    });
  }

  loadInvoices(query: GetInvoicesQuery): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.invoiceApi.getInvoices(query).subscribe({
      next: (invoices) => {
        this.invoices.set(invoices);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las facturas.');
        this.isLoading.set(false);
      },
    });
  }

  downloadInvoice(invoiceId: string): void {
    this.invoiceApi.download(invoiceId).subscribe({
      next: (file) => {
        const url = URL.createObjectURL(file);
        window.open(url, '_blank');
      },
      error: () => {
        this.error.set('No se pudo descargar la factura.');
      },
    });
  }
}
