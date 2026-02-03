import { Grupo } from '../../../../model/grupo.model';
import { Usuario } from '../../../../model/usuario.model';

// Interface base con campos comunes
export interface TicketBase {
  idTicket: string;
  categoriaTicket: string;
  titulo: string;
  descripcion: string;
  fechaApertura: Date | string;
  fechaCierre?: Date | string;
  abiertoPor: Usuario;
  asignatario?: Usuario;
  estado: string;
  areaAfectada: string;
  comentarioCierre?: string;
  tipoCierre?: string;
  prioridad: string;
  grupo: Grupo;
  codigoTicket: string;
}

// Tipo de dato específico que herada de ticket base para cada tipo de ticket
export interface Incidencia extends TicketBase {
  fechaLimite?: Date | string;
}

export interface Peticion extends TicketBase {
  fechaLimite?: Date | string;
}

export interface Problema extends TicketBase {
  fechaLimite?: Date | string;
  causa?: string;
  solucionTemporal?: string;
  solucionPermanente?: string;
}

export interface Cambio extends TicketBase {
  categoriaCambio?: string; // estandar, normal, emergencia*/
  planImplementacion?: string;
  planMarchaAtras?: string;
  inicioImplementacionProgramado?: Date | string;
  finImplementacionProgramado?: Date | string;
  inicioImplementacionReal?: Date | string;
  finImplementacionReal?: Date | string;
  efectoNoImplementar?: string;
}

// Union Type ara crear todos los tickets como "ticket" y castear al tipo que queremos con "as $tipo"
export type Ticket = Incidencia | Peticion | Problema | Cambio;
