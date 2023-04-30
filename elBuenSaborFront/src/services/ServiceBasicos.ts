export class ServiceBasicos{
    
    baseUrl = "http://localhost:8080/"

    //Trae todas categorias de ingrediente
    async getAllBasic(urlEspecifico: String) {

        try {

            let res = await fetch((this.baseUrl+urlEspecifico))

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
    async updateEntity(urlEspecifico: String, datos: any) {



        try {

            //Pasarle a la direccion con un put la info
            let res = await fetch(this.baseUrl + urlEspecifico + `/${datos.id}`,
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

    async createEntity(urlEspecifico: String, datos: {}) {

        try {


            let res = await fetch(this.baseUrl+urlEspecifico,
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