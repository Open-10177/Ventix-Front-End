import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';
import { IamApi } from '../../../infrastructure/iam-api';
import { UserEntity } from '../../../domain/model/user.entity';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private iamApi = inject(IamApi);

  email = '';

  code = '';

  newPassword = '';

  confirmPassword = '';

  generatedCode = '123456';

  userId = 0;

  showCodeSentModal = false;

  showCodeStep = false;

  showResetPassword = false;

  sendEmail(): void {
    this.http.get<any[]>(`${environment.baseUrl}/users?email=${this.email}`).subscribe({
      next: (users) => {
        const user = users[0];

        if (!user) {
          alert('Correo no encontrado');

          return;
        }

        this.userId = user.id;

        this.showCodeSentModal = true;
      },

      error: (error) => {
        console.error(error);

        alert('Error al buscar el correo');
      },
    });
  }

  closeCodeModal(): void {
    this.showCodeSentModal = false;

    this.showCodeStep = true;
  }

  verifyCode(): void {
    if (this.code !== this.generatedCode) {
      alert('Código incorrecto');

      return;
    }

    this.showCodeStep = false;

    this.showResetPassword = true;
  }

  recoverPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');

      return;
    }

    const passwordRegex =   /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    if (!passwordRegex.test(this.newPassword)) {
      alert(
        'La contraseña debe tener:\n' +
          '- Una mayúscula\n' +
          '- Un número\n' +
          '- Un caracter especial'
      );

      return;
    }

    this.http
      .patch(`${environment.baseUrl}/users/${this.userId}`, {
        password: this.newPassword,
      })
      .subscribe({
        next: () => {
          alert('Contraseña actualizada correctamente');

          this.router.navigate(['/iam/sign-in']);
        },

        error: (error) => {
          console.error(error);

          alert('Error al actualizar contraseña');
        },
      });
  }
}
