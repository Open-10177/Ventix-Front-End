import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type UserRole = 'Hogar' | 'Institución educativa' | 'Organización';

export class User implements BaseEntity {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public role: UserRole,
    public avatarUrl: string = 'https://i.pravatar.cc/80',
    public token: string = '',
  ) {}
}
