import { PageProyeccionHistorialPedido, ProyeccionHistorialPedido } from "../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente";
import { ProyeccionPedidoUsuario } from "../context/interfaces/Proyecciones/ProyeccionPedidoUsuario";
import { ExcepcionesVerificaUsuario } from "../context/interfaces/interfaces";
import { ServiceBasicos } from "./ServiceBasicos";
export class ClienteService extends ServiceBasicos {
  url = "http://localhost:8080/cliente";

  constructor() {
    super("cliente");
  }


  async getIdCliente(usuarioId: string) {
    try {
      let res = await fetch(this.url + "/v1/" + usuarioId);

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }


  async getPedidosUsuario(clienteId: number, page: number = 0, size: number = 1, fechaInicio: Date | null = null, fechaFin: Date | null = null): Promise<PageProyeccionHistorialPedido<ProyeccionPedidoUsuario>> {
    try {
      let parametros = `?page=${page}&size=${size}`;
      if (fechaInicio !== null && fechaFin !== null) {
        parametros += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }
      const res = await fetch(`${this.url}/historialPedidos/${clienteId}${parametros}`);

      if (!res.ok) {
        const respuesta: ExcepcionesVerificaUsuario = await res.json();
        throw respuesta;
      }

      const jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      return err;
    }
  }


  async getRankingClientes(page: number = 0, size: number = 3, orderBy: string = 'importe_total', direccion: string = 'desc'): Promise<PageProyeccionHistorialPedido<ProyeccionHistorialPedido>> {
    try {
      const parametros = `?page=${page}&size=${size}&orderBy=${orderBy}&direccion=${direccion}`;
      const res = await fetch(`${this.url}/totalPedidos${parametros}`);

      if (!res.ok) {
        const respuesta: ExcepcionesVerificaUsuario = await res.json();
        throw respuesta;
      }
      const jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      return err;
    }
  }

  async getRankingClientess(
    page: number = 0,
    size: number = 3,
    orderBy: string = 'id_cliente',
    direccion: string = 'desc',
    fechaInicio: Date | null = null,
    fechaFin: Date | null = null
  ): Promise<PageProyeccionHistorialPedido<ProyeccionHistorialPedido>> {
    try {
      let parametros = `?page=${page}&size=${size}&campoOrden=${orderBy}&direccionOrden=${direccion}`;

      if (fechaInicio !== null && fechaFin !== null) {
        parametros += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      const res = await fetch(`${this.url}/obtener-estadisticas-pedido${parametros}`);

      if (!res.ok) {
        const respuesta: ExcepcionesVerificaUsuario = await res.json();
        throw respuesta;
      }

      const jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      return err;
    }
  }

  async getClienteByUsuarioId(usuarioId: string){

    try {
      let res = await fetch(this.url + "/clienteXUsuarioId/" + usuarioId);

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }

  }
  


}
