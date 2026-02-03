import { Component, inject, signal } from '@angular/core';
import { TicketsService } from '../../../services/tickets.service';
import { JsonPipe } from '@angular/common';
import { BotonComponent } from '../../compartida/boton.component/boton.component';
import { IncidenciaComponent } from './incidencia/incidencia.component';
import { PeticionComponent } from './peticion/peticion.component';
import { ProblemaComponent } from './problema/problema.component';
import { CambioComponent } from './cambio/cambio.component';

@Component({
  selector: 'app-ticket',
  imports: [IncidenciaComponent, PeticionComponent, ProblemaComponent, CambioComponent],
  standalone: true,
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  // Inyectamos nuestro servicio y le pasamos el token TicketsService y se va a ir a buscarlo al arbol de inyecciones.
  private ticketsService = inject(TicketsService);

  //visualizamos el ticket sobre el que se haya pulsado
  ticket = this.ticketsService.getVisualizarTicket();

  
}