import {inject, Injectable, signal } from '@angular/core';
import { Areas } from '../../areas';
import { TipoCierre } from '../../tipoCierre';


// Decoramos la clase como inyectable para poder crear una sola instancia de la misma en todos los componenete y que comparatn la información.
// El valor root significar que lo añada al apartado root del arbol de inyecciones de Angular.
@Injectable({ providedIn: 'root' })
export class TipoCierreService {

    //Definimos todas las areas psoibles
    private tipoCierre = signal(TipoCierre)

    //Y las devolvemos
    getAreas() {
    return this.tipoCierre.asReadonly();
  }
}