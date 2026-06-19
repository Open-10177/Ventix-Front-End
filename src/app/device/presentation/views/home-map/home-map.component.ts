import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DeviceManagementStore } from '../../../application/device-management.store';

@Component({
  selector: 'app-home-map',
  imports: [MatCardModule, MatListModule, MatButtonModule, MatIconModule, MatDividerModule, MatChipsModule, RouterLink, TranslatePipe],
  templateUrl: './home-map.component.html',
  styleUrl: './home-map.component.css',
})
export class HomeMapComponent implements OnInit {
  protected store = inject(DeviceManagementStore);
  private router = inject(Router);

  ngOnInit() { this.store.loadDevices(); }

  goBack()     { this.router.navigate(['/home']); }
  goRegister() { this.router.navigate(['/device/register']); }

  getBatteryColor(pct: number): string {
    if (pct >= 70) return '#4fc3a1';
    if (pct >= 40) return '#8fa8b8';
    return '#e57373';
  }
}
