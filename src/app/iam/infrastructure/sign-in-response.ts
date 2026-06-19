import { BaseResponse } from '../../shared/infrastructure/base-response';

export interface SignInResponse extends BaseResponse {
  id: number;
  email: string;
  username: string;
  role: string;
  token: string;
}
