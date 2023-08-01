import { PageProyeccionHistorialPedido } from "../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente";
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

  async getRankingClientes(page: number = 0, size: number = 3):  Promise<PageProyeccionHistorialPedido> {
    try {
      const parametros = `?page=${page}&size=${size}`;
      const res = await fetch(`${this.url}/totalPedidos${parametros}`);

      if (!res.ok) {
        const respuesta: ExcepcionesVerificaUsuario = await res.json();
        throw respuesta;
      }
      const jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.errorStatus}: ${err.msj}`);
      return err;
    }
  }
}
