
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      // Aquí puedes manejar errores específicos por código de estado
      if ([401, 403].includes(error.status)) {
        // Ejemplo: Si es 401 (No autorizado), podrías redirigir al login
        console.error('Sesión expirada o falta de permisos.');
      }

      // Extraemos el mensaje de error para que sea legible
      const errorMessage = error.error?.message || error.statusText || 'Error desconocido en el servidor';

      console.error(`[Ventix Error ${error.status}]: ${errorMessage}`);

      // Retornamos el error para que el componente que hizo la petición también pueda manejarlo
      return throwError(() => new Error(errorMessage));
    })
  );
};
