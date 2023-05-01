import { ServiceBasicos } from "./ServiceBasicos";

export class IngredientesService extends ServiceBasicos{
    url = "http://localhost:8080/ingrediente";

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