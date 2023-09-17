import { Usuario } from "./interfaces";

export class Cliente {
    idCliente: number = 0;
    activo: boolean = true;
    usuario: Usuario = {
        id: '',
        nombre: '',
        apellido: '',
        telefono: '',
        activo: true
    };
}