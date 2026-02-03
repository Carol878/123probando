import { Grupo } from "./grupo.model";
import { Rol } from "./rol.model";

export interface Usuario {
  username: string;
  nombre: string;
  email: string;
  rol: Rol[];
  grupo: Grupo;
}
