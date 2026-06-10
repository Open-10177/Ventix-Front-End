import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { UserEntity } from '../domain/model/user.entity';
import { SignUpAssembler } from './sign-up-assembler';
import { SignUpResource, SignUpResponse } from './sign-up-response';

export class SignUpApiEndpoint extends BaseApiEndpoint<
  UserEntity,
  SignUpResource,
  SignUpResponse,
  SignUpAssembler
> {
  constructor(http: HttpClient) {
    super(http, environment.baseUrl + environment.iamSignUpEndpointPath, new SignUpAssembler());
  }
}
