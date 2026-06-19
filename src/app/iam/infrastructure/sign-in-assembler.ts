import { User, UserRole } from '../domain/model/user.entity';
import { SignInResponse } from './sign-in-response';

export class SignInAssembler {
  toEntity(response: SignInResponse): User {
    return new User(
      response.id,
      response.email,
      response.username,
      response.role as UserRole,
      '',
      response.token,
    );
  }
}
