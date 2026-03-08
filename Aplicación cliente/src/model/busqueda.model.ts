export interface Busqueda {
  texto?: string ;
  idTicket?: string;
  abiertoPor?: string;
  areaAfectada?: string;
  fechaApertura?: Date;
  fechaCierre?: Date;
  fechaLimite?: Date;
  grupo?: number;
  prioridad?: string;
  estado?: string;
  tipoCierre?: string;
}
