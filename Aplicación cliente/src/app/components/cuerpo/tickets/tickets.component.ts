import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { TicketsService } from '../../../services/tickets.service';
import { DatePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { type Ticket } from './ticket.model';
import { TruncatePipe } from '../../../../pipes/truncate.pipe';
import { BotonComponent } from '../../compartida/boton.component/boton.component';
import { AppService } from '../../../services/app.service';
import { ExportDirective } from '../export.directive';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, TruncatePipe, BotonComponent, ExportDirective],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  //Cargamos el usuario que esta logeado para ver si coincide el grupo y eliminar de la tabla el asignatario
  appService = inject(AppService);
  usuarioLogeado = this.appService.getUsuarioValido();

  //Lista para crear encabezado dinámicamente.

  nombreColumnas: { clave: string; valor: string }[] = [
    { clave: 'codigoTicket', valor: 'ID' },
    { clave: 'categoriaTicket', valor: 'Categoría' },
    { clave: 'titulo', valor: 'Título' },
    { clave: 'descripcion', valor: 'Descripción' },
    { clave: 'fechaApertura', valor: 'Fecha Apertura' },
    { clave: 'asignatario.username', valor: 'Asignado' },
    { clave: 'asignatario.grupo.nombre_grupo', valor: 'Grupo de asignación' },
    { clave: 'estado', valor: 'Estado' },
    { clave: 'areaAfectada', valor: 'Área Afectada' },
    { clave: 'prioridad', valor: 'Prioridad' },
  ];

  //Variable para alterar ascente y descente
  ordenarInverso = signal<boolean>(false);

  //Mostrar triangulo que tendra el dato de la columna para compararlo y mostrar la imagen
  mostrarTriangulo = signal<string>('');

  // Inyectamos nuestro servicio y le pasamos el token TicketsService y se va a ir a buscarlo al arbol de inyecciones.
  private ticketsService = inject(TicketsService);

  // Cargamos el dato en nuestro componente
  tipoDeTicket = this.ticketsService.getTipoDeTicketVisible();

  // Getter para cuando no haya filtro, especificamos el tipo de dato que devolvemos por facilitar la comprensión del código.
  get Todos(): Ticket[] {
    return this.ticketsService.getTickets();
  }

  // Getter cuando se seleccione un solo tipo de categoria de ticket
  get soloUnTipo(): Ticket[] {
    if (this.tipoDeTicket() === "abiertas"){
      return this.ticketsService.getTicketsAbiertos()
    } else {
    return this.ticketsService
      .getTickets()
      .filter((ticket) => ticket.categoriaTicket.toLocaleLowerCase() === this.tipoDeTicket());}
  }

  //Variable con datos a exportar

  ticketsAExportar = computed(() => {
    switch (this.tipoDeTicket()) {
      case "todos":

        return this.Todos;

      default:
        return this.soloUnTipo;
    }
  });

  //Llamamos al metodo del servicio para que cambie la lista y gestionamos donde se muestra el filtro y como se realizara la sigueinte vez que se ordene
  ordenarFilas(rutaDeVariable: string) {
    if (this.ordenarInverso()) {
      this.ticketsService.ordenarFilasDescendente(rutaDeVariable);
      this.ordenarInverso.set(false);
    } else {
      this.ticketsService.ordenarFilasAscendente(rutaDeVariable);
      this.ordenarInverso.set(true);
    }
    this.mostrarTriangulo.set(rutaDeVariable);
    console.log(this.ordenarInverso());
  }

  //switch para definir la clase para la celda prioridad
  obtenerClaseDePrioridad(prioridad: string) {
    switch (prioridad) {
      case 'Crítica':
        return 'critica';
      case 'Alta':
        return 'alta';
      case 'Media':
        return 'media';
      case 'Baja':
        return 'baja';
      default:
        return 'baja';
    }
  }

  //Cambiamos el contenido que se muestra para proyectar el formunario de búsqueda
  mostrarFormularioBusqueda() {
    this.ticketsService.mostrarFormularioBusqueda();
  }
  //Cambiamos el contenido que se muestra para proyectar el formunario de nuevo ticket
  mostrarFormularioNuevo() {
    this.ticketsService.mostrarFormularioNuevo();
  }

  mostrarTicket(ticket: Ticket) {
    this.ticketsService.mostrarTicket(ticket);
  }
  //FUncione para actualizar los tickets con la bbdd sin recargar la pagina
  //Traemos la imagen para el efecto de rotar
  @ViewChild('imagenRecarga') imagenRecarga!: ElementRef;
  actualizarTickets() {
    // Obtener la imagen
    const img = this.imagenRecarga.nativeElement;

    // Agregar clase css que gira la imagen 90º rotar
    img.classList.add('rotar');

    // timeout para que vuevla a su posicion original
    setTimeout(() => {
      img.classList.remove('rotar');
    }, 300);

    this.ticketsService.cargarTickets();
  }
}
