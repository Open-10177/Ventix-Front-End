import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { UserEntity } from '../domain/model/user.entity';
import { RecoverPasswordAssembler } from './recover-password-assembler';
import { RecoverPasswordResource, RecoverPasswordResponse } from './recover-password-response';

export class RecoverPasswordApiEndpoint extends BaseApiEndpoint<
  UserEntity,
  RecoverPasswordResource,
  RecoverPasswordResponse,
  RecoverPasswordAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      environment.baseUrl + environment.iamRecoverPasswordEndpointPath,
      new RecoverPasswordAssembler(),
    );
  }
}
