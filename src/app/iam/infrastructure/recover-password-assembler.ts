import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { RecoverPasswordResource, RecoverPasswordResponse } from './recover-password-response';
import { UserEntity } from '../domain/model/user.entity';

export class RecoverPasswordAssembler implements BaseAssembler<
  UserEntity,
  RecoverPasswordResource,
  RecoverPasswordResponse
> {
  toEntityFromResource(resource: RecoverPasswordResource): UserEntity {
    return new UserEntity({
      id: resource.id,
      name: '',
      lastName: '',
      phone: '',
      email: resource.email,
      password: '',
      role: '',
      photoUrl: '',
    });
  }

  toResourceFromEntity(entity: UserEntity): RecoverPasswordResource {
    return {
      id: entity.id,
      email: entity.email,
      success: true,
      message: '',
    } as RecoverPasswordResource;
  }

  toEntitiesFromResponse(response: RecoverPasswordResponse): UserEntity[] {
    return [this.toEntityFromResource(response.recoverPassword)];
  }
}
