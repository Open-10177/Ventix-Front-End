import { Component } from '@angular/core';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  showCodeSentModal = false;

  showCodeStep = false;

  showResetPassword = false;

  sendEmail(): void {
    this.showCodeSentModal = true;
  }

  closeCodeModal(): void {
    this.showCodeSentModal = false;
    this.showCodeStep = true;
  }

  verifyCode(): void {
    this.showCodeStep = false;
    this.showResetPassword = true;
  }

  recoverPassword(): void {
    alert('Password successfully recovered');
  }
}
