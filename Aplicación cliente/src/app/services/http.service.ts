import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { type Ticket } from '../components/cuerpo/tickets/ticket.model';
import { AppService } from './app.service';
import { Usuario } from '../../model/usuario.model';
import { Grupo } from '../../model/grupo.model';
import { TicketSalidaDto } from '../../model/ticket-salida-dto.model';
import { ActividadIncidencia } from '../../model/actividad-incidencia.model';
import { ActividadIncidenciaDto } from '../../model/actividad-incidencia-dto.model';
import { Busqueda } from '../../model/busqueda.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private url = 'http://localhost:9000';
  private http = inject(HttpClient);
  private appService = inject(AppService);

  cargarProductos() {
    return this.http.get<Ticket[]>(this.url + '/tickets/all');
  }

  cargarGrupos() {
    return this.http.get<Grupo[]>(this.url + '/grupos/all');
  }

  cargarUsuarios(grupoId: number) {
    return this.http.get<Usuario[]>(this.url + '/usuarios/grupo/' + grupoId);
  }

  //A este metodo lo llama el panel de login y lo que hace es cargar la info en el appservice
  realizarInicioSesion(username: string, password: string) {
  //crea el body con lo parametros del formulario
  const body = { username, password };
  // y realiza el post a /login y almacena la respuesta, si esta mal registra el rintento fallido en el appservice
  this.http.post<{ token: string; usuario: Usuario }>(this.url + '/login', body)
    .subscribe({
      next: (respuesta) => {
        if (respuesta.token) {
          this.appService.setToken(respuesta.token);
          this.appService.setUsuarioValido(respuesta.usuario);
          this.appService.setLogeado(true);
        }
      },
      error: (error) => {
        console.log('Usuario o contraseña no válidas');
        this.appService.setIntentoFallido(true);
      },
    });
}

  actualizarTicket(ticket: TicketSalidaDto) {
    return this.http.put<Ticket>(this.url + '/tickets/incidencias/actualizar-uno', ticket);
  }

  crearTicket(ticket: TicketSalidaDto) {
    return this.http.post<Ticket>(this.url + '/tickets/incidencias/', ticket);
  }

  busquedaAvanzada(parametrosBusqueda: Busqueda) {
    return this.http.post<Ticket[]>(this.url + '/tickets/incidencias/busqueda-avanzada', parametrosBusqueda);
  }

  anadirComentarioATicket(nuevaActividad: ActividadIncidenciaDto) {
    return this.http.post<ActividadIncidencia>(this.url + '/tickets/incidencias/nueva-actividad', nuevaActividad);
  }

  buscarUnGrupo(idGrupo: number) {
    return this.http.post<Grupo>(this.url + '/grupos/uno', idGrupo);
  }

  buscarUnUsuario(username: string) {
    return this.http.post<Usuario>(this.url + '/usuarios/uno', username);
  }

  buscarActividadesIncidencia(idTicket: number) {
    return this.http.get<ActividadIncidencia[]>(this.url + `/tickets/incidencias/${idTicket}/actividades`);
  }
}
