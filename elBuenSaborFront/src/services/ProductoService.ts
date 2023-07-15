import IngredienteDeProducto from "../context/interfaces/IngredienteDeProducto";
import { ServiceBasicos } from "./ServiceBasicos";


export class ProductoService extends ServiceBasicos{
    
    url = "http://localhost:8080/producto"

    constructor() {
        super("producto");
      }

      //Trae todos los ingredientes de un producto
    async getIngredientes(productoid: Number) {

      try {

          let res = await fetch(this.url + "/ingredientes/"+ productoid)

          if (!res.ok) {
              throw { status: res.status, statusText: res.statusText }
          }

          let jsonRes = await res.json()
          return jsonRes

      } catch (err: any) {
          console.log(`Error ${err.status}: ${err.statusText}`);
      }
  }


    async saveIngredienteProd(ingredienteProd: IngredienteDeProducto){
        try{

              
              const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(ingredienteProd)
              };
              

            let res = await fetch(this.url + "/ingredienteProd/save", requestOptions);

          if (!res.ok) {
              throw { status: res.status, statusText: res.statusText }
          }

          let jsonRes = await res.json()
          return jsonRes

        }catch (err: any) {
          console.log(`Error ${err.status}: ${err.statusText}`);
      }
    }
    }