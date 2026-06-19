import { UserRole } from './user.entity';

export interface SignUpCommand {
  email: string;
  password: string;
  username: string;
  role: UserRole;
}
