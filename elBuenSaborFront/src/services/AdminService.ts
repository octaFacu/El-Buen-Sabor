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

  async traerEmpleado(page: number = 0, size: number = 3) {
    try {
      const parametros = `?page=${page}&size=${size}`;
      const response = await fetch(
        this.urlEmpleado + `/traerEmpleados${parametros}`
      );
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

  async agregarRolUsuario(idUsuario: string, rol: string, nombreRol: string) {
    try {
      const requestBody = JSON.stringify({ idRol: rol, nombreRol: nombreRol});
 
      const response = await fetch(`http://localhost:8080/usuario/AgregarRol/${idUsuario}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: requestBody,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error del servidor: ${response.status} - ${response.statusText}. Detalles: ${errorResponse.message}`);
      }
  
      return response;
    } catch (error: any) {
      throw new Error("Error del servidor: " + error.message);
    }
  }
  

  async borrarRolUsuario(idUsuario: string, rol: string) {
    try {
        
      const requestBody = JSON.stringify({ idRol: rol, nombreRol: null });
      const response = await fetch(`http://localhost:8080/usuario/BorrarRol/${idUsuario}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: requestBody,
      });    
      return response;  
    } catch (error: any) {
      throw new Error("Error del servidor: " + error.message);
    }
  }

}
