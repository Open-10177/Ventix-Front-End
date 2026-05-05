import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

export class ErrorHandlingEnabledBaseType {
  protected handleApiError(error: HttpErrorResponse): Observable<never> {
    let message: string;

    if (error.status === 0) {
      message = 'No se pudo conectar al servidor. Verifica tu conexión.';
    } else if (error.status === 401) {
      message = 'No autorizado. Por favor inicia sesión nuevamente.';
    } else if (error.status === 403) {
      message = 'No tienes permisos para realizar esta acción.';
    } else if (error.status === 404) {
      message = 'El recurso solicitado no fue encontrado.';
    } else if (error.status >= 500) {
      message = 'Error interno del servidor. Intenta más tarde.';
    } else {
      message = error.message || 'Ocurrió un error inesperado.';
    }

    console.error(`[Ventix API Error] ${error.status}: ${message}`, error);
    return throwError(() => new Error(message));
  }
}
