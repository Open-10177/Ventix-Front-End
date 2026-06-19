import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { User } from '../domain/model/user.entity';
import { SignUpRequest } from './sign-up.request';
import { SignUpResponse } from './sign-up-response';
import { SignUpAssembler } from './sign-up-assembler';
import { environment } from '../../../enviroment/environment';

export class SignUpApiEndpoint {
  private readonly url = `${environment.baseUrl}${environment.iamSignUpEndpointPath}`;
  private readonly assembler = new SignUpAssembler();

  constructor(private http: HttpClient) {}

  signUp(request: SignUpRequest): Observable<User> {
    return this.http.post<SignUpResponse>(this.url, request).pipe(
      map(res => this.assembler.toEntity(res)),
      catchError(err => throwError(() => new Error(`Sign-up failed: ${err.status}`))),
    );
  }
}
