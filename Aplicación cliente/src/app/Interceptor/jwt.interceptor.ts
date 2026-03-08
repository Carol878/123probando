import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppService } from '../services/app.service';

//Creamos un interceptor de las llamadas http para que cuando lo configuremos en el providers de la app inyecte el token en todas las llamadas.
//Por eso en el http service, no ponemos nada: this.url + '/tickets/all'; porque lo inyecta despues angular
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  // Obtenemos el token que genera realizarInicioSesion()
  const appService = inject(AppService);
  const token = appService.getToken()();

  //Si hay token lo agregamos a la cabecera de una copia del request que mandamos
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedReq);
  }

  //Si no hay token se manda el request sin tocar
  return next(req);
};
