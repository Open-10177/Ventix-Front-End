import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('ventix_token');
        router.navigate(['/sign-in']);
      }

      if (error.status === 403) {
        router.navigate(['/home']);
      }

      const message =
        error.error?.message ||
        error.message ||
        'Ocurrió un error inesperado.';

      console.error(`[Ventix Error Interceptor] ${error.status}:`, message);
      return throwError(() => new Error(message));
    })
  );
};
