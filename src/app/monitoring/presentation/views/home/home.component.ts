import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonitoringStore } from '../../../application/monitoring.store';

@Component({
  selector: 'app-monitoring-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class MonitoringHomeComponent implements OnInit {
  protected store = inject(MonitoringStore);
  private router = inject(Router);

  ngOnInit() {
    this.store.loadCurrentReading();
  }

  goToNotifications() { this.router.navigate(['/monitoring/notifications']); }
  goToMap()           { this.router.navigate(['/device/map']); }
  goToHistory()       { this.router.navigate(['/analytics/history']); }
  goToThresholds()    { this.router.navigate(['/device/thresholds']); }
}
