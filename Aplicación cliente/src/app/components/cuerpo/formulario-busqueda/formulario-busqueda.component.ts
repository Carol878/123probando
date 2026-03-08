/*import { Component, inject } from '@angular/core';
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
 */

import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../../../services/tickets.service';
import { GrupoService } from '../../../services/grupo.service';
import { AreaService } from '../../../services/area.service';
import { AppService } from '../../../services/app.service';
import { BotonComponent } from '../../compartida/boton.component/boton.component';
import { UsuarioService } from '../../../services/usuario.service';
import { TipoCierreService } from '../../../services/tipo-cierre.service';
import { EstadoService } from '../../../services/estado.service';
import { Busqueda } from '../../../../model/busqueda.model';
@Component({
  selector: 'app-formulario-busqueda',
  standalone: true,
  imports: [BotonComponent, ReactiveFormsModule],
  templateUrl: './formulario-busqueda.component.html',
  styleUrls: ['./formulario-busqueda.component.css'],
})
export class FormularioBusquedaComponent {
  private ticketsService = inject(TicketsService);
  //Cargamos las areas posibles
  areaService = inject(AreaService);
  areas = this.areaService.getAreas();

  estadoService = inject(EstadoService);
  estados = this.estadoService.getEstados();

  tipoCierreService = inject(TipoCierreService);
  tiposCierre = this.tipoCierreService.getAreas();

  //Cargamos las grupos de la BBDD
  grupoService = inject(GrupoService);
  grupos = this.grupoService.getGrupos();

  usuarioService = inject(UsuarioService);
  usuarios = this.usuarioService.getUsuarios();

  appService = inject(AppService);
  usuarioLogeado = this.appService.getUsuarioValido();

  prioridades = signal<string[]>(['Crítica', 'Alta', 'Media', 'Baja']);

  alCancelar() {
    this.ticketsService.mostrarTickets();
  }

  alBuscar() {
    this.ticketsService.realizarBusqueda(this.crearBusquedaDesdeFormulario()())
  }

  //Creamos el formualrio con los campos de búsqueda
  miFormulario = new FormGroup({
    texto: new FormControl<string>(''),
    id: new FormControl<string>(''),
    abiertoPor: new FormControl<string>(''),
    areaAfectada: new FormControl<string>(''),
    fechaApertura: new FormControl<Date | undefined>(undefined),
    fechaCierre: new FormControl<Date | undefined>(undefined),
    fechaLimite: new FormControl<Date | undefined>(undefined),
    grupo: new FormControl<number>(0),
    asignatario: new FormControl<string | undefined>(''),
    estado: new FormControl<string>(''),
    prioridad: new FormControl<string>(''),
    tipoCierre: new FormControl<string>(''),
  });

  crearBusquedaDesdeFormulario() {
    const nuevaBusqueda = signal<Busqueda>({
      texto: this.miFormulario.value.texto || undefined,
      idTicket: this.miFormulario.value.id || undefined,
      abiertoPor: this.miFormulario.value.abiertoPor || undefined,
      areaAfectada: this.miFormulario.value.areaAfectada || undefined,
      fechaApertura: this.miFormulario.value.fechaApertura
        ? new Date(this.miFormulario.value.fechaApertura)
        : undefined,
      fechaCierre: this.miFormulario.value.fechaCierre
        ? new Date(this.miFormulario.value.fechaCierre)
        : undefined,
      fechaLimite: this.miFormulario.value.fechaLimite
        ? new Date(this.miFormulario.value.fechaLimite)
        : undefined,
      grupo: this.miFormulario.value.grupo || undefined,
      prioridad: this.miFormulario.value.prioridad || undefined,
      estado: this.miFormulario.value.estado || undefined,
      tipoCierre: this.miFormulario.value.tipoCierre || undefined,

    });

    return nuevaBusqueda;
  }
}
