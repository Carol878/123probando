import { Component, inject, Inject, input, signal } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { BotonComponent } from '../compartida/boton.component/boton.component';
import { TicketsComponent } from './tickets/tickets.component';
import { FormularioNuevoComponent } from './formulario-nuevo/formulario-nuevo.component';
import { FormularioBusquedaComponent } from './formulario-busqueda/formulario-busqueda.component';
import { TicketComponent } from './ticket/ticket.component';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-cuerpo',
  standalone: true,
  imports: [
    TicketsComponent,
    FormularioNuevoComponent,
    FormularioBusquedaComponent,
    TicketComponent,
  ],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.css',
})
export class CuerpoComponent {
  

  // Inyectamos nuestro servicio y le pasamos el token TicketsService y se va a ir a buscarlo al arbol de inyecciones.
  private ticketsService = inject(TicketsService);

  // Cargamos el dato en nuestro componente
  tipoDeTicket = this.ticketsService.getTipoDeTicketVisible();

  //Cargamos lo que se va a proyectar
  proyeccion = this.ticketsService.getProyeccion();
}
