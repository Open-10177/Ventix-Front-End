import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonitoringStore } from '../../../application/monitoring.store';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  protected store = inject(MonitoringStore);
  private router = inject(Router);

  ngOnInit() { this.store.loadNotifications(); }
  goBack()   { this.router.navigate(['/home']); }
}
