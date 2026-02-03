import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { type Ticket } from '../components/cuerpo/tickets/ticket.model';
import { HttpService } from './http.service';
import { Usuario } from '../../model/usuario.model';
import { AppService } from './app.service';
import { Grupo } from '../../model/grupo.model';
import { TicketSalidaDto } from '../../model/ticket-salida-dto.model';
import { ActividadIncidencia } from '../../model/actividad-incidencia.model';

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

  //Creamos esta variable para corta la subcripción cuando finalice. En este caso va a estar escuchando siempre pero es una buena práctica.
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.cargarTickets();
    const intervalo = setInterval(() =>{ if (this.appService.getLogeado()()){this.cargarTickets()}},10000);
    this.destroyRef.onDestroy(() => clearInterval(intervalo));
  }

  cargarTickets() {
    const subscripcion = this.httpService.cargarProductos().subscribe((datos) => {
      // Guardamos todos
      this.ticketsAll.set(datos);
      console.log(this.ticketsAll());

      // Aplicamos el filtro inicial
      this.ticketsFiltrados.set(
        datos.filter(
          (ticket) =>
            ticket.estado !== 'Cerrado' &&
            ticket.grupo?.idGrupo === this.appService.getUsuarioValido()()?.grupo?.idGrupo
        )
      );
    });
    this.destroyRef.onDestroy(() => subscripcion.unsubscribe());
  }

  //Creamos una variable para gestionar el contenido que se muestra en el body:
  private proyeccion = signal<'tickets' | 'form-busqueda' | 'form-nuevo' | 'ticket'>('tickets');

  //variable para almacenar el ticket que se ha clickado
  private visualizarTicket = signal<Ticket | undefined>(undefined);

  //variable para alamacen actividades de tickets seleccionado

  private actividadesTicket = signal<ActividadIncidencia[] | undefined>(undefined);

  // Configuramos un get para obtener el valor privado
  getVisualizarTicket() {
    return this.visualizarTicket();
  }

  // Configuramos un get para obtener el valor privado
  getActividadesTicket() {
    return this.actividadesTicket.asReadonly();
  }

  private ticketActualizado = signal<Ticket | undefined>(this.getVisualizarTicket());


  getTicketActualizado() {
    return this.ticketActualizado.asReadonly();
  }



  actualizarTicket(nuevoTicket: TicketSalidaDto) {
    this.httpService.actualizarTicket(nuevoTicket).subscribe((ticket) => {
      next: this.ticketActualizado.set(ticket);
      this.cargarTickets();
    });
    
  }

  // Configuramos un get para obtener el valor privado
  getTickets() {
    return this.ticketsFiltrados();
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
    
    const subscripcion = this.httpService.buscarActividadesIncidencia(ticket.idTicket).subscribe((actividades) => {next: this.actividadesTicket.set(actividades);
      console.log(this.actividadesTicket())
    })
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
      obj
    );

    return claveDeOrden;
  }

  // Ordenar ascendente implementando el metodo propio de sacarValorAnidado y usando localcompare que devuelve  -1,0 o 1
  ordenarFilasAscendente(rutaDeVariable: string) {
    const ordenados = [...this.ticketsFiltrados()].sort((a, b) => {
      const primerValor = this.sacarValorAnidado(a, rutaDeVariable);
      const segundoValor = this.sacarValorAnidado(b, rutaDeVariable);
      return String(primerValor).localeCompare(String(segundoValor));
    });
    this.ticketsFiltrados.set(ordenados);
  }

  // Ordenar descendente
  ordenarFilasDescendente(claveDeOrden: string) {
    const ordenados = [...this.ticketsFiltrados()].sort((a, b) => {
      const primerValor = this.sacarValorAnidado(a, claveDeOrden);
      const segundoValor = this.sacarValorAnidado(b, claveDeOrden);
      return String(segundoValor).localeCompare(String(primerValor));
    });
    this.ticketsFiltrados.set(ordenados);
  }
  // Crear Ticket
  crearTicket(nuevoTicket: Ticket) {
    // Actualizamos la señal añadiendo el nuevo ticket al array existente
    this.ticketsAll.update((tickets) => [nuevoTicket, ...tickets]);
    this.ticketsFiltrados.update((tickets) => [nuevoTicket, ...tickets]); //Para actualizar también la lista filtrada
    // Opcional: Volver a la lista de tickets después de crear
    this.mostrarTickets();
  }

  // Función de búsqueda de tickets: ---
  filtrarTickets(filtros: any) {
    // 1. Obtenemos el valor actual de todos los tickets usando los paréntesis ()
    const todos = this.ticketsAll();

    // 2. Aplicamos el filtro sobre el array original
    const resultado = todos.filter((ticket) => {
      // Filtro de Título (insensible a mayúsculas)
      const cumpleTitulo =
        !filtros.titulo || ticket.titulo.toLowerCase().includes(filtros.titulo.toLowerCase());

      // ME DA ERROR PORQUE EN LA INTERFAZ DE TICKET NO HAY CATEGORIA
      // Filtro de Categoría (comparación directa)
      //const cumpleCategoria = !filtros.categoria ||
      //  ticket.categoria === filtros.categoria;

      // Filtro de Prioridad
      const cumplePrioridad = !filtros.prioridad || ticket.prioridad === filtros.prioridad;

      // Filtro de Área (insensible a mayúsculas)
      const cumpleArea =
        !filtros.areaAfectada ||
        ticket.areaAfectada.toLowerCase().includes(filtros.areaAfectada.toLowerCase());

      // Si cumple todos los filtros activos, devolvemos true
      return cumpleTitulo && /*cumpleCategoria &&*/ cumplePrioridad && cumpleArea;
    });

    // 3. Actualizamos la señal 'ticketsFiltrados' con el nuevo valor
    // Esto hará que la tabla en el HTML se actualice mágicamente al instante
    this.ticketsFiltrados.set(resultado);
  }

  buscarUnGrupo(idGrupo: number) {
    return this.httpService.buscarUnGrupo(idGrupo);
  }
  buscarUnUsuario(username: string) {
    return this.httpService.buscarUnUsuario(username);
  }
}
