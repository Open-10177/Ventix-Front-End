import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { User } from '../domain/model/user.entity';
import { SignInRequest } from './sign-in.request';
import { SignInResponse } from './sign-in-response';
import { SignInAssembler } from './sign-in-assembler';
import { environment } from '../../../enviroment/environment';

export class SignInApiEndpoint {
  private readonly url = `${environment.baseUrl}${environment.iamSignInEndpointPath}`;
  private readonly assembler = new SignInAssembler();

  constructor(private http: HttpClient) {}

  signIn(request: SignInRequest): Observable<User> {
    return this.http.post<SignInResponse>(this.url, request).pipe(
      map(res => this.assembler.toEntity(res)),
      catchError(err => throwError(() => new Error(`Sign-in failed: ${err.status}`))),
    );
  }
}
