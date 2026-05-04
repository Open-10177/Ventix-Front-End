import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../enviroment/enviroment'; // Asegúrate de que solo haya UNO

export abstract class BaseApi<T> {
  protected http = inject(HttpClient);

  // CAMBIO AQUÍ: Usa 'baseUrl' en lugar de 'serverBasePath'
  // para que coincida con tu archivo de configuración.
  protected baseUrl = environment.baseUrl;

  protected resourceEndpoint: string = '';

  protected get resourcePath() {
    return `${this.baseUrl}${this.resourceEndpoint}`;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something happened with the request; please try again later.'));
  }
}
