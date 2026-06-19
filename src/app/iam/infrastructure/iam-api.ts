import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { User } from '../domain/model/user.entity';
import { SignInApiEndpoint } from './sign-in-api-endpoint';
import { SignUpApiEndpoint } from './sign-up-api-endpoint';
import { RecoverPasswordApiEndpoint } from './recover-password-api-endpoint';
import { SignInRequest } from './sign-in.request';
import { SignUpRequest } from './sign-up.request';

@Injectable({ providedIn: 'root' })
export class IamApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly signInEndpoint = new SignInApiEndpoint(this.http);
  private readonly signUpEndpoint  = new SignUpApiEndpoint(this.http);
  private readonly recoverEndpoint = new RecoverPasswordApiEndpoint(this.http);

  signIn(request: SignInRequest): Observable<User> {
    return this.signInEndpoint.signIn(request);
  }

  signUp(request: SignUpRequest): Observable<User> {
    return this.signUpEndpoint.signUp(request);
  }

  recoverPassword(email: string): Observable<string> {
    return this.recoverEndpoint.recover({ email });
  }
}
