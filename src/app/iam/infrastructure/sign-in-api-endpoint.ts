import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { UserEntity } from '../domain/model/user.entity';
import { SignInAssembler } from './sign-in-assembler';
import { SignInResource, SignInResponse } from './sign-in-response';

export class SignInApiEndpoint extends BaseApiEndpoint<
  UserEntity,
  SignInResource,
  SignInResponse,
  SignInAssembler
> {
  constructor(http: HttpClient) {
    super(http, environment.baseUrl + environment.iamSignInEndpointPath, new SignInAssembler());
  }
}
