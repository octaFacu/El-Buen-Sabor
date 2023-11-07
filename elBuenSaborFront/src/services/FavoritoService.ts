import Producto from "../context/interfaces/Producto";
import { ServiceBasicos } from "./ServiceBasicos";
export class FavoritoService extends ServiceBasicos {
  url = "http://localhost:8080/favorito";

  constructor() {
    super("favorito");
  }


  async getFavoritosDeUsuario(usuarioId: number,  size: number = 3, page: number = 0) {
    try {
      let parametros = `?page=${page}&size=${size}`;
      let res = await fetch(this.url + "/buscar/" + usuarioId + parametros);

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }

  async getAllByUsuarioId(usuarioId: string) {
    try {
      let res = await fetch(this.url + "/getAllUsuarioId/" + usuarioId);

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }

  async saveFavorito(usuarioId: string, producto: Producto) {
    try {
      let res = await fetch(this.url + "/saveFavorito/" + usuarioId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
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

  async deleteFavorito(usuarioId: string, productoId: number) {
    try {
      let res = await fetch(this.url + "/deleteFavorito/" + usuarioId + "/" + productoId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
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
