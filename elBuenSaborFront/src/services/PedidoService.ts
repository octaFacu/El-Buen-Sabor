import { ServiceBasicos } from "./ServiceBasicos";
export class pedidoService extends ServiceBasicos {
  url = "http://localhost:8080/pedido";

  constructor() {
    super("pedido");
  }


  async getProductosPedido(pedidoId: number){
    try {
      let res = await fetch(this.url + "/producto/" + pedidoId);

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
