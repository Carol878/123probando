import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { HttpService } from './http.service';
import { TicketsService } from './tickets.service';

// Decoramos la clase como inyectable para poder crear una sola instancia de la misma en todos los componenete y que comparatn la información.
// El valor root significar que lo añada al apartado root del arbol de inyecciones de Angular.
@Injectable({ providedIn: 'root' })
export class AppService {
  //esto tiene que guardarse en el localstorage del navegador para evitar salir de la app al recargar.
  //Declaramos un atributo para controlar si el usuario ha iniciado sesión
  private logeado = signal<boolean>(false);

  private intentoFallido = signal<boolean>(false);
  //Configuramos Getter
  getIntentoFallido() {
    return this.intentoFallido.asReadonly();
  }
  //Configuramos Setter y hacemos.
  setIntentoFallido(valor: boolean) {
    this.intentoFallido.set(valor);
  }

  //Vamos a definir la logica para almacenar si el usuario esta logeado o no en el constructor.
  constructor() {
    const hayAlguienLogeado = localStorage.getItem('logeado');
    const usuarioLogeado = localStorage.getItem('usuario');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (hayAlguienLogeado) {
      this.logeado.set(JSON.parse(hayAlguienLogeado));
      this.usuarioValido.set(JSON.parse(usuarioLogeado!) as Usuario);
      this.username.set(JSON.parse(username!));
      this.password.set(JSON.parse(password!));
    }
  }

  //Configuramos Getter
  getLogeado() {
    return this.logeado.asReadonly();
  }
  //Configuramos Setter y hacemos que modifique el localstorage poniendo una clave logeado con el valor de si hay alguien logeado o no.
  setLogeado(valor: boolean) {
    this.logeado.set(valor);
    localStorage.setItem('logeado', JSON.stringify(valor));
  }

  //Guardamos el usuario cuando sea valido

  private usuarioValido = signal<Usuario | undefined>(undefined);

  setUsuarioValido(usuarioYaConfirmado: Usuario) {
    this.usuarioValido.set(usuarioYaConfirmado);
    localStorage.setItem('usuario', JSON.stringify(usuarioYaConfirmado));
  }

  getUsuarioValido() {
    return this.usuarioValido.asReadonly();
  }

  //Definimos variables de user y pass vacias:

  private username = signal<string>('');
  private password = signal<string>('');

  setUsername(username: string) {
    this.username.set(username);
    localStorage.setItem('username', JSON.stringify(username));
  }

  setPassword(password: string) {
    this.password.set(password);
    localStorage.setItem('password', JSON.stringify(password));
  }

  getUsername() {
    return this.username.asReadonly();
  }

  getPassword() {
    return this.password.asReadonly();
  }
}
