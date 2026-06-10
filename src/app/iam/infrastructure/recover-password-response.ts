import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface RecoverPasswordResource extends BaseResource {
  id: number;
  email: string;
  code?: string;
  success: boolean;
  message: string;
}

export interface RecoverPasswordResponse extends BaseResponse {
  recoverPassword: RecoverPasswordResource;
}
