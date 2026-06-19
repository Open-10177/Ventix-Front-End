import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { IamApi } from '../../../infrastructure/iam-api';

@Component({
  selector: 'app-recover-password',
  imports: [FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, RouterLink, TranslatePipe],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css',
})
export class RecoverPasswordComponent {
  private api    = inject(IamApi);
  private router = inject(Router);

  email   = '';
  loading = signal(false);
  sent    = signal(false);

  send() {
    if (!this.email) return;
    this.loading.set(true);
    this.api.recoverPassword(this.email).subscribe({
      next:  () => { this.loading.set(false); this.sent.set(true); },
      error: () => { this.loading.set(false); this.sent.set(true); },
    });
  }

  goBack() { this.router.navigate(['/iam/sign-in']); }
}
