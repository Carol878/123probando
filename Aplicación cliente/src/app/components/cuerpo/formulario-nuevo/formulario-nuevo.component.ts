import { Component, computed, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { TicketsService } from '../../../services/tickets.service';
import { Ticket } from '../tickets/ticket.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { AreaService } from '../../../services/area.service';
import { GrupoService } from '../../../services/grupo.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../../model/usuario.model';
import { BotonComponent } from '../../compartida/boton.component/boton.component';
import { AppService } from '../../../services/app.service';
import { IncidenciaSalidaDto } from '../../../../model/ticket-salida-dto.model';
@Component({
  selector: 'app-formulario-nuevo',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, BotonComponent],
  templateUrl: './formulario-nuevo.component.html',
  styleUrl: './formulario-nuevo.component.css',
})
export class FormularioNuevoComponent {
  //Cargamos las areas posibles
  areaService = inject(AreaService);
  areas = this.areaService.getAreas();

  //Cargamos las grupos de la BBDD
  grupoService = inject(GrupoService);
  grupos = this.grupoService.getGrupos();

  appService = inject(AppService);
  usuarioLogeado = this.appService.getUsuarioValido();

  prioridades = signal<string[]>(['Crítica', 'Alta', 'Media', 'Baja']);

  private ticketsService = inject(TicketsService);

  fechaLimite = signal<Date | undefined>(undefined);

  //Creamos el formualrio con los campos de tickets
  miFormulario = new FormGroup({
    titulo: new FormControl<string>(''),
    descripcion: new FormControl<string>(''),
    codigoTicket: new FormControl<string>(''),
    abiertoPor: new FormControl<string>(this.usuarioLogeado()!.username),
    categoriaTicket: new FormControl<string>(''),
    areaAfectada: new FormControl<string>(''),
    fechaApertura: new FormControl<Date>(new Date()),
    fechaCierre: new FormControl<Date | undefined>(undefined),
    fechaLimite: new FormControl<Date | undefined>(this.fechaLimite()),
    grupo: new FormControl<number>(0),
    asignatario: new FormControl<string | undefined>(''),
    estado: new FormControl<string>('Abierto'),
    prioridad: new FormControl<string>(''),
    tipoCierre: new FormControl(''),
    comentarioCierre: new FormControl(''),
  });

  alCancelar() {
    this.ticketsService.mostrarTickets();
  }

  alGuardar() {
    this.ticketsService.crearTicket(this.crearIncidenciaDeFormulario())
  }
  alGuardarYSalir() {


  }

  //Y una vez creado desactivamos los valores que no nos interesan
  ngOnInit() {
    this.miFormulario.controls['abiertoPor'].disable();
    this.miFormulario.controls['estado'].disable();
    this.miFormulario.controls['fechaLimite'].disable();
    this.miFormulario.controls['fechaCierre'].disable();
    this.miFormulario.controls['fechaApertura'].disable();

    // this.actualizarFechaLimite()

    // Cuando cambie el formulario cambiara el signal
    this.miFormulario.get('prioridad')?.valueChanges.subscribe((valor) => {
      this.prioridadSignal.set(valor || 'Media');
    });
  }

  private prioridadSignal = signal<string>('');

  fechaLimiteCalculada = computed(() => {
    const prioridad = this.prioridadSignal();
    const fechaApertura = this.miFormulario.get('fechaApertura')!.value;

    return this.calcularFechaLimite(fechaApertura as Date, prioridad as string);
  });

  calcularFechaLimite(fechaApertura: Date, prioridad: string) {
    const nuevaFecha = new Date(fechaApertura);

    switch (prioridad) {
      case 'Crítica':
        nuevaFecha.setHours(nuevaFecha.getHours() + 4);
        break;
      case 'Alta':
        nuevaFecha.setHours(nuevaFecha.getHours() + 6);
        break;
      case 'Media':
        nuevaFecha.setDate(nuevaFecha.getDate() + 1);
        break;
      case 'Baja':
        nuevaFecha.setDate(nuevaFecha.getDate() + 3);
        break;
      default:
        undefined;
    }

    return nuevaFecha;
  }

  actualizarFechaLimite() {
    const fechaLimite = this.fechaLimiteCalculada();
    if (fechaLimite) {
      this.miFormulario.controls['fechaLimite'].setValue(fechaLimite);
    }
  }

  crearIncidenciaDeFormulario() {
    //Creamos un formulario en crudo para enviar cambios disabled
    const formValues = this.miFormulario.getRawValue();

    const nuevaIncidencia: IncidenciaSalidaDto = {
      idTicket: 0,
      categoriaTicket: 'INCIDENCIA',
      titulo: this.miFormulario.value.titulo ?? "",
      descripcion: this.miFormulario.value.descripcion?? "",
      fechaApertura: this.convertirFechaAIsoSinTimezone(formValues.fechaApertura),
      fechaCierre: this.convertirFechaAIsoSinTimezone(this.miFormulario.value.fechaCierre),
      fechaLimite: this.convertirFechaAIsoSinTimezone(formValues.fechaLimite),
      abiertoPorUsername: formValues.abiertoPor ?? "",
      asignatarioUsername: this.miFormulario.value.asignatario ?? "",
      estado: "En curso",
      areaAfectada: this.miFormulario.value.areaAfectada ?? "",
      comentarioCierre: this.miFormulario.value.comentarioCierre ?? "",
      tipoCierre: this.miFormulario.value.tipoCierre ?? "",
      prioridad: this.miFormulario.value.prioridad ?? "",
      grupoId: this.miFormulario.value.grupo ?? 0,
      codigoTicket: this.miFormulario.value.codigoTicket ?? "",
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
