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
}