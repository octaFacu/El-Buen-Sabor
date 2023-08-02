import { ServiceBasicos } from "./ServiceBasicos";
export class ClienteService extends ServiceBasicos {
  url = "http://localhost:8080/cliente";

  constructor() {
    super("cliente");
  }


  async getIdCliente(usuarioId: string) {
    try {
      let res = await fetch(this.url + "/v1/" + usuarioId);

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }

}
