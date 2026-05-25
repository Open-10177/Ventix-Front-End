import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentStore } from '../../../application/payment.store';
import { Plan } from '../../../domain/model/subscription.entity';

@Component({
  selector: 'app-plan-selector',
  imports: [],
  templateUrl: './plan-selector.component.html',
  styleUrl: './plan-selector.component.css',
})
export class PlanSelectorComponent implements OnInit {
  protected store = inject(PaymentStore);
  private router = inject(Router);

  protected selectedPlan = signal<Plan | null>(null);

  ngOnInit(): void {
    this.store.loadPlans();
  }

  onSelectPlan(plan: Plan): void {
    this.selectedPlan.set(plan);
  }

  onCheckout(): void {
    const plan = this.selectedPlan();

    if (!plan) return;

    this.router.navigate(['/payment/checkout', plan.name]);
  }
}
