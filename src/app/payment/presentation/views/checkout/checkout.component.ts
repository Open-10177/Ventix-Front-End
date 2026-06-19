import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubscriptionApi } from '../../../infrastructure/subscription-api';
import { AuthStore } from '../../../../iam/application/auth.store';
import { TranslatePipe } from '@ngx-translate/core';

type PaymentMethod = 'card' | 'yape' | 'paypal';

@Component({
  selector: 'app-checkout',
  imports: [
    FormsModule, MatCardModule, MatButtonModule, MatButtonToggleModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatDividerModule,
    MatProgressSpinnerModule, TranslatePipe,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private route  = inject(ActivatedRoute);
  private router = inject(Router);
  private subscriptionApi = inject(SubscriptionApi);
  private auth = inject(AuthStore);

  // Plan elegido (llega por query params)
  planId   = this.route.snapshot.queryParamMap.get('plan')   ?? '';
  planName = this.route.snapshot.queryParamMap.get('name')   ?? 'Plan';
  price    = this.route.snapshot.queryParamMap.get('price')  ?? '';
  period   = this.route.snapshot.queryParamMap.get('period') ?? '';

  // Estado del formulario
  method = signal<PaymentMethod>('card');

  cardName   = '';
  cardNumber = '';
  cardExpiry = '';
  cardCvv    = '';
  yapePhone  = '';

  status = signal<'idle' | 'processing' | 'done'>('idle');

  setMethod(m: PaymentMethod) { this.method.set(m); }

  get canPay(): boolean {
    if (this.method() === 'card') {
      return !!this.cardName && this.cardNumber.length >= 12 && !!this.cardExpiry && this.cardCvv.length >= 3;
    }
    if (this.method() === 'yape') {
      return this.yapePhone.length >= 9;
    }
    return true; // paypal redirige
  }

  pay() {
    if (!this.canPay) return;
    this.status.set('processing');
    const email = this.auth.currentUser()?.email ?? '';
    this.subscriptionApi.changePlan({
      email,
      planId: this.planId,
      planName: this.planName,
      price: this.price,
      period: this.period,
    }).subscribe({
      next:  () => this.status.set('done'),
      error: () => this.status.set('done'),
    });
  }

  finish() { this.router.navigate(['/settings']); }
  goBack() { this.router.navigate(['/payment/plans']); }
}
