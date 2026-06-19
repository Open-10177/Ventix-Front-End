import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnalyticsStore } from '../../../application/analytics.store';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-analytics-dashboard',
  imports: [MatButtonModule, MatCardModule, MatTableModule, MatIconModule, MatDividerModule,
            MatDatepickerModule, MatNativeDateModule, MatInputModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './analytics-dashboard.html',
  styleUrl: './analytics-dashboard.css',
})
export class AnalyticsDashboard {
  protected store = inject(AnalyticsStore);
  private router = inject(Router);

  readonly displayedColumns = ['date', 'zone', 'humidity', 'co2', 'temperature', 'action'];
  selectedDate: Date | null = null;

  get tableData() { return this.store.historyRecords(); }

  goBack() { this.router.navigate(['/home']); }
}
