import { ServiceBasicos } from "./ServiceBasicos";

export class PedidoService extends ServiceBasicos{
    url = "http://localhost:8080/pedido";

    constructor() {
        super("pedido");
      }

    //Trae todas categorias de ingrediente que no tengan padre
    async getByEstado(estado: string) {

        console.log("EL ESTADO QUE LE ESTOY PASANDO AL SERVICIO ES: "+ estado);

        try {

            let res = await fetch(this.url + "/estado/"+ estado)

            if (!res.ok) {
                throw { status: res.status, statusText: res.statusText }
            }

            let jsonRes = await res.json()
            return jsonRes

        } catch (err: any) {
            console.log(`Error ${err.status}: ${err.statusText}`);
        }
    }

    async getProductosByPedido(idPedido: number) {

        console.log("LOS PRODUCTOS DE ESTE PEDIDO: "+ idPedido);

        try {

            let res = await fetch(this.url + "/productos/"+ idPedido);

            if (!res.ok) {
                throw { status: res.status, statusText: res.statusText }
            }

            let jsonRes = await res.json();
            return jsonRes;

        } catch (err: any) {
            console.log(`Error ${err.status}: ${err.statusText}`);
        }
    }

}