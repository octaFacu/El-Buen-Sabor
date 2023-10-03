import { ExcepcionesVerificaUsuario } from "../context/interfaces/interfaces";
import { ServiceBasicos } from "./ServiceBasicos";

export class AdminService extends ServiceBasicos {
  url = "http://localhost:8080/admin/estadisticas";
  urlEmpleado = "http://localhost:8080/usuario";
  constructor() {
    super("admin/estadisticas");
  }

  async generarInformeClientes() {
    try {
      const response = await fetch(this.url + "/generar-informeClientes");
      if (!response.ok) {
        throw new Error("Error al generar el informe");
      }
      const blob = await response.blob();
      return blob;
    } catch (error: any) {
      throw new Error("Error en la descarga del archivo: " + error.message);
    }
  }



  async generarInformeProductos() {
    try {
      const response = await fetch(this.url + "/generar-informeProductos");
      if (!response.ok) {
        throw new Error("Error al generar el informe");
      }
      const blob = await response.blob();
      return blob;
    } catch (error: any) {
      throw new Error("Error en la descarga del archivo: " + error.message);
    }
  }


  async generarInformeGanancias() {
    try {
      const response = await fetch(this.url + "/generar-informeGanancias");
      if (!response.ok) {
        throw new Error("Error al generar el informe");
      }
      const blob = await response.blob();
      return blob;
    } catch (error: any) {
      throw new Error("Error en la descarga del archivo: " + error.message);
    }
  }

  async traerEmpleado(){
    try {
      const response = await fetch(this.urlEmpleado + "/traerEmpleados")
      const reponseJSON = await response.json();
      if (!response.ok) {
        if (response.status === 500) {
          const respuesta: ExcepcionesVerificaUsuario = await response.json();
          throw respuesta;
        } 
      }
      return reponseJSON;

    } catch (error: any) {
      throw new Error("Error en la descarga del archivo: " + error.message);
    }
  }

}
