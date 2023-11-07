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


}