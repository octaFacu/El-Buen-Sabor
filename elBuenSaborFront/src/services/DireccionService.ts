import { Direccion, ExcepcionesVerificaUsuario } from "../context/interfaces/interfaces";
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
  // verificamos si el usuario a crear ya existe en la bd si no existe lo creamos. y si existe verificamos si esta en false. lo cambiamos a true. si esta en true tiramos excepcion
  async verificarYCrearDireccion(usuarioId: string, direccion: Direccion): Promise<string> {
    try {
      const response = await fetch(this.url + "/verificar-crear-direccion/" + usuarioId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(direccion),
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          // Si es el error de dirección existente y activa, lanzamos nuestro error personalizado
          const errorResponse: ExcepcionesVerificaUsuario = await response.json();
          throw errorResponse;
        }
      }
      
      const data: string = await response.text();
      return data;
    } catch (error: any) {
      // este catch es por si hay cualquier otro tipo de error
      throw error;
    }
  }

  async updateDireccion(usuarioId: string, direccion: Direccion): Promise<string> {
    try {
      const response = await fetch(this.url + "/actualizar/direccion/" +direccion.idDireccion+"?idUsuario="+usuarioId , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(direccion),
      });

      if (!response.ok) {
        if (response.status === 400) {
          // aca manejamos los errores que podemos tener
          const respuesta: ExcepcionesVerificaUsuario = await response.json();
          throw respuesta;
        } else if (response.status === 404) {
          const respuesta: ExcepcionesVerificaUsuario = await response.json();
          throw respuesta;
        } 
      }
      const data: string = await response.text();
      return data;
    } catch (error: any) {
      // Este catch es por si hay cualquier otro tipo de error
      throw error;
    }
  }
}
