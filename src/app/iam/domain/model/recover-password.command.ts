export interface RecoverPasswordCommand {
  email?: string;
  code?: string;
  newPassword?: string;
  confirmPassword?: string;
}
