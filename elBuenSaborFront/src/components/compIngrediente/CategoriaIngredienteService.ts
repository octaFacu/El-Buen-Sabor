import { Rubro } from "./Rubro"

export  class CategoriaIngredienteService{
    
    baseUrl = "http://localhost:8080/categoria"

    //Trae todas categorias de ingrediente
    async getAll() {

        try {

            let res = await fetch(this.baseUrl)

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
    async getAllPadres() {

        try {

            let res = await fetch(this.baseUrl + "/padres")

            if (!res.ok) {
                throw { status: res.status, statusText: res.statusText }
            }

            let jsonRes = await res.json()
            return jsonRes

        } catch (err: any) {
            console.log(`Error ${err.status}: ${err.statusText}`);
        }
    }

    // Metodo para hacer update a una Categoria
    async updateActivoRubro(datos: Rubro) {



        try {

            //Pasarle a la direccion con un put la info
            let res = await fetch(this.baseUrl + `/${datos.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos)
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

    async createRubro(datos: {}) {

        console.log("IMPORTANTE")
        console.log(datos)

        try {


            let res = await fetch(this.baseUrl,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos)
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