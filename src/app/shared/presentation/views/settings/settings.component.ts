import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthStore } from '../../../../iam/application/auth.store';
import { LanguageService } from '../../../application/language.service';
import { SubscriptionApi } from '../../../../payment/infrastructure/subscription-api';

const PLAN_FEATURES: Record<string, string[]> = {
  estandar: ['Hasta 5 sensores IoT', 'Monitoreo en tiempo real', 'Alertas y notificaciones', 'Historial de 30 días'],
  exclusivo: ['Advanced Analytics', 'Multi-device Sync', '24/7 Priority Support', 'Energy Optimization'],
};

@Component({
  selector: 'app-settings',
  imports: [FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIcon, MatDivider, MatTooltipModule, RouterLink, TranslatePipe],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  private router = inject(Router);
  private auth   = inject(AuthStore);
  private language = inject(LanguageService);
  private subscriptionApi = inject(SubscriptionApi);

  protected email = this.auth.currentUser()?.email ?? '';
  protected password = '';
  protected username = this.auth.currentUser()?.username ?? 'Usuario';
  protected avatarUrl = this.auth.currentUser()?.avatarUrl || 'https://i.pravatar.cc/120?img=47';

  protected emailEditing    = signal(false);
  protected passwordEditing = signal(false);
  protected usernameEditing = signal(false);

  protected planName = signal('—');
  protected planId = signal('exclusivo');
  protected planFeatures = computed(() => PLAN_FEATURES[this.planId()] ?? PLAN_FEATURES['exclusivo']);

  protected selectedLanguage = this.language.current();
  protected readonly languages = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'Inglés' },
  ];

  ngOnInit(): void {
    const email = this.auth.currentUser()?.email ?? '';
    this.subscriptionApi.getCurrentPlan(email).subscribe({
      next: (plan) => { this.planName.set(plan.planName); this.planId.set(plan.planId); },
      error: () => { this.planName.set('Exclusivo'); this.planId.set('exclusivo'); },
    });
  }

  goBack() { this.router.navigate(['/home']); }

  toggleEmail()    { this.emailEditing.update(v => !v); }
  togglePassword() { this.passwordEditing.update(v => !v); }
  toggleUsername() { this.usernameEditing.update(v => !v); }

  saveProfile() {
    this.emailEditing.set(false);
    this.passwordEditing.set(false);
    this.usernameEditing.set(false);
  }

  saveLanguage()   { this.language.use(this.selectedLanguage); }
  changePlan()     { this.router.navigate(['/payment/plans']); }
  changeAccount()  { this.router.navigate(['/iam/select-account']); }
  logout()         { this.auth.logout(); this.router.navigate(['/iam/sign-in']); }
}
