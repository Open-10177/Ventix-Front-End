import { BaseResponse } from '../../shared/infrastructure/base-response';

export interface RecoverPasswordResponse extends BaseResponse {
  message: string;
}
