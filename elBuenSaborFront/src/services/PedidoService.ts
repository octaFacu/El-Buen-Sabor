import Pedido from "../context/interfaces/Pedido";
import Producto from "../context/interfaces/Producto";
import { ProyeccionDatosFactura } from "../context/interfaces/Proyecciones/ProyeccionDatosFactura";
import { RequestPedido } from "../context/interfaces/interfaces";
import { FacturaService } from "./FacturaService";
import { ServiceBasicos } from "./ServiceBasicos";
export class pedidoService extends ServiceBasicos {
  url = "http://localhost:8080/pedido";

  constructor() {
    super("pedido");
  }


  async getProductosPedido(pedidoId: number, rol: string) {
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


    try {

      let res = await fetch(this.url + "/estado/" + estado, {
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




  async getByDelivery(idDelivery: string, rol: string) {

    try {

      let res = await fetch(this.url + "/delivery/" + idDelivery, {
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

    console.log("LOS PRODUCTOS DE ESTE PEDIDO: " + idPedido);

    try {

      let res = await fetch(this.url + "/productos/" + idPedido, {
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


  async createPedidoAndPedidoHasProducto(pedido: RequestPedido, rol: string) {
    try {
      let res = await fetch(this.url + "/createPedidoAndProducto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
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



  async getDatosFacturas(idPedido: number, rol: string) {
    try {
      let res = await fetch(this.url + "/getDatoFactura/" + idPedido, {
        method: "GET",
        headers: {
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

  async updateEntity(datos: Pedido, rol: string) {
    try {
      //Pasarle a la direccion con un put la info
      let res = await fetch(
        this.url + `/${datos.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'X-Role': rol
          },
          body: JSON.stringify(datos),
        }
      );

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();


      //Si es pagado en efectivo y fue entregado
      if (datos.estado == "Entregado") {
        let fc: ProyeccionDatosFactura = await this.getDatosFacturas(datos.id!, rol);

        let serviceFC = new FacturaService();

        //Crear factura si no existe
        if (fc == null || fc == undefined) {
          fc = await serviceFC.createFactura(datos, rol);
        }

        serviceFC.generarFCPDF(fc.id, rol);

      }

      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }

  async validoStockPedido(pedido: RequestPedido, rol: string) {
    try {
      let res = await fetch(this.url + "/validoStockPedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
        },
        body: JSON.stringify(pedido),
      });

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }
      
      let jsonRes = await res.json().then(res => res);
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }



}