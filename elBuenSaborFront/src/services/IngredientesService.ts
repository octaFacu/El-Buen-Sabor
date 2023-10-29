import IngredienteDeProducto from "../context/interfaces/IngredienteDeProducto";
import { ServiceBasicos } from "./ServiceBasicos";

export class IngredientesService extends ServiceBasicos{
    url = "http://localhost:8080/ingrediente";

    constructor() {
        super("ingrediente");
      }

    //Trae todas categorias de ingrediente que no tengan padre
    async getByCategoriaId(categoriaid: Number, rol: string) {

        try {

            let res = await fetch(this.url + "/porCategoria/"+ categoriaid, {
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

    async getCosto(ingrediente: IngredienteDeProducto, rol: string) {

        try {

            let res = await fetch(this.url + "/costo", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  'X-Role': rol
                },
                body: JSON.stringify(ingrediente),
              });
        

            if (!res.ok) {
                throw { status: res.status, statusText: res.statusText }
            }

            console.log("COSTO "+res.json())
            let jsonRes = await res.json()
            return jsonRes

        } catch (err: any) {
            console.log(`Error ${err.status}: ${err.statusText}`);
        }
    }

}