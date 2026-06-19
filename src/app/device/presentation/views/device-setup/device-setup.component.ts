import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { DeviceManagementStore } from '../../../application/device-management.store';

@Component({
  selector: 'app-device-setup',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIcon, TranslatePipe],
  templateUrl: './device-setup.component.html',
  styleUrl: './device-setup.component.css',
})
export class DeviceSetupComponent {
  protected store = inject(DeviceManagementStore);
  private router = inject(Router);

  protected zoneName = '';
  protected selectedImage: string | null = null;
  protected suggestions = ['Cuarto', 'Baño', 'Sala', 'Cocina'];

  goBack() { this.router.navigate(['/device/register']); }

  selectSuggestion(name: string) {
    this.zoneName = name;
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (e) => { this.selectedImage = e.target?.result as string; };
      reader.readAsDataURL(input.files[0]);
    }
  }

  complete() {
    if (!this.zoneName.trim()) return;
    this.store.finalizeSetup(this.zoneName.trim()).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
