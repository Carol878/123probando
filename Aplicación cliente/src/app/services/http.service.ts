import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { type Ticket } from '../components/cuerpo/tickets/ticket.model';
import { AppService } from './app.service';
import { UsuarioSalidaDto } from '../../model/usuario-salida-dto.model';
import { Usuario } from '../../model/usuario.model';
import { Grupo } from '../../model/grupo.model';
import { TicketsService } from './tickets.service';
import { TicketSalidaDto } from '../../model/ticket-salida-dto.model';
import { ActividadIncidencia } from '../../model/actividad-incidencia.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private url = 'http://localhost:9000';
  private http = inject(HttpClient);

  //Inyenctamos el servicio app para sacar el usuario de conexion

  private appService = inject(AppService);

  // Ya no nos hace falta en principio:
  // private usuarioSalida = signal<UsuarioSalidaDto>({
  //   username: this.appService.getUsername()(),
  //   password: this.appService.getPassword()(),
  // });

  // private username = this.appService.getUsername();
  // private password = this.appService.getPassword();

  cargarProductos() {
    const headers = this.contruirToken();
    return this.http.get<Ticket[]>(this.url + '/tickets/all', { headers });
  }

  cargarGrupos() {
    const headers = this.contruirToken();
    return this.http.get<Grupo[]>(this.url + '/grupos/all', { headers });
  }

  cargarUsuarios(grupo: Grupo) {
    const body = {
      idGrupo: grupo.idGrupo,
      nombreGrupo: grupo.nombreGrupo,
    };
    const headers = this.contruirToken();
    return this.http.post<Usuario[]>(this.url + '/usuarios/grupo', body, { headers });
  }

  // Metodo para crear tickets (Cambios, Incidencias, etc.)
  crearTicket(endpoint: string, ticket: any) {
    const headers = this.contruirToken(); // Añadimos seguridad
    return this.http.post(this.url + '/tickets/' + endpoint, ticket, { headers });
  }

  contruirToken() {
    const basicToken = btoa(
      `${this.appService.getUsername()()}:${this.appService.getPassword()()}`
    );

    return new HttpHeaders({ Authorization: `Basic ${basicToken}` });
  }

  realizarInicioSesion() {
    const body = {
      username: this.appService.getUsername()(),
      password: this.appService.getPassword()(),
    };

    const observable = this.http.post<Usuario | undefined>(this.url + '/login', body);

    observable.subscribe({
      next: (usuarioValido) => {
        if (usuarioValido) {
          this.appService.setLogeado(true);
          this.appService.setUsuarioValido(usuarioValido!);
        }
      },
      error: (error) => {
        console.log('Usuario o contraseña no validas');
        this.appService.setIntentoFallido(true);
        console.log(this.appService.getIntentoFallido()());

      },
    });
  }

  actualizarTicket(ticket: TicketSalidaDto) {
    const body = ticket;
    const headers = this.contruirToken();
    return this.http.put<Ticket>(this.url + '/tickets/incidencias/actualizar-uno', body, { headers });
  }

 buscarUnGrupo(idGrupo: number) {
    const headers = this.contruirToken();
    return this.http.post<Grupo>(this.url + '/grupos/uno', idGrupo, { headers });
  }

  buscarUnUsuario(username: string) {
    const headers = this.contruirToken();
    return this.http.post<Usuario>(this.url + '/usuarios/uno', username, { headers });
  }

  buscarActividadesIncidencia(idTicket: string) {
    const headers = this.contruirToken();
    return this.http.get<ActividadIncidencia[]>(this.url + `/tickets/incidencias/${idTicket}/actividades`, { headers });
  }
}
