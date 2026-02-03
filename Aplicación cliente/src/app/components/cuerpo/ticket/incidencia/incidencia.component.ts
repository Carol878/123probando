import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { TicketsService } from '../../../../services/tickets.service';
import { BotonComponent } from '../../../compartida/boton.component/boton.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { AreaService } from '../../../../services/area.service';
import { TipoCierreService } from '../../../../services/tipo-cierre.service';
import { GrupoService } from '../../../../services/grupo.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { Incidencia, Ticket } from '../../tickets/ticket.model';
import { Usuario } from '../../../../../model/usuario.model';
import { Grupo } from '../../../../../model/grupo.model';
import { take } from 'rxjs';
import { IncidenciaSalidaDto, TicketSalidaDto } from '../../../../../model/ticket-salida-dto.model';
import { ActividadIncidencia } from '../../../../../model/actividad-incidencia.model';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-incidencia',
  imports: [BotonComponent, ReactiveFormsModule, DatePipe],
  templateUrl: './incidencia.component.html',
  styleUrl: './incidencia.component.css',
})
export class IncidenciaComponent implements OnInit {
  //Cargamos las areas posibles
  areaService = inject(AreaService);
  areas = this.areaService.getAreas();

  //Cargamos las tipos de cierre posibles
  tipoCierreService = inject(TipoCierreService);
  tiposCierre = this.tipoCierreService.getAreas();

  //Cargamos las grupos de la BBDD
  grupoService = inject(GrupoService);
  grupos = this.grupoService.getGrupos();

  //Cargamos las grupos de la BBDD
  usuarioService = inject(UsuarioService);
  usuarios = this.usuarioService.getUsuarios();

  // Inyectamos nuestro servicio y le pasamos el token TicketsService y se va a ir a buscarlo al arbol de inyecciones.
  private ticketsService = inject(TicketsService);

  //visualizamos el ticket sobre el que se haya pulsado
  ticket = this.ticketsService.getVisualizarTicket() as Incidencia;

  actividades = this.ticketsService.getActividadesTicket();

  //Cargamos el usuario que esta logeado para ver si coincide con el asignatario y asi permitirle añadir notas y resolver.

  appService = inject(AppService);
  usuarioLogeado = this.appService.getUsuarioValido();

  coincideUsuarioConAsignado = signal(
    this.ticket?.asignatario?.username === this.usuarioLogeado()?.username,
  );

  //Variables para gestionar si mostramos el menu de resovler

  resolver = signal(false);

  //Creamos un signal para luego leerlo con el effect
  private ticketActualizadoSig = this.ticketsService.getTicketActualizado();

  constructor() {
    // Creamos un effect que se activara cuando se actualice el ticket
    effect(() => {
      const haCambiado = this.ticketActualizadoSig();
      if (haCambiado) {
        this.ticket = haCambiado as Incidencia;

        // recalculamos la visibilidad del botón

        this.coincideUsuarioConAsignado.set(
          this.ticket?.asignatario?.username === this.usuarioLogeado()?.username,
        );
      }
    });
  }

  //FUnción para ir hacia atars y volver a mostrar todos los tickets
  alCancelar() {
    if (this.resolver()) {
      this.resolver.set(false);
    } else {
      this.ticketsService.mostrarTickets();
    }
  }
  //Funcion para guardar
  alGuardar() {
    this.ticketsService.actualizarTicket(this.crearIncidenciaDeFormulario());
  }

  alGuardarYSalir() {
    this.ticketsService.actualizarTicket(this.crearIncidenciaDeFormulario());
    this.ticketsService.mostrarTickets();
  }

  alResolver() {
    this.resolver.set(true);
    this.ticketsService.actualizarTicket(this.crearIncidenciaDeFormulario());
  }

  alAnadirComentario() {}

  //Creamos el formualrio con los campos de tickets
  miFormulario = new FormGroup({
    titulo: new FormControl<string>(this.ticket!.titulo),
    descripcion: new FormControl<string>(this.ticket!.descripcion),
    codigoTicket: new FormControl<string>(this.ticket!.codigoTicket),
    abiertoPor: new FormControl<string>(this.ticket!.abiertoPor.username),
    categoriaTicket: new FormControl<string>(this.ticket!.categoriaTicket),
    areaAfectada: new FormControl<string>(this.ticket!.areaAfectada),
    fechaApertura: new FormControl<Date>(this.ticket!.fechaApertura as Date),
    fechaCierre: new FormControl<Date>(this.ticket?.fechaCierre as Date),
    fechaLimite: new FormControl<Date>(this.ticket?.fechaLimite as Date),
    grupo: new FormControl<number>(this.ticket!.grupo.idGrupo),
    asignatario: new FormControl<string | undefined>(this.ticket?.asignatario?.username),
    estado: new FormControl<string>(this.ticket!.estado),
    prioridad: new FormControl<string>(this.ticket!.prioridad),
    tipoCierre: new FormControl(this.ticket?.tipoCierre),
    comentarioCierre: new FormControl(this.ticket?.comentarioCierre),
  });

  //Y una vez creado desactivamos los valores que no nos interesan
  ngOnInit(): void {
    this.miFormulario.controls['titulo'].disable();
    this.miFormulario.controls['codigoTicket'].disable();
    this.miFormulario.controls['abiertoPor'].disable();
    this.miFormulario.controls['categoriaTicket'].disable();
    this.miFormulario.controls['estado'].disable();
    this.miFormulario.controls['prioridad'].disable();
    this.miFormulario.controls['fechaLimite'].disable();
    this.miFormulario.controls['fechaCierre'].disable();
    this.miFormulario.controls['fechaApertura'].disable();
  }

  crearIncidenciaDeFormulario() {
    const nuevoUsuarioAsignatario = signal<Usuario | undefined>(undefined);
    const nuevoGrupoAsignacion = signal<Grupo | undefined>(undefined);

    //Antes hacia esto pero no hace falta poruqe ahora rehidratamos en el backend
    // if (this.miFormulario.value.asignatario) {
    //   this.ticketsService
    //     .buscarUnUsuario(this.miFormulario.value.asignatario)
    //     .pipe(take(1)) // se completa solo tras recibir un valor no hay que destruir la suscripción
    //     .subscribe({
    //       next: (usuario) => {
    //         nuevoUsuarioAsignatario.set(usuario);
    //         console.log(nuevoUsuarioAsignatario());
    //       },
    //       error: (err) => console.error('Error usuario:', err),
    //     });
    // }

    // if (this.miFormulario.value.grupo) {
    //   this.ticketsService
    //     .buscarUnGrupo(this.miFormulario.value.grupo as number)
    //     .pipe(take(1))
    //     .subscribe({
    //       next: (grupo) => {
    //         nuevoGrupoAsignacion.set(grupo);
    //         console.log(nuevoGrupoAsignacion());
    //       },

    //       error: (err) => console.error('Error grupo:', err),
    //     });
    // }

    const nuevaIncidencia: IncidenciaSalidaDto = {
      idTicket: this.ticket!.idTicket,
      categoriaTicket: this.ticket!.categoriaTicket,
      titulo: this.ticket!.titulo,
      descripcion: this.miFormulario.value.descripcion ?? '',
      fechaApertura: this.convertirFechaAIsoSinTimezone(this.ticket!.fechaApertura),
      fechaCierre: this.convertirFechaAIsoSinTimezone(this.ticket!.fechaCierre),
      fechaLimite: this.convertirFechaAIsoSinTimezone(this.ticket!.fechaLimite),
      abiertoPorUsername: this.ticket!.abiertoPor.username,
      asignatarioUsername: this.miFormulario.value.asignatario ?? '',
      estado: this.ticket!.estado,
      areaAfectada: this.miFormulario.value.areaAfectada ?? '',
      comentarioCierre: this.miFormulario.value.comentarioCierre ?? '',
      tipoCierre: this.miFormulario.value.tipoCierre ?? '',
      prioridad: this.ticket!.prioridad,
      grupoId: this.miFormulario.value.grupo ?? this.ticket?.grupo?.idGrupo ?? null,
      codigoTicket: this.ticket!.codigoTicket,
    };

    console.log(nuevaIncidencia);

    return nuevaIncidencia;
  }

  convertirFechaAIsoSinTimezone(fecha?: string | Date | null): string | Date | null {
    if (!fecha) return null; // Si es null o undefined, devuelve null
    const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return date.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
  }
}
