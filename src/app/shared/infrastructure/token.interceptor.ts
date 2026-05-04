import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Por ahora, solo deja pasar la petición sin cambios.
  // Más adelante, aquí es donde inyectarás el AuthService para pegar el token.

  const authReq = req.clone({
    // Aquí podrías añadir headers globales si fuera necesario
  });

  return next(authReq);
};
