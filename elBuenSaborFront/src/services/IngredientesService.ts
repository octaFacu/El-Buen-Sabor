import IngredienteDeProducto from "../context/interfaces/IngredienteDeProducto";
import { ServiceBasicos } from "./ServiceBasicos";

export class IngredientesService extends ServiceBasicos{
    url = "http://localhost:8080/ingrediente";

    constructor() {
        super("ingrediente");
      }

    //Trae todas categorias de ingrediente que no tengan padre
    async getByCategoriaId(categoriaid: Number) {

        try {

            let res = await fetch(this.url + "/porCategoria/"+ categoriaid)

            if (!res.ok) {
                throw { status: res.status, statusText: res.statusText }
            }

            let jsonRes = await res.json()
            return jsonRes

        } catch (err: any) {
            console.log(`Error ${err.status}: ${err.statusText}`);
        }
    }

    async getCosto(ingrediente: IngredienteDeProducto) {

        try {

            let res = await fetch(this.url + "/costo", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
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