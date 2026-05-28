import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { UserEntity } from '../domain/model/user.entity';
import { SignUpResource, SignUpResponse } from './sign-up-response';

export class SignUpAssembler implements BaseAssembler<UserEntity, SignUpResource, SignUpResponse> {
  toEntityFromResource(resource: SignUpResource): UserEntity {
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

  toResourceFromEntity(entity: UserEntity): SignUpResource {
    return {
      id: entity.id,
      name: entity.name,
      lastName: entity.lastName,
      phone: entity.phone,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      photoUrl: entity.photoUrl,
    } as SignUpResource;
  }

  toEntitiesFromResponse(response: SignUpResponse): UserEntity[] {
    return [this.toEntityFromResource(response.user)];
  }
}
