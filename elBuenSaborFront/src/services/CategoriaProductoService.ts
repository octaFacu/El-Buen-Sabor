import { ServiceBasicos } from "./ServiceBasicos";
export class CategoriaProductoService extends ServiceBasicos {

  url = "http://localhost:8080/categoriaProducto"

  constructor() {
    super("categoriaProducto");
  }

  async getAllActive(rol: string) {
    try {
      let res = await fetch(this.url + "/getAllActivo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
        },
      });

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