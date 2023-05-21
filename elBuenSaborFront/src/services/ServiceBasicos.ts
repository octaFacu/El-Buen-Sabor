export class ServiceBasicos {

    baseUrl = "http://localhost:8080/"

    private _urlEspecifico: string;

    constructor(urlEspecifico: string) {
        this._urlEspecifico = urlEspecifico;
    }

    get urlEspecifico(): string {
        return this._urlEspecifico;
    }

    set urlEspecifico(value: string) {
        this._urlEspecifico = value;
    }


    //Trae todo
    // async getAllBasic(urlEspecifico: String) {
    async getAllBasic() {

        try {

            let res = await fetch((this.baseUrl + this._urlEspecifico))

            if (!res.ok) {
                throw { status: res.status, statusText: res.statusText }
            }

            let jsonRes = await res.json()
            return jsonRes

        } catch (err: any) {
            console.log(`Error ${err.status}: ${err.statusText}`);
        }
    }
    // Metodo para hacer update 
    // async updateEntity(urlEspecifico: String, datos: any) {
    async updateEntity(datos: any) {



        try {

            //Pasarle a la direccion con un put la info
            let res = await fetch(this.baseUrl + this._urlEspecifico + `/${datos.id}`,
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

    // async createEntity(urlEspecifico: String, datos: {}) {
    async createEntity(datos: {}) {
        try {


            let res = await fetch(this.baseUrl + this._urlEspecifico,
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

    async getPaged(page: number, size: number) {

        try {

            let res = await fetch((this.baseUrl + this._urlEspecifico + "/paged?page=" + page + "&size=" + size))

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