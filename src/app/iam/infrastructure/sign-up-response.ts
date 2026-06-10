import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface SignUpResource extends BaseResource {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  role?: string;
  photoUrl?: string;
}

export interface SignUpResponse extends BaseResponse {
  user: SignUpResource;
}
