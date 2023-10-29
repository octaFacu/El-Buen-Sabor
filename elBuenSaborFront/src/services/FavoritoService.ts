import { ServiceBasicos } from "./ServiceBasicos";
export class FavoritoService extends ServiceBasicos {
  url = "http://localhost:8080/favorito";

  constructor() {
    super("favorito");
  }


  async getFavoritosDeUsuario(usuarioId: number, rol: string) {
    try {
      let res = await fetch(this.url + "/buscar/" + usuarioId, {
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
