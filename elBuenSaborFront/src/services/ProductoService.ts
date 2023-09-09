import { PageProyeccionHistorialPedido } from "../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente";
import { rankingProductos } from "../context/interfaces/Proyecciones/ProyeccionProductoRanking";
import { ServiceBasicos } from "./ServiceBasicos";


export class ProductoService extends ServiceBasicos {

  url = "http://localhost:8080/producto"

  constructor() {
    super("producto");
  }

  //Trae todos los ingredientes de un producto
  async getIngredientes(productoid: Number) {

    try {

      let res = await fetch(this.url + "/ingredientes/" + productoid)

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText }
      }

      let jsonRes = await res.json()
      return jsonRes

    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }


  async saveIngredienteProd(productoid: number, ingredienteid: number, medidaid: number, cantidad: number) {
    try {
      const data = {
        // JSON data object
        idIngrediente: ingredienteid,
        idProducto: productoid,
        idMedida: medidaid,
        cantidad: cantidad

      };

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      };


      let res = await fetch(this.url + "/ingredienteProd/save", requestOptions);

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText }
      }

      let jsonRes = await res.json()
      return jsonRes

    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }

  async getProductoXCategoria(id: number) {
    try {
      let res = await fetch(this.url + "/filtroCategoria" + "?filter=" + id);

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }

  async getProductoXFiltro(text: string) {
    try {
      let res = await fetch(this.url + "/filtro" + "?filter=" + text);

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }

  async getProductoXFiltroPaginado(text: string, page: number = 0, size: number = 6) {
    try {
      let res = await fetch(this.url + "/filtroPaginado" + "?filter=" + text + "&page=" + page + "&size=" + size);

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();
      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }

  async getRankingProductosComida(fechaInicio: Date | null = null, fechaFin: Date | null = null, direccion: string, size: number = 3, page: number = 0
  ): Promise<PageProyeccionHistorialPedido<rankingProductos>> {
    try {
      let parametros = `?page=${page}&size=${size}&direccionOrden=${direccion}`;

      if (fechaInicio !== null && fechaFin !== null) {
        parametros += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      const res = await fetch(`${this.url}/rankingProductos/comida${parametros}`);

      const jsonRes = await res.json();
      return jsonRes;
    } catch (error: any) {
      return error;
    }
  }

  async getRankingProductosBebida(fechaInicio: Date | null = null, fechaFin: Date | null = null, direccion: string, size: number = 3, page: number = 0
  ): Promise<PageProyeccionHistorialPedido<rankingProductos>> {
    try {
      let parametros = `?page=${page}&size=${size}&direccionOrden=${direccion}`;

      if (fechaInicio !== null && fechaFin !== null) {
        parametros += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      const res = await fetch(`${this.url}/rankingProductos/bebida${parametros}`);

      const jsonRes = await res.json();
      return jsonRes;
    } catch (error: any) {
      return error;
    }
  }

  async getInformeGananciasGrafico(fechaInicio: Date | null = null, fechaFin: Date | null = null) {
    try {
      let parametros = "";

      if (fechaInicio !== null && fechaFin !== null) {
        parametros += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      const res = await fetch(`${this.url}/informeGanancias/grafico${parametros}`);

      const jsonRes = await res.json();
      return jsonRes;
    } catch (error: any) {
      return error;
    }
  }


  async getInformeRentabilidad(fechaInicio: Date | null = null, fechaFin: Date | null = null) {
    try {
      let parametros = "";

      if (fechaInicio !== null && fechaFin !== null) {
        parametros += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      const res = await fetch(`${this.url}/informeGanancias/graficoRentabilidad${parametros}`);

      const jsonRes = await res.json();
      return jsonRes;
    } catch (error: any) {
      return error;
    }
  }

  async getInformeGananciasMes() {
    try {

      const res = await fetch(`${this.url}/informeGanancias/graficoGananciaMes`);

      const jsonRes = await res.json();
      return jsonRes;
    } catch (error: any) {
      return error;
    }
  }

}