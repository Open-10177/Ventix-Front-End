import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { DeviceManagementStore } from '../../../application/device-management.store';

@Component({
  selector: 'app-register-by-code',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatCardModule, MatIcon, TranslatePipe],
  templateUrl: './register-by-code.component.html',
  styleUrl: './register-by-code.component.css',
})
export class RegisterByCodeComponent implements OnDestroy {
  protected store = inject(DeviceManagementStore);
  private router = inject(Router);

  protected codeValue = '';

  goBack() { this.router.navigate(['/device/register']); }

  submit() {
    if (!this.codeValue.trim()) return;
    this.store.registerByCode(this.codeValue.trim());
  }

  proceed() {
    this.store.resetRegister();
    this.router.navigate(['/device/register/setup']);
  }

  ngOnDestroy() {
    this.store.resetRegister();
  }
}
