import { Usuario } from "./interfaces";

export class Cliente{
    id: number = 0;
    usuario: Usuario = {  id: '',
        nombre: '',
        apellido: '',
        telefono: '',
        activo: true};
  }