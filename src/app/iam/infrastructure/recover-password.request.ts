export interface RecoverPasswordRequest {
  email?: string;
  code?: string;
  newPassword?: string;
}
