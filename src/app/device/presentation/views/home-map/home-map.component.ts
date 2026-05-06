import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceManagementStore } from '../../../application/device-management.store';

@Component({
  selector: 'app-home-map',
  imports: [],
  templateUrl: './home-map.component.html',
  styleUrl: './home-map.component.css'
})
export class HomeMapComponent implements OnInit {
  protected store = inject(DeviceManagementStore);
  private router = inject(Router);

  ngOnInit() { this.store.loadDevices(); }

  goBack() { this.router.navigate(['/home']); }

  getBatteryColor(pct: number): string {
    if (pct >= 70) return '#4fc3a1';
    if (pct >= 40) return '#8fa8b8';
    return '#e57373';
  }
}
