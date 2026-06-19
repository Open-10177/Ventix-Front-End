import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthStore } from '../../../application/auth.store';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDividerModule, RouterLink, TranslatePipe],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private auth   = inject(AuthStore);
  private router = inject(Router);

  email    = '';
  password = '';
  showPw   = signal(false);
  loading  = signal(false);
  error    = signal('');

  togglePw() { this.showPw.update(v => !v); }

  signIn() {
    if (!this.email || !this.password) return;
    this.loading.set(true);
    this.error.set('');
    this.auth.signIn({ email: this.email, password: this.password }).subscribe({
      next: () => { this.loading.set(false); this.router.navigate(['/home']); },
      error: () => { this.loading.set(false); this.error.set('Correo o contraseña incorrectos'); },
    });
  }

  goSignUp() { this.router.navigate(['/iam/sign-up']); }
}
