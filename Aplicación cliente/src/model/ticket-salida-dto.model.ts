import { Grupo } from "./grupo.model";
import { Usuario } from "./usuario.model";


// Interface base con campos comunes
export interface TicketSalidaDto {
  idTicket: string;
  categoriaTicket: string;
  titulo: string;
  descripcion: string;
  fechaApertura: Date | string | null;
  fechaCierre?: Date | string | null;
  abiertoPorUsername: Usuario  | string;
  asignatarioUsername?: Usuario | string;
  estado: string;
  areaAfectada: string;
  comentarioCierre?: string;
  tipoCierre?: string;
  prioridad: string;
  grupoId: Grupo | number;
  codigoTicket: string;
}

// Tipo de dato específico que herada de ticket base para cada tipo de ticket
export interface IncidenciaSalidaDto extends TicketSalidaDto {
    fechaLimite?: Date | string | null;
}

export interface PeticionSalidaDto extends TicketSalidaDto {
    fechaLimite?: Date | string | null;
}

export interface ProblemaSalidaDto extends TicketSalidaDto {
  causa?: string;
  solucionTemporal?: string;
  solucionPermanente?: string;
  fechaLimite?: Date | string | null;
}

export interface CambioSalidaDto extends TicketSalidaDto {
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
export type Ticket = IncidenciaSalidaDto | PeticionSalidaDto | ProblemaSalidaDto | CambioSalidaDto;
