import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AnalyticsStore } from '../../../application/analytics.store';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-dashboard.html',
  styleUrl: './analytics-dashboard.css',
})
export class AnalyticsDashboard {
  protected store = inject(AnalyticsStore);
  private router = inject(Router);

  goBack() {
    this.router.navigate(['/home']);
  }
}
