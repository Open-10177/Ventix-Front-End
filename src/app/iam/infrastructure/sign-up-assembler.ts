import { User, UserRole } from '../domain/model/user.entity';
import { SignUpResponse } from './sign-up-response';

export class SignUpAssembler {
  toEntity(response: SignUpResponse): User {
    return new User(response.id, response.email, response.username, response.role as UserRole);
  }
}
