import { Component, inject, Input } from '@angular/core';
import { Funcion } from './funcion.model';
import { TitleCasePipe } from '@angular/common';
import { TicketsService } from '../../services/tickets.service';

// Decoramos el componente
@Component({
  selector: 'app-funciones',
  // Importamos el pipe
  imports: [TitleCasePipe],
  templateUrl: './funciones.component.html',
  styleUrl: './funciones.component.css',
})
export class FuncionesComponent {

  // Guardamos la informacion de la funcion del boton con el input que nos mandan para luego poder usarla en el emit y en la plantilla.
  @Input({required:true}) funcion! :Funcion;

  // Inyectamos nuestro servicio y le pasamos el token TicketsService y se va a ir a buscarlo al arbol de inyecciones.
  private ticketsService = inject(TicketsService)

  //Funcion que cambia el tipo en el service y vuelve a mostrar los tickets
  cambiarTicketVisible(){
    this.ticketsService.mostrarTickets();
    this.ticketsService.cambiarTicketVisible(this.funcion.categoria);
    // console.log(this.ticketsService.setTipoDeTicketVisible(this.funcion.categoria))
  }

  // Funciona para comporbar cual esta seleciconado y poder añadirle un estilo propio.
  comprobarSiEstaSeleccionado(){
    const seleccionado = this.ticketsService.getTipoDeTicketVisible();
    return seleccionado()===this.funcion.categoria;
  }

}
