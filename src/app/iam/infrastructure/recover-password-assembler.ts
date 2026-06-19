import { RecoverPasswordResponse } from './recover-password-response';

export class RecoverPasswordAssembler {
  toMessage(response: RecoverPasswordResponse): string {
    return response.message ?? 'Correo de recuperación enviado.';
  }
}
