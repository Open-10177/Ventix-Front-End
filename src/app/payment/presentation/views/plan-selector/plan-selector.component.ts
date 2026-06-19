import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SubscriptionApi } from '../../../infrastructure/subscription-api';
import { AuthStore } from '../../../../iam/application/auth.store';
import { TranslatePipe } from '@ngx-translate/core';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  icon: string;
  color: string;
  features: string[];
  current: boolean;
}

@Component({
  selector: 'app-plan-selector',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, TranslatePipe],
  templateUrl: './plan-selector.component.html',
  styleUrl: './plan-selector.component.css',
})
export class PlanSelectorComponent implements OnInit {
  private router = inject(Router);
  private subscriptionApi = inject(SubscriptionApi);
  private auth = inject(AuthStore);

  plans: Plan[] = [
    {
      id: 'estandar',
      name: 'Estándar',
      price: 'S/ 29',
      period: '/mes',
      icon: 'sensors',
      color: '#3ab5c6',
      features: [
        'Hasta 5 sensores IoT',
        'Monitoreo en tiempo real',
        'Alertas y notificaciones push',
        'Historial de 30 días',
        'Reportes mensuales',
        'Soporte por chat',
      ],
      current: false,
    },
    {
      id: 'exclusivo',
      name: 'Exclusivo',
      price: 'S/ 69',
      period: '/mes',
      icon: 'workspace_premium',
      color: '#1a3a5c',
      features: [
        'Sensores IoT ilimitados',
        'Advanced Analytics',
        'Multi-device Sync',
        'Historial completo',
        'Reportes personalizados',
        '24/7 Priority Support',
        'Energy Optimization',
      ],
      current: false,
    },
  ];

  ngOnInit(): void {
    const email = this.auth.currentUser()?.email ?? '';
    this.subscriptionApi.getCurrentPlan(email).subscribe({
      next: (plan) => this.markCurrent(plan.planId),
      error: () => this.markCurrent('exclusivo'),
    });
  }

  private markCurrent(planId: string): void {
    this.plans = this.plans.map((p) => ({ ...p, current: p.id === planId }));
  }

  select(plan: Plan) {
    if (!plan.current) {
      this.router.navigate(['/payment/checkout'], {
        queryParams: { plan: plan.id, name: plan.name, price: plan.price, period: plan.period },
      });
    }
  }

  goBack() { this.router.navigate(['/settings']); }
}
