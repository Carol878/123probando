import { DestroyRef, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { Incidencia, type Ticket } from '../components/cuerpo/tickets/ticket.model';
import { HttpService } from './http.service';
import { Usuario } from '../../model/usuario.model';
import { AppService } from './app.service';
import { Grupo } from '../../model/grupo.model';
import { TicketSalidaDto } from '../../model/ticket-salida-dto.model';
import { ActividadIncidencia } from '../../model/actividad-incidencia.model';
import { TimestampProvider, OperatorFunction, Timestamp } from 'rxjs';
import { ActividadIncidenciaDto } from '../../model/actividad-incidencia-dto.model';
import { Busqueda } from '../../model/busqueda.model';

// Decoramos la clase como inyectable para poder crear una sola instancia de la misma en todos los componenete y que comparatn la información.
// El valor root significar que lo añada al apartado root del arbol de inyecciones de Angular.
@Injectable({ providedIn: 'root' })
export class TicketsService {
  //Variable tipo signal que define el tipo de ticket que se muestra. Es de tipo string pero se podría limitar con los tipos y el operador "|"
  private tipoDeTicketVisible = signal<string>('todos');

  //Inyenctamos el servicio app para sacar el usuario de conexion

  private appService = inject(AppService);

  //Inyectamos el servicio HTTP
  private httpService = inject(HttpService);

  //Creamos la variable ticketsAll y tickets filtrados para poder aplicar y deshacer filtros
  private ticketsAll = signal<Ticket[]>([]);
  private ticketsFiltrados = signal<Ticket[]>([]);
  private ticketsAbiertos = signal<Ticket[]>([]);
  private ticketsBuscados = signal<Ticket[]>([]);

  //Creamos esta variable para corta la subcripción cuando finalice. En este caso va a estar escuchando siempre pero es una buena práctica.
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.cargarTickets();
    const intervalo = setInterval(() => {
      if (this.appService.getLogeado()()) {
        this.cargarTickets();
      }
    }, 10000);
    this.destroyRef.onDestroy(() => clearInterval(intervalo));
  }

  cargarTickets() {
    const subscripcion = this.httpService.cargarProductos().subscribe((datos) => {
      // 1. Guardamos la fuente de verdad actualizada
      this.ticketsAll.set(datos);
      console.log('Datos recargados', this.ticketsAll());

      this.ticketsFiltrados.set(
        datos.filter(
          (ticket) =>
            ticket.estado !== 'Cerrado' &&
            ticket.grupo?.idGrupo === this.appService.getUsuarioValido()()?.grupo?.idGrupo,
        ),
      );

      // 3. Actualizamos siempre la lista de tickets "Abiertos por mí" (independiente de la búsqueda)
      this.ticketsAbiertos.set(
        datos.filter(
          (ticket) =>
            ticket.estado !== 'Cerrado' &&
            ticket.abiertoPor?.username === this.appService.getUsuarioValido()()?.username,
        ),
      );
    });
    this.destroyRef.onDestroy(() => subscripcion.unsubscribe());
  }

  //Creamos una variable para gestionar el contenido que se muestra en el body:
  private proyeccion = signal<'tickets' | 'form-busqueda' | 'form-nuevo' | 'ticket'>('tickets');

  //variable para almacenar el ticket que se ha clickado
  private visualizarTicket = signal<Ticket | undefined>(undefined);

  //variable para alamacen actividades de tickets seleccionado

  private actividadesTicket = signal<ActividadIncidencia[]>([]);

  // Configuramos un get para obtener el valor privado
  getVisualizarTicket() {
    return this.visualizarTicket();
  }
  getVisualizarTicketSignal() {
    return this.visualizarTicket.asReadonly();
  }

  // Configuramos un get para obtener el valor privado
  getActividadesTicket() {
    return this.actividadesTicket.asReadonly();
  }

  //funcion para que se borren las actividades cuando se sale de el
  setActividadesTicket() {
    this.actividadesTicket.set([]);
  }

  anadirComentarioATicket(nuevaActividad: ActividadIncidenciaDto) {
    this.httpService.anadirComentarioATicket(nuevaActividad).subscribe({
      next: (actividad) => this.actividadesTicket.update((lista) => [...lista, actividad]),
    });
  }

  private ticketActualizado = signal<Ticket | undefined>(this.getVisualizarTicket());

  getTicketActualizado() {
    return this.ticketActualizado.asReadonly();
  }

  actualizarTicket(nuevoTicket: TicketSalidaDto) {
    this.httpService.actualizarTicket(nuevoTicket).subscribe((ticket) => {
      next: this.ticketActualizado.set(ticket);
      this.visualizarTicket.set(ticket);
      this.cargarTickets();
    });
  }

  //Get para poder calcular las listas de usuarios en el buscador
  getTodosLosTickets() {
    return this.ticketsAll.asReadonly();
  }

  crearTicket(nuevoTicket: TicketSalidaDto) {
    this.httpService.crearTicket(nuevoTicket).subscribe((ticket) => {
      next: this.ticketActualizado.set(ticket);
      this.cargarTickets();
      this.visualizarTicket.set(ticket);
      this.proyeccion.set('ticket');
    });
  }

  realizarBusqueda(parametrosBusqueda: Busqueda) {
    this.httpService.busquedaAvanzada(parametrosBusqueda).subscribe((tickets) => {
      this.ticketsBuscados.set(tickets);
      this.setTipoDeTicketVisible('busqueda');
      this.proyeccion.set('tickets');
    });
  }

  crearTicketYSalir(nuevoTicket: TicketSalidaDto) {
    this.httpService.crearTicket(nuevoTicket).subscribe((ticket) => {
      next: this.ticketActualizado.set(ticket);
      this.cargarTickets();
    });
  }

  // Configuramos un get para obtener el valor privado
  getTickets() {
    return this.ticketsFiltrados();
  }

  getTicketsAbiertos() {
    return this.ticketsAbiertos();
  }

  getTicketsBuscados() {
    return this.ticketsBuscados();
  }

  // Configuramos un get para obtener el valor privado OJO, mandamos una writable signal, por lo que hay que poner asReadonly()
  getTipoDeTicketVisible() {
    return this.tipoDeTicketVisible.asReadonly();
  }

  getProyeccion() {
    return this.proyeccion.asReadonly();
  }

  setTipoDeTicketVisible(nuevoValor: string) {
    this.tipoDeTicketVisible.set(nuevoValor);

    //y hacemos que si habia un ticket seleccioando se borren las actividades para que no salgan si por ejemplo creamos un ticket nuevo.
    this.setActividadesTicket();
  }

  //Funcion a la que se llama cuando se pulsa el titulo del encabezado o alguno de los botones de "funciones", cambia el tipo de ticket que se lista en el componenete app-tickets.
  cambiarTicketVisible(nuevoTipo: string) {
    this.tipoDeTicketVisible.set(nuevoTipo);
  }

  //metodos para cambiar el contenido proyectado
  mostrarFormularioBusqueda() {
    this.proyeccion.set('form-busqueda');
  }

  mostrarFormularioNuevo() {
    this.proyeccion.set('form-nuevo');
  }

  mostrarTickets() {
    this.proyeccion.set('tickets');
  }

  mostrarTicket(ticket: Ticket) {
    this.proyeccion.set('ticket');
    this.visualizarTicket.set(ticket);
    // limpiamos la señal de ticket actualizado cuando cargamos un nuevo ticket
    this.ticketActualizado.set(undefined);

    const subscripcion = this.httpService
      .buscarActividadesIncidencia(ticket.idTicket)
      .subscribe((actividades) => {
        next: this.actividadesTicket.set(actividades);
        console.log(this.actividadesTicket());
      });
    this.destroyRef.onDestroy(() => subscripcion.unsubscribe());
  }

  // Función para obtener valores anidados, primero separamos lo que venga en la ruta por los puntos, luego con "reduce" vamos accediendo a las variables que hemos separado creando un unico valor, es decir, si tenemos asignatario.username, en la primera vuelta accedemos a asignatario y en la siguiente a username
  private sacarValorAnidado(obj: any, rutaDeVariable: string) {
    const arrayDeClaves = rutaDeVariable.split('.');

    // El ,obj del final es el valor que le damos al objeto para empezar
    //objeto empieza siendo el obj que hemos traido en los parametros y clave empieza en la posición 0 del arrayDeClaves
    //Si el objeto tiene un propiedad con ese nombre de clave entonces objeto pasa a ser la combinación del ambas obj.asignatario
    //Sino metemos en el obj una cadena vacía, si ponemos null entrariamos en un bucle con la ?.[clave]

    const claveDeOrden = arrayDeClaves.reduce(
      (objeto, clave) => (objeto ? objeto?.[clave] : ''),
      obj,
    );

    return claveDeOrden;
  }

  // Ordenar ascendente implementando el metodo propio de sacarValorAnidado y usando localcompare que devuelve  -1,0 o 1
  ordenarFilasAscendente(rutaDeVariable: string) {
    if (this.tipoDeTicketVisible() == 'abiertas') {
      const ordenados = [...this.ticketsAbiertos()].sort((a, b) => {
        const primerValor = this.sacarValorAnidado(a, rutaDeVariable);
        const segundoValor = this.sacarValorAnidado(b, rutaDeVariable);
        return String(primerValor).localeCompare(String(segundoValor));
      });
      this.ticketsAbiertos.set(ordenados);
    } if (this.tipoDeTicketVisible() == 'busqueda') {
      const ordenados = [...this.ticketsBuscados()].sort((a, b) => {
        const primerValor = this.sacarValorAnidado(a, rutaDeVariable);
        const segundoValor = this.sacarValorAnidado(b, rutaDeVariable);
        return String(primerValor).localeCompare(String(segundoValor));
      });
      this.ticketsBuscados.set(ordenados);
    }else {
      const ordenados = [...this.ticketsFiltrados()].sort((a, b) => {
        const primerValor = this.sacarValorAnidado(a, rutaDeVariable);
        const segundoValor = this.sacarValorAnidado(b, rutaDeVariable);
        return String(primerValor).localeCompare(String(segundoValor));
      });
      this.ticketsFiltrados.set(ordenados);
    }
  }

  // Ordenar descendente
  ordenarFilasDescendente(claveDeOrden: string) {
    if (this.tipoDeTicketVisible() == 'abiertas') {
      const ordenados = [...this.ticketsAbiertos()].sort((a, b) => {
        const primerValor = this.sacarValorAnidado(a, claveDeOrden);
        const segundoValor = this.sacarValorAnidado(b, claveDeOrden);
        return String(segundoValor).localeCompare(String(primerValor));
      });
      this.ticketsAbiertos.set(ordenados);
    }
    if (this.tipoDeTicketVisible() == 'busqueda') {
      const ordenados = [...this.ticketsBuscados()].sort((a, b) => {
        const primerValor = this.sacarValorAnidado(a, claveDeOrden);
        const segundoValor = this.sacarValorAnidado(b, claveDeOrden);
        return String(segundoValor).localeCompare(String(primerValor));
      });
      this.ticketsBuscados.set(ordenados);
    } else {
      const ordenados = [...this.ticketsFiltrados()].sort((a, b) => {
        const primerValor = this.sacarValorAnidado(a, claveDeOrden);
        const segundoValor = this.sacarValorAnidado(b, claveDeOrden);
        return String(segundoValor).localeCompare(String(primerValor));
      });
      this.ticketsFiltrados.set(ordenados);
    }
  }
}
