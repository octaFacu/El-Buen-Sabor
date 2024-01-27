import { RequestDataMP } from "../context/interfaces/interfaces";
import { ServiceBasicos } from "./ServiceBasicos";

export class MercadoPagoService extends ServiceBasicos {
    url = "http://localhost:8080/mp";

    constructor() {
        super("mp");
    }


    async getPreferenceId(requestData: RequestDataMP) {
        try {
            const res = await fetch("http://localhost:8080/mp/checkout", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    requestData
                )
            })

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