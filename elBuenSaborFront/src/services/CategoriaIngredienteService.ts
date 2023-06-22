import { Rubro } from "../components/compIngrediente/Rubro"
import { ServiceBasicos } from "../../../../../Programación - S4/Laboratorio de Computación IV/importante/parcialN1-LabIV/src/services/ServiceBasicos"

export class CategoriaIngredienteService extends ServiceBasicos{
    
    url = "http://localhost:8080/categoriaIngrediente"

    constructor() {
        super("categoriaIngrediente");
      }

    //Trae todas categorias de ingrediente que no tengan padre
    async getAllPadres() {

        try {

            let res = await fetch(this.url + "/padres")

            if (!res.ok) {
                throw { status: res.status, statusText: res.statusText }
            }

            let jsonRes = await res.json()
            return jsonRes

        } catch (err: any) {
            console.log(`Error ${err.status}: ${err.statusText}`);
        }
    }

    //Trae todas categorias de ingrediente que no tengan padre
    async getAllPadresConHijos() {

        try {

            let res = await fetch(this.url + "/padresConHijos")

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