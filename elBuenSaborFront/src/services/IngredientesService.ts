import { ServiceBasicos } from "../../../../../Programación - S4/Laboratorio de Computación IV/importante/parcialN1-LabIV/src/services/ServiceBasicos";

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

}