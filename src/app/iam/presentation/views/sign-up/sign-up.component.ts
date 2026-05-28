import { Component, inject, input } from '@angular/core';
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
  photoUrl = '';

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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.photoUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  register(): void {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    if (!passwordRegex.test(this.password)) {
      alert(
        'La contraseña debe tener:\n' +
          '- Una mayúscula\n' +
          '- Un número\n' +
          '- Un carácter especial',
      );
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
      photoUrl: this.photoUrl,
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
