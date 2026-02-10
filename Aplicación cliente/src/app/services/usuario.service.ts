import { computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { Grupo } from '../../model/grupo.model';
import { HttpService } from './http.service';
import { Usuario } from '../../model/usuario.model';
import { TicketsService } from './tickets.service';

// Decoramos la clase como inyectable para poder crear una sola instancia de la misma en todos los componenete y que comparatn la información.
// El valor root significar que lo añada al apartado root del arbol de inyecciones de Angular.
@Injectable({ providedIn: 'root' })
export class UsuarioService {
  //Creamos la variable donde almacenaremos los grupos que recibamos de la api
  private usuarios = signal<Usuario[] | undefined>(undefined);

  //Inyectamos el servicio HTTP
  private httpService = inject(HttpService);

  // Inyectamos nuestro servicio para mandarle el gurpo a la api
    private ticketsService = inject(TicketsService);

  //Creamos esta variable para corta la subcripción cuando finalice. En este caso va a estar escuchando siempre pero es una buena práctica.
  private destroyRef = inject(DestroyRef);

  constructor() {
    // Usar effect para reaccionar a cambios en el ticket
    effect(() => {
      const ticket = this.ticketsService.getVisualizarTicketSignal()();
      if (ticket?.grupo?.idGrupo) {
        this.cargarUsuariosPorGrupoId(ticket.grupo.idGrupo);
        console.log("asignado al grupo ", ticket.grupo.idGrupo );

      }
    });
  }

  cargarUsuariosPorGrupoId(grupoId: number) {

    const subscripcion = this.httpService.cargarUsuarios(grupoId).subscribe({
      next: (usuarios) => {
        this.usuarios.set(usuarios);
        console.log(usuarios);

      }
    });

    this.destroyRef.onDestroy(() => subscripcion.unsubscribe());
  }

  //Y las devolvemos
  getUsuarios() {
    return this.usuarios.asReadonly();
  }
}
