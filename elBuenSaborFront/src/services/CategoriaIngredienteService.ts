import { Rubro } from "../components/compIngrediente/Rubro"
import { ServiceBasicos } from "./ServiceBasicos";

export class CategoriaIngredienteService extends ServiceBasicos{
    
    url = "http://localhost:8080/categoriaIngrediente"

    constructor() {
        super("categoriaIngrediente");
      }

    //Trae todas categorias de ingrediente que no tengan padre
    async getAllPadres(rol: string) {

        try {

            let res = await fetch(this.url + "/padres", {
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

    //Trae todas categorias de ingrediente que no tengan padre
    async getAllPadresConHijos(rol: string) {

        try {

            let res = await fetch(this.url + "/padresConHijos", {
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


}