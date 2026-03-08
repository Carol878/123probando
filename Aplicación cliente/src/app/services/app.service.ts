import { DestroyRef, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { Usuario } from '../../model/usuario.model';

@Injectable({ providedIn: 'root' })
export class AppService {
  private logeado = signal<boolean>(false);
  private intentoFallido = signal<boolean>(false);
  private usuarioValido = signal<Usuario | undefined>(undefined);
  private token = signal<string | null>(null);

  //Almacenamos en el localstorage las variables para tener la información aunque se recargue la página.
  constructor() {
    const hayAlguienLogeado = localStorage.getItem('logeado');
    const usuarioLogeado = localStorage.getItem('usuario');
    const tokenGuardado = localStorage.getItem('token');

    if (hayAlguienLogeado) {
      this.logeado.set(JSON.parse(hayAlguienLogeado));
    }

    if (usuarioLogeado) {
      try {
        this.usuarioValido.set(JSON.parse(usuarioLogeado) as Usuario);
      } catch (e) {
        this.usuarioValido.set(undefined);
      }
    }

    if (tokenGuardado) {
      this.token.set(tokenGuardado);
    }

  }

  // Getters
  getLogeado() {
    return this.logeado.asReadonly();
  }

  getIntentoFallido() {
    return this.intentoFallido.asReadonly();
  }

  getUsuarioValido() {
    return this.usuarioValido.asReadonly();
  }

  getToken() {
    return this.token.asReadonly();
  }

  // Setters
  setLogeado(valor: boolean) {
    this.logeado.set(valor);
    localStorage.setItem('logeado', JSON.stringify(valor));
    if (!valor) {
      // Limpiar todo al cerrar sesión
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
      this.usuarioValido.set(undefined);
      this.token.set(null);
    }
  }

  setIntentoFallido(valor: boolean) {
    this.intentoFallido.set(valor);
  }

  setUsuarioValido(usuarioYaConfirmado: Usuario) {
    this.usuarioValido.set(usuarioYaConfirmado);
    localStorage.setItem('usuario', JSON.stringify(usuarioYaConfirmado));
  }

  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('token', token);
  }

}
