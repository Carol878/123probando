import {inject, Injectable, signal } from '@angular/core';
import { Estados } from '../../estados';


// Decoramos la clase como inyectable para poder crear una sola instancia de la misma en todos los componenete y que comparatn la información.
// El valor root significar que lo añada al apartado root del arbol de inyecciones de Angular.
@Injectable({ providedIn: 'root' })
export class EstadoService {

    //Definimos todas las Estados psoibles
    private estados = signal(Estados)

    //Y las devolvemos
    getEstados() {
    return this.estados.asReadonly();
  }
}
