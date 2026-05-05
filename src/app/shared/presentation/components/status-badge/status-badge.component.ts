import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css'
})
export class StatusBadgeComponent {
  @Input() status: string = '';

  getBadgeClass(): string {
    const map: Record<string, string> = {
      ACTIVE:       'badge--success',
      GOOD:         'badge--success',
      CONFIRMED:    'badge--success',
      PAID:         'badge--success',
      GENERATED:    'badge--success',
      MODERATE:     'badge--warning',
      PENDING:      'badge--warning',
      PAST_DUE:     'badge--warning',
      CRITICAL:     'badge--danger',
      FAILED:       'badge--danger',
      CANCELLED:    'badge--danger',
      DECOMMISSIONED: 'badge--danger',
      INACTIVE:     'badge--neutral',
      REGISTERED:   'badge--neutral',
      LINKED:       'badge--info',
    };
    return map[this.status] ?? 'badge--neutral';
  }
}
