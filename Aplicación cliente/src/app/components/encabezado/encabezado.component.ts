import { Component, EventEmitter, inject, Output, output, signal, ViewEncapsulation } from '@angular/core';
import { EnlaceSeguroDirective } from './enlace-seguro.directive';
import { TicketsService } from '../../services/tickets.service';
import { AppService } from '../../services/app.service';
import { TitleCasePipe } from '@angular/common';
import { BotonComponent } from '../compartida/boton.component/boton.component';

// Decoramos la clase para que sea un componente.
@Component({
  selector: 'app-encabezado',
  standalone: true,
  // Importamos la directiva que va a utilizar la imagen.
  imports: [EnlaceSeguroDirective, TitleCasePipe, BotonComponent],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css',
  // Hacemos host binding en el decorador para indicar que todas las veces que se referencie este componente llevara implicita la clase CSS "encabezado".
  host: {
    class: 'encabezado',
  },
})
export class EncabezadoComponent {

  @Output() cerrarSesion = new EventEmitter();

  // Inyectamos nuestro servicio y le pasamos el token TicketsService y se va a ir a buscarlo al arbol de inyecciones.
  private ticketsService = inject(TicketsService);

  //Inyectamos nuestro servicio app para gestionar el login
  private appService = inject(AppService);

  usuarioLogeado = this.appService.getUsuarioValido();

  // mostrar recuadro usuario

  recuadro = signal(false);

  mostrarRecuadro() {
    this.recuadro() == false ? this.recuadro.set(true) : this.recuadro.set(false);
  }

  cambiarTicketVisible() {
    this.ticketsService.mostrarTickets();
    this.ticketsService.cambiarTicketVisible('todos');
  }

  alCerrarSesion() {
this.cerrarSesion.emit();
  }
}
