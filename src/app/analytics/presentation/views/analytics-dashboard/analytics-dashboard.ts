import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AnalyticsStore } from '../../../application/analytics.store';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule, MatIcon, MatListItem, MatBadgeModule],
  templateUrl: './analytics-dashboard.html',
  styleUrl: './analytics-dashboard.css',
})
export class AnalyticsDashboard {
  protected store = inject(AnalyticsStore);
  private router = inject(Router);
  showRangeMenu = false;
  selectedDate = '';
  selectedRangeLabel = 'Últimos 30 días';
  showCalendar = false;

  goBack() {
    this.router.navigate(['/home']);
  }

  goToNotifications() {
    this.router.navigate(['/monitoring/notifications']);
  }

  toggleRangeMenu(): void {
    this.showRangeMenu = !this.showRangeMenu;
  }

  selectRange(label: string): void {
    this.selectedRangeLabel = label;
    this.showRangeMenu = false;
  }

  openDatePicker(input: HTMLInputElement): void {
    input.showPicker();
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }
}
