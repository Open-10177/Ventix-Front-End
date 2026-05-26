import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface SignInResource extends BaseResource {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  role?: string;
  photoUrl?: string;
  token: string;
}

export interface SignInResponse extends BaseResponse {
  user: SignInResource;
}
