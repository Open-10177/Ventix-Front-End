import { UserRole } from './user.entity';

export interface AssignRoleCommand {
  userId: number;
  role: UserRole;
}
