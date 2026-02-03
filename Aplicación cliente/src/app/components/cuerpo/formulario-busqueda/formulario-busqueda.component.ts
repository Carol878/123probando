import { Component, inject } from '@angular/core';
import { TicketsService } from '../../../services/tickets.service';
import { BotonComponent } from '../../compartida/boton.component/boton.component';
import { BusquedaCambiosComponent } from './busqueda-cambios/busqueda-cambios.component';

@Component({
  selector: 'app-formulario-busqueda',
  standalone: true,
  imports: [BusquedaCambiosComponent],
  templateUrl: './formulario-busqueda.component.html',
  styleUrl: './formulario-busqueda.component.css',
})
export class FormularioBusquedaComponent {

   // Inyectamos nuestro servicio y le pasamos el token TicketsService y se va a ir a buscarlo al arbol de inyecciones.
  private ticketsService = inject(TicketsService);

  //Obtenemos el formulario del tipo que queremos
  formularioAMostrar = this.ticketsService.getTipoDeTicketVisible();
 
}
