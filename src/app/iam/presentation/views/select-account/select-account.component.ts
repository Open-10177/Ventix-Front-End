import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthStore } from '../../../application/auth.store';
import { User, UserRole } from '../../../domain/model/user.entity';

@Component({
  selector: 'app-select-account',
  imports: [MatCardModule, MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './select-account.component.html',
  styleUrl: './select-account.component.css',
})
export class SelectAccountComponent {
  private router = inject(Router);
  private auth = inject(AuthStore);

  readonly accounts = [
    {
      id: 1,
      username: 'Martina López',
      role: 'Hogar',
      icon: 'home',
      avatarUrl: 'https://i.pravatar.cc/120?img=47',
      desc: 'Casa Principal — Lima',
    },
    {
      id: 2,
      username: 'IEP San Marcos',
      role: 'Institución educativa',
      icon: 'school',
      avatarUrl: 'https://i.pravatar.cc/120?img=12',
      desc: 'Institución — Miraflores',
    },
    {
      id: 3,
      username: 'Ventix Corp',
      role: 'Organización',
      icon: 'business',
      avatarUrl: 'https://i.pravatar.cc/120?img=33',
      desc: 'Organización — San Isidro',
    },
  ];

  select(account: typeof this.accounts[0]) {
    const email = account.username.toLowerCase().replace(/\s+/g, '.') + '@ventix.com';
    const user = new User(account.id, email, account.username, account.role as UserRole, account.avatarUrl, '');
    this.auth.setCurrentUser(user);
    this.router.navigate(['/home']);
  }

  goBack() { this.router.navigate(['/settings']); }

  addAccount() { this.router.navigate(['/iam/sign-in']); }
}
