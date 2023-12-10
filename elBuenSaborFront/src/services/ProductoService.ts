
import Producto from "../context/interfaces/Producto";
import { PageProyeccionHistorialPedido } from "../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente";
import { rankingProductos } from "../context/interfaces/Proyecciones/ProyeccionProductoRanking";
import { IngredienteDeProducto } from "../context/interfaces/IngredienteDeProducto";

import { ServiceBasicos } from "./ServiceBasicos";


export class ProductoService extends ServiceBasicos {

  url = "http://localhost:8080/producto"

  constructor() {
    super("producto");
  }

  //Trae todos los ingredientes de un producto
  async getIngredientes(productoid: Number, rol: string) {

    try {
      console.log("ROL: "+rol);
      let res = await fetch(this.url + "/ingredientes/" + productoid, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
        },
      })

      if (!res.ok) {
        console.log(res)
        throw { status: res.status, statusText: res.statusText }
      }

      let jsonRes = await res.json()
      return jsonRes

    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }


  async saveIngredienteProd(ingredienteProd: IngredienteDeProducto, rol: string){

    console.log("Ingrediente pasado al servicio: " + JSON.stringify(ingredienteProd));


        try{    
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Role': rol
              },
              body: JSON.stringify(ingredienteProd)
            };
          


      let res = await fetch("http://localhost:8080" + "/ingredienteProd/save", requestOptions);

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText }
      }

      let jsonRes = await res.json()
      return jsonRes

    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }


 

  async getProductoXFiltro(text: string, rol: string) {
    try {
      let res = await fetch(this.url + "/filtro" + "?filter=" + text, {
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

  async getProductoXFiltroPaginado(text: string, page: number = 0, size: number = 6, rol: string) {
    try {
      let res = await fetch(this.url + "/filtroPaginado" + "?filter=" + text + "&page=" + page + "&size=" + size, {
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

  async getRankingProductosComida(fechaInicio: Date | null = null, fechaFin: Date | null = null, direccion: string, size: number = 3, page: number = 0, rol: string
  ): Promise<PageProyeccionHistorialPedido<rankingProductos>> {
    try {
      let parametros = `?page=${page}&size=${size}&direccionOrden=${direccion}`;

      if (fechaInicio !== null && fechaFin !== null) {
        parametros += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      const res = await fetch(`${this.url}/rankingProductos/comida${parametros}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
        },
      });

      const jsonRes = await res.json();
      return jsonRes;
    } catch (error: any) {
      return error;
    }
  }

  async getRankingProductosBebida(fechaInicio: Date | null = null, fechaFin: Date | null = null, direccion: string, size: number = 3, page: number = 0, rol: string
  ): Promise<PageProyeccionHistorialPedido<rankingProductos>> {
    try {
      let parametros = `?page=${page}&size=${size}&direccionOrden=${direccion}`;

      if (fechaInicio !== null && fechaFin !== null) {
        parametros += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      const res = await fetch(`${this.url}/rankingProductos/bebida${parametros}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
        },
      });

      const jsonRes = await res.json();
      return jsonRes;
    } catch (error: any) {
      return error;
    }
  }

  async getInformeGananciasGrafico(fechaInicio: Date | null = null, fechaFin: Date | null = null, rol: string) {
    try {
      let parametros = "";

      if (fechaInicio !== null && fechaFin !== null) {
        parametros += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      const res = await fetch(`${this.url}/informeGanancias/grafico${parametros}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
        },
      });

      const jsonRes = await res.json();
      return jsonRes;
    } catch (error: any) {
      return error;
    }
  }


  async getInformeRentabilidad(fechaInicio: Date | null = null, fechaFin: Date | null = null, rol: string) {
    try {
      let parametros = "";

      if (fechaInicio !== null && fechaFin !== null) {
        parametros += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      }

      const res = await fetch(`${this.url}/informeGanancias/graficoRentabilidad${parametros}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
        },
      });

      const jsonRes = await res.json();
      return jsonRes;
    } catch (error: any) {
      return error;
    }
  }

  async getInformeGananciasMes(rol: string) {
    try {

      const res = await fetch(`${this.url}/informeGanancias/graficoGananciaMes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
        },
      });

      const jsonRes = await res.json();
      return jsonRes;
    } catch (error: any) {
      return error;
    }
  }

  async actualizarEntity(datos: any, ing: IngredienteDeProducto[], rol: string) {
    try {
      //Pasarle a la direccion con un put la info
      let res = await fetch(
        this.url + `/${datos.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'X-Role': rol
          },
          body: JSON.stringify(datos),
        }
      );

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();

      for (var ingr of ing) {
        console.log("Ingrediente a guardar: " + JSON.stringify(ingr))
        ingr.idProducto = datos.id;
        await this.saveIngredienteProd(ingr, rol)
      }



      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }


  async crearEntity(datos: {}, ing: IngredienteDeProducto[], rol: string) {

    const nuevoProducto = new Producto();
    //Asignar los datos que se traen en un nuevo producto
    Object.assign(nuevoProducto, datos);

    //Si el producto no es manufacturado setear vacios los campos no correpondientes
    if (nuevoProducto.esManufacturado === false) {
      nuevoProducto.receta = '';
      nuevoProducto.tiempoCocina = undefined;
      ing = [];
    }

    try {
      console.log("ENTRANDO A CREAR METHOD SERVICE "+JSON.stringify(nuevoProducto));
      let res = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'X-Role': rol
        },
        body: JSON.stringify(datos),
      });

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();

      if (nuevoProducto.esManufacturado === true) {
        console.log("Rol: "+rol);
        console.log("NUEVOS INGREDIENTES: ")

        for (var ingr of ing) {
          console.log(ingr.idIngrediente);
          ingr.idProducto = jsonRes.id;
          await this.saveIngredienteProd(ingr, rol)
        }
      }

      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  }




  async actualizarEntityActivo(datos: any, rol: string) {

    var ingredientes = await this.getIngredientes(datos.id, rol);

    try {
      //Pasarle a la direccion con un put la info
      let res = await fetch(
        this.url + `/${datos.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'X-Role': rol
          },
          body: JSON.stringify(datos),
        }
      );

      if (!res.ok) {
        throw { status: res.status, statusText: res.statusText };
      }

      let jsonRes = await res.json();

      for(var ingr of ingredientes){
        await this.saveIngredienteProd(ingr, rol)
      }



      return jsonRes;
    } catch (err: any) {
      console.log(`Error ${err.status}: ${err.statusText}`);
    }
  } 


  async getProductoXCategoria(id: number, rol: string) {
    try {
      let res = await fetch(this.url + "/filtroCategoria" + "?filter=" + id, {
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