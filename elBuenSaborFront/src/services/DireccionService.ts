import { ServiceBasicos } from "./ServiceBasicos";

export class DireccionService extends ServiceBasicos {
  url = "http://localhost:8080/direccion";

  constructor() {
    super("direccion");
  }

  async updateEntity(datos: any) {
    try {
      let res = await fetch(
        this.url  + `/${datos.idDireccion}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }
  //Trae las direcciones de un usuario
  async getDireccionesByusuarioId(usuarioId: string) {
    try {
      let res = await fetch(this.url + "/porUsuario?idUsuario=" + usuarioId);

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
