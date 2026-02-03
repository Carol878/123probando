import { Component, inject } from '@angular/core';
import { TicketsService } from '../../../../services/tickets.service';
import { BotonComponent } from '../../../compartida/boton.component/boton.component';

@Component({
  selector: 'app-cambio',
  imports: [BotonComponent],
  templateUrl: './cambio.component.html',
  styleUrl: './cambio.component.css',
})
export class CambioComponent {
// Inyectamos nuestro servicio y le pasamos el token TicketsService y se va a ir a buscarlo al arbol de inyecciones.
  private ticketsService = inject(TicketsService);

  //visualizamos el ticket sobre el que se haya pulsado
  ticket = this.ticketsService.getVisualizarTicket();

  //FUnción para ir hacia atars y volver a mostrar todos los tickets
  alCancelar() {
    this.ticketsService.mostrarTickets();
  }
  //Funcion para guardar
  alGuardar() {
    // this.ticketsService.actualizarTicket();
  }
}
