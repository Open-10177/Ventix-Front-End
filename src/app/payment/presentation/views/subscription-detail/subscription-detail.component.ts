import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentStore } from '../../../application/payment.store';
import { CancelSubscriptionCommand } from '../../../domain/model/cancel-subscription.command';
import { SubscriptionStatus } from '../../../domain/model/subscription.entity';

@Component({
  selector: 'app-subscription-detail',
  imports: [],
  templateUrl: './subscription-detail.component.html',
  styleUrl: './subscription-detail.component.css',
})
export class SubscriptionDetailComponent implements OnInit {
  protected store = inject(PaymentStore);
  private router = inject(Router);

  ngOnInit(): void {
    this.store.loadSubscription('current-user');
  }

  onCancel(): void {
    const subscription = this.store.subscription();

    if (!subscription) return;

    this.store.cancelSubscription(new CancelSubscriptionCommand(subscription.subId));
  }

  getPlanBadge(): string {
    const subscription = this.store.subscription();

    if (!subscription) return 'No plan';

    if (subscription.status === SubscriptionStatus.ACTIVE) {
      return `${subscription.planType} active`;
    }

    return `${subscription.planType} ${subscription.status.toLowerCase()}`;
  }

  goToInvoices(): void {
    this.router.navigate(['/payment/invoices']);
  }

  goToPlans(): void {
    this.router.navigate(['/payment/plans']);
  }
}
