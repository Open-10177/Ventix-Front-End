import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { IamApi } from '../../../infrastructure/iam-api';
import { UserEntity } from '../../../domain/model/user.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  private translate = inject(TranslateService);
  private iamApi = inject(IamApi);
  private router = inject(Router);
  showLanguageModal = false;

  name = '';
  lastName = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor() {
    this.translate.setDefaultLang('en');

    this.translate.use('en');
  }

  openLanguageModal(): void {
    this.showLanguageModal = true;
  }

  closeLanguageModal(): void {
    this.showLanguageModal = false;
  }

  changeLanguage(language: string): void {
    this.translate.use(language);

    this.closeLanguageModal();
  }

  register(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user = new UserEntity({
      id: 0,
      name: this.name,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      password: this.password,
      role: 'user',
      photoUrl: '',
    });

    this.iamApi.signUp(user).subscribe({
      next: (response) => {
        console.log('User registered', response);
        alert('User registered successfully');
        this.router.navigate(['/iam/sign-in']);
      },
      error: (error) => {
        console.error(error);
        alert('Error registering user');
      },
    });
  }
}
