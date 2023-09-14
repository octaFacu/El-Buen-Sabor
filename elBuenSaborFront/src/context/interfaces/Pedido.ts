import { Cliente } from "./Cliente";
import { Direccion } from "./interfaces";


export class Pedido {
  id?: number = 0;
  precioTotal: number = 0;
  estado: EstadoPedido = 0;
  activo: boolean = true;
  numeroPedidoDia: number = 0;
  esEnvio: boolean = false;
  horaEstimada: string = "";
  fechaPedido: string = "";
  cliente: Cliente = new Cliente();
  direccion?: Direccion = {
    idDireccion: 0,
    calle: '',
    nroCasa: 0,
    pisoDpto: '',
    usuario: {
      id: '',
      nombre: '',
      apellido: '',
      telefono: '',
      activo: true
    },
    activo: true
  };
}

export default Pedido;

export enum EstadoPedido {
  AConfirmar,
  EnCocina,
  Listo,
  EnDelivery,
  Entregado
}