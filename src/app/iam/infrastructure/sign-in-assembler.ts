import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { UserEntity } from '../domain/model/user.entity';
import { SignInResource, SignInResponse } from './sign-in-response';

export class SignInAssembler implements BaseAssembler<UserEntity, SignInResource, SignInResponse> {
  toEntityFromResource(resource: SignInResource): UserEntity {
    return new UserEntity({
      id: resource.id,
      name: resource.name,
      lastName: resource.lastName,
      phone: resource.phone,
      email: resource.email,
      password: '',
      role: resource.role,
      photoUrl: resource.photoUrl,
    });
  }

  toResourceFromEntity(entity: UserEntity): SignInResource {
    return {
      id: entity.id,
      name: entity.name,
      lastName: entity.lastName,
      phone: entity.phone,
      email: entity.email,
      role: entity.role,
      photoUrl: entity.photoUrl,
      token: '',
    } as SignInResource;
  }

  toEntitiesFromResponse(response: SignInResponse): UserEntity[] {
    return [this.toEntityFromResource(response.user)];
  }
}
