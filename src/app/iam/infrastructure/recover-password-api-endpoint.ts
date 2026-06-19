import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { RecoverPasswordRequest } from './recover-password.request';
import { RecoverPasswordResponse } from './recover-password-response';
import { RecoverPasswordAssembler } from './recover-password-assembler';
import { environment } from '../../../enviroment/environment';

export class RecoverPasswordApiEndpoint {
  private readonly url = `${environment.baseUrl}${environment.iamRecoverPasswordEndpointPath}`;
  private readonly assembler = new RecoverPasswordAssembler();

  constructor(private http: HttpClient) {}

  recover(request: RecoverPasswordRequest): Observable<string> {
    return this.http.post<RecoverPasswordResponse>(this.url, request).pipe(
      map(res => this.assembler.toMessage(res)),
      catchError(err => throwError(() => new Error(`Recovery failed: ${err.status}`))),
    );
  }
}
