import { ServiceBasicos } from "./ServiceBasicos";

export class AdminService extends ServiceBasicos {
  url = "http://localhost:8080/admin/estadisticas";

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





}
