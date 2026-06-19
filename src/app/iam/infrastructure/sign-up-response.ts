import { BaseResponse } from '../../shared/infrastructure/base-response';

export interface SignUpResponse extends BaseResponse {
  id: number;
  email: string;
  username: string;
  role: string;
}
