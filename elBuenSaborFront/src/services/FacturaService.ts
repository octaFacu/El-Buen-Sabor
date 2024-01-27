import Pedido from "../context/interfaces/Pedido";
import { Factura } from "../context/interfaces/interfaces";
import { ServiceBasicos } from "./ServiceBasicos";

export class FacturaService extends ServiceBasicos {
    url = "http://localhost:8080/factura";

    constructor() {
        super("factura");
    }

    async createFacturaMercadoPago(pedido: Factura) {
        try {
            let res = await fetch(this.url + "/createFacturaMP", {
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


    async createFactura(pedido: Pedido, rol: string) {
        try {
            let res = await fetch(this.url + "/create", {
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

    async generarFCPDF(idFactura: number, rol: string) {
        try {
          let res = await fetch(this.url +"/pdf/" + idFactura,
          {
            method: "GET",
            headers: {
              'X-Role': rol
            }
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
    
      async generarNCPDF(idFactura: number, rol: string) {
        try {
          let res = await fetch(this.url + "/notaCredito/" + idFactura,
          {
            method: "GET",
            headers: {
              'X-Role': rol
            }
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

}