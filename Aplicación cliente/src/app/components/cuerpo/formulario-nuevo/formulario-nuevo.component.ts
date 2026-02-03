import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from '../../../services/tickets.service';
import { Cambio, Ticket } from '../tickets/ticket.model'; // Importamos la interfaz Cambio
import { AppService } from '../../../services/app.service'; // Necesario para el usuario actual


@Component({
  selector: 'app-formulario-nuevo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-nuevo.component.html',
  styleUrl: './formulario-nuevo.component.css',
})
export class FormularioNuevoComponent {
  private fb = inject(FormBuilder);
  private ticketsService = inject(TicketsService);
  private appService = inject(AppService); // Inyectamos appService

  ticketForm: FormGroup;

  // Opciones para los desplegables
  categorias = ['CAMBIO', 'PETICION', 'INCIDENCIA', 'PROBLEMA']; // Mayúsculas para coincidir con BBDD si es enum o string
  prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];

  // Opciones específicas de Cambios
  categoriasCambio = ['Estandar', 'Normal', 'Emergencia'];

  constructor() {
    this.ticketForm = this.fb.group({
      categoria: ['CAMBIO', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      asignatario: ['', Validators.required], // Username del técnico
      areaAfectada: ['', Validators.required],
      prioridad: ['Media', Validators.required],
      // Campos específicos de Cambio (inicialmente vacíos o con validación condicional)
      categoriaCambio: ['Normal'],
      planImplementacion: [''],
      planMarchaAtras: [''],
      efectoNoImplementar: ['']
    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      const formValue = this.ticketForm.value;
      const usuarioActual = this.appService.getUsuarioValido()(); // Obtenemos el usuario logueado (Signal)

      // Construcción del objeto Cambio
      // NOTA: "as Cambio" fuerza a TypeScript a tratarlo como tal, pero debemos asegurarnos de llenar los datos.
      const nuevoTicket: Cambio = {
        // Campos de TicketBase
        idTicket: null as any, // Forzamos null para que Java lo reciba limpio
        codigoTicket: null as any, // El backend debería generarlo o dejarlo null
        fechaApertura: null as any,
        //fechaApertura: new Date().toISOString(), // Enviamos fecha actual
        estado: 'Registrado', // Estado inicial
        categoriaTicket: formValue.categoria, // 'CAMBIO'
        titulo: formValue.titulo,
        descripcion: formValue.descripcion,
        prioridad: formValue.prioridad,
        areaAfectada: formValue.areaAfectada,

        // Relaciones (Objetos completos o con ID para que JPA los vincule)
        abiertoPor: usuarioActual!, // El usuario logueado
        asignatario: { username: formValue.asignatario } as any, // Simulamos objeto usuario solo con el ID
        grupo: usuarioActual?.grupo!, // Asignamos el grupo del usuario creador por defecto

        // Campos específicos de Cambio
        categoriaCambio: formValue.categoriaCambio,
        planImplementacion: formValue.planImplementacion,
        planMarchaAtras: formValue.planMarchaAtras,
        efectoNoImplementar: formValue.efectoNoImplementar
      };

      console.log('Enviando ticket al servidor:', nuevoTicket);
      this.ticketsService.crearTicket(nuevoTicket);

      // Resetear formulario
      this.ticketForm.reset({ categoria: 'CAMBIO', prioridad: 'Media' });

    } else {
      alert('Por favor completa todos los campos requeridos.');
    }
  }

  cancelar() {
    this.ticketsService.mostrarTickets();
  }
}
