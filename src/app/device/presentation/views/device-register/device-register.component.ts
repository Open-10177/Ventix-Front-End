import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { DeviceManagementStore } from '../../../application/device-management.store';

@Component({
  selector: 'app-device-register',
  imports: [MatCardModule, MatButtonModule, MatIcon, TranslatePipe],
  templateUrl: './device-register.component.html',
  styleUrl: './device-register.component.css',
})
export class DeviceRegisterComponent {
  protected store = inject(DeviceManagementStore);
  private router = inject(Router);

  goBack() { this.router.navigate(['/home']); }
  goByCode() { this.router.navigate(['/device/register/by-code']); }
  goByQr() { this.router.navigate(['/device/register/by-qr']); }
}
