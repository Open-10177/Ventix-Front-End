import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { DeviceManagementStore } from '../../../application/device-management.store';

@Component({
  selector: 'app-register-by-qr',
  imports: [MatButtonModule, MatCardModule, MatIcon, TranslatePipe],
  templateUrl: './register-by-qr.component.html',
  styleUrl: './register-by-qr.component.css',
})
export class RegisterByQrComponent implements OnDestroy {
  protected store = inject(DeviceManagementStore);
  private router = inject(Router);

  goBack() { this.router.navigate(['/device/register']); }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.store.registerByQr();
    }
  }

  proceed() {
    this.store.resetRegister();
    this.router.navigate(['/device/register/setup']);
  }

  ngOnDestroy() {
    this.store.resetRegister();
  }
}
