import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../shared/infrastructure/base-api';
import { UserEntity } from '../domain/model/user.entity';

import { SignInApiEndpoint } from './sign-in-api-endpoint';
import { SignUpApiEndpoint } from './sign-up-api-endpoint';
import { RecoverPasswordApiEndpoint } from './recover-password-api-endpoint';

@Injectable({ providedIn: 'root' })
export class IamApi extends BaseApi {
  private readonly signInEndpoint: SignInApiEndpoint;
  private readonly signUpEndpoint: SignUpApiEndpoint;
  private readonly recoverPasswordEndpoint: RecoverPasswordApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.signInEndpoint = new SignInApiEndpoint(http);
    this.signUpEndpoint = new SignUpApiEndpoint(http);
    this.recoverPasswordEndpoint = new RecoverPasswordApiEndpoint(http);
  }

  signIn(user: UserEntity): Observable<UserEntity> {
    return this.signInEndpoint.create(user);
  }

  signUp(user: UserEntity): Observable<UserEntity> {
    return this.signUpEndpoint.create(user);
  }

  recoverPassword(user: UserEntity): Observable<UserEntity> {
    return this.recoverPasswordEndpoint.create(user);
  }
}
