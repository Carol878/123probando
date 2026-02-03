import { Ticket } from "../app/components/cuerpo/tickets/ticket.model";
import { Usuario } from "./usuario.model";

export interface ActividadIncidencia {
  id: number;
  fechaComentario: Date;
  autor: Usuario;
  comentario: string;
  incidencia: Ticket;
}
