import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Areas } from '../../areas';
import { Grupo } from '../../model/grupo.model';
import { HttpService } from './http.service';

// Decoramos la clase como inyectable para poder crear una sola instancia de la misma en todos los componenete y que comparatn la información.
// El valor root significar que lo añada al apartado root del arbol de inyecciones de Angular.
@Injectable({ providedIn: 'root' })
export class GrupoService {
  //Creamos la variable donde almacenaremos los grupos que recibamos de la api
  private grupos = signal<Grupo[] | undefined>(undefined);

  //Inyectamos el servicio HTTP
  private httpService = inject(HttpService);

  //Creamos esta variable para corta la subcripción cuando finalice. En este caso va a estar escuchando siempre pero es una buena práctica.
  private destroyRef = inject(DestroyRef);

  constructor() {
    const subscripcion = this.httpService.cargarGrupos().subscribe((grupos) => {next: this.grupos.set(grupos)})
    this.destroyRef.onDestroy(() => subscripcion.unsubscribe());
    console.log(this.grupos())
  }

  //Y las devolvemos
  getGrupos() {
    return this.grupos.asReadonly();
  }
}
