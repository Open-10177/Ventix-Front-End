import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  email = '';
  password = '';

  signIn(): void {
    this.http.get<any[]>(`${environment.baseUrl}/users?email=${this.email}`).subscribe({
      next: (users) => {
        const user = users[0];

        if (!user || user.password !== this.password) {
          alert('Correo o contraseña incorrectos');
          return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
        alert('Error al iniciar sesión');
      },
    });
  }
}
