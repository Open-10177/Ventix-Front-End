import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  email = '';
  code = '';
  newPassword = '';
  confirmPassword = '';

  generatedCode = '123456';
  userId = 0;

  showCodeSentModal = false;
  showCodeStep = false;
  showResetPassword = false;

  goBack(): void {
    if (this.showResetPassword) {
      this.showResetPassword = false;
      this.showCodeStep = true;
      return;
    }

    if (this.showCodeStep) {
      this.showCodeStep = false;
      return;
    }

    this.router.navigate(['/iam/sign-in']);
  }

  sendEmail(): void {
    if (!this.email.trim()) {
      alert('Ingresa tu correo');
      return;
    }

    this.http.get<any[]>(`${environment.baseUrl}/users?email=${this.email}`).subscribe({
      next: (users) => {
        const user = users[0];

        if (!user) {
          alert('Correo no encontrado');
          return;
        }

        this.userId = user.id;
        this.showCodeSentModal = true;

        /*
          Como estás usando JSON Server, no se envía un correo real.
          Para pruebas, el código será: 123456
        */
        console.log('Código de recuperación:', this.generatedCode);
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
    if (!this.code.trim()) {
      alert('Ingresa el código');
      return;
    }

    if (this.code !== this.generatedCode) {
      alert('Código incorrecto');
      return;
    }

    this.showCodeStep = false;
    this.showResetPassword = true;
  }

  recoverPassword(): void {
    if (!this.newPassword || !this.confirmPassword) {
      alert('Completa ambos campos de contraseña');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    if (!passwordRegex.test(this.newPassword)) {
      alert(
        'La contraseña debe tener:\n' +
          '- Una mayúscula\n' +
          '- Un número\n' +
          '- Un caracter especial\n' +
          '- Mínimo 6 caracteres',
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
