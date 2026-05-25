import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentStore } from '../../../application/payment.store';
import { PlaceOrderCommand } from '../../../domain/model/place-order.command';
import { Plan, PlanType } from '../../../domain/model/subscription.entity';
import { CreateSubscriptionCommand } from '../../../domain/model/create-subscription.command';


@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  protected store = inject(PaymentStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected plan = signal<Plan | null>(null);
  protected isProcessing = signal(false);

  ngOnInit(): void {
    this.store.loadPlans();

    const planType = this.route.snapshot.paramMap.get('planType') as PlanType;
    const selectedPlan = this.store.plans().find((plan) => plan.name === planType) ?? null;

    this.plan.set(selectedPlan);
    this.initStripeElements();
  }

  initStripeElements(): void {
    // Stripe Elements will be initialized here when the Stripe public key is available.
  }

  onConfirmPayment(): void {
    const selectedPlan = this.plan();

    if (!selectedPlan) return;

    this.isProcessing.set(true);

    this.store.createSubscription(new CreateSubscriptionCommand('current-user', selectedPlan.name));

    this.onSuccess();
  }

  onSuccess(): void {
    this.isProcessing.set(false);
    this.router.navigate(['/payment/subscription']);
  }

}

