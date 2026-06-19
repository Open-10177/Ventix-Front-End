import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthStore } from '../../../application/auth.store';
import { UserRole } from '../../../domain/model/user.entity';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule,
            MatInputModule, MatIconModule, MatSelectModule, MatDividerModule, RouterLink, TranslatePipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private auth   = inject(AuthStore);
  private router = inject(Router);

  username = '';
  email    = '';
  password = '';
  role: UserRole | '' = '';
  showPw   = signal(false);
  loading  = signal(false);
  error    = signal('');

  readonly roles: { value: UserRole; labelKey: string; icon: string }[] = [
    { value: 'Hogar',                  labelKey: 'auth.roleHome',   icon: 'home'     },
    { value: 'Institución educativa',  labelKey: 'auth.roleSchool', icon: 'school'   },
    { value: 'Organización',           labelKey: 'auth.roleOrg',    icon: 'business' },
  ];

  togglePw() { this.showPw.update(v => !v); }

  register() {
    if (!this.username || !this.email || !this.password || !this.role) return;
    this.loading.set(true);
    this.error.set('');
    this.auth.signUp({ email: this.email, password: this.password, username: this.username, role: this.role as UserRole }).subscribe({
      next:  () => { this.loading.set(false); this.router.navigate(['/home']); },
      error: () => { this.loading.set(false); this.error.set('No se pudo registrar (correo o usuario ya existe)'); },
    });
  }

  goBack() { this.router.navigate(['/iam/sign-in']); }
}
