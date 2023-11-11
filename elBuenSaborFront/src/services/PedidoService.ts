import { RequestPedido } from "../context/interfaces/interfaces";
import { ServiceBasicos } from "./ServiceBasicos";
export class pedidoService extends ServiceBasicos {
  url = "http://localhost:8080/pedido";

  constructor() {
    super("pedido");
  }


  async getProductosPedido(pedidoId: number, rol: string){
    try {
      let res = await fetch(this.url + "/producto/" + pedidoId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
        },
      });

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }

  //Trae todas categorias de ingrediente que no tengan padre
  async getByEstado(estado: string, rol: string) {


    try {

        let res = await fetch(this.url + "/estado/"+ estado, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'X-Role': rol
          },
        })

      let jsonRes = await res.json();
      return jsonRes;
      

    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }

async getProductosByPedido(idPedido: number, rol: string) {

    console.log("LOS PRODUCTOS DE ESTE PEDIDO: "+ idPedido);

    try {

        let res = await fetch(this.url + "/productos/"+ idPedido, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'X-Role': rol
          },
        });

        if (!res.ok) {
            throw { status: res.status, statusText: res.statusText }
        }

        let jsonRes = await res.json();
        return jsonRes;

    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }
  

  async createPedidoAndPedidoHasProducto(pedido: RequestPedido) {
    try {
      let res = await fetch(this.url + "/createPedidoAndProducto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }



  async getDatosFacturas(idPedido: number) {
    try {
      let res = await fetch(this.url + "/getDatoFactura/" + idPedido);

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