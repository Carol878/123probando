import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from '../../../services/tickets.service';
import { Ticket } from '../tickets/ticket.model';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-formulario-nuevo',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './formulario-nuevo.component.html',
  styleUrl: './formulario-nuevo.component.css',
})
export class FormularioNuevoComponent {
  private fb = inject(FormBuilder);
  private ticketsService = inject(TicketsService);

  ticketForm: FormGroup;

  // Opciones para los desplegables
  categorias = ['Cambios', 'Peticiones', 'Incidencias', 'Problemas'];
  prioridades = ['Baja', 'Media', 'Alta', 'Crítica'];

  constructor() {
    this.ticketForm = this.fb.group({
      categoria: ['Cambios', Validators.required], // Por defecto Cambios
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      asignatario: ['', Validators.required],
      areaAfectada: ['', Validators.required],
      prioridad: ['media', Validators.required]
    });
  }
  onSubmit() {
    // if (this.ticketForm.valid) {
    //   const formValue = this.ticketForm.value;

    //   // // Generación automática de campos del sistema
    //   // const nuevoTicket: Ticket = {
    //   //   idTicket: this.generarIdUnico(), //Aquí generamos el ID
    //   //   fechaApertura: new Date(),
    //   //   estado: 'Análisis de riesgos y planificación', // Estado inicial por defecto ITIL
      
    //   //   // Campos del formulario
    //   //   categoriaTicket: formValue.categoria,
    //   //   titulo: formValue.titulo,
    //   //   descripcion: formValue.descripcion,
    //   //   asignatario: formValue.asignatario,
    //   //   areaAfectada: formValue.areaAfectada,
    //   //   prioridad: formValue.prioridad,
    //   //   fechaCierre: formValue.fechaCierre,
    //   //   fechaLimite: formValue.fechaLimite,
    //   //   abiertoPor: formValue.abiertoPor, // Pendiente de asignar usuario actual
    //   //   comentarioCierre: formValue.comentarioCierre,
    //   //   tipoCierre: formValue.tipoCierre
    //   };

  //     console.log('Creando nuevo ticket:', nuevoTicket);
  //     this.ticketsService.crearTicket(nuevoTicket);
      
  //     // Resetear el formulario
  //     this.ticketForm.reset({
  //       categoria: 'Cambios',
  //       prioridad: 'media'
  //     });
  //   } else {
  //     alert('Por favor completa todos los campos requeridos.');
  //   }
  }


  cancelar() {
    this.ticketsService.mostrarTickets();
  }

  // // Utilidad simple para generar ID (en producción vendría del Backend)
  // private generarIdUnico(): string {
  //   switch (this.ticketForm.value.categoria) {
  //     case 'Incidencias':
  //       return 'INC' + Math.floor(Math.random() * 10000).toString().padStart(8, '0');
  //     case 'Peticiones':
  //       return 'RF' + Math.floor(Math.random() * 10000).toString().padStart(8, '0');
  //     case 'Problemas':
  //       return 'PM' + Math.floor(Math.random() * 10000).toString().padStart(8, '0');
  //     case 'Cambios':
  //       return 'CM' + Math.floor(Math.random() * 10000).toString().padStart(8, '0');
  //     default:
  //       return 'Ha ocurrido un error';
  //   }
  // }
}
