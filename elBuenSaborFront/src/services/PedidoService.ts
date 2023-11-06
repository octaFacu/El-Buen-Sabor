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


  async getByEstado(estado: string, rol: string) {

    console.log("EL ESTADO QUE LE ESTOY PASANDO AL SERVICIO ES: "+ estado);

    try {

        let res = await fetch(this.url + "/estado/"+ estado, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'X-Role': rol
          },
        })

        if (!res.ok) {
            throw { status: res.status, statusText: res.statusText }
        }

        let jsonRes = await res.json()
        return jsonRes

    } catch (err: any) {
        console.log(`Error ${err.status}: ${err.statusText}`);
    }
}



async getByDelivery(idDelivery: string, rol: string) {

  console.log("EL USUARIO DE DELIVERY QUE LE ESTOY PASANDO AL SERVICIO ES: "+ idDelivery);

  try {

      let res = await fetch(this.url + "/delivery/"+ idDelivery, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
        },
      })

      if (!res.ok) {
          throw { status: res.status, statusText: res.statusText }
      }

      let jsonRes = await res.json()
      return jsonRes

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

}
