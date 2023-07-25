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




    async actualizarEntity(datos: any, ing: IngredienteDeProducto[]) {
      try {
        //Pasarle a la direccion con un put la info
        let res = await fetch(
          this.baseUrl + this.url + `/${datos.id}`,
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

        for(var ingr of ing){
          await this.saveIngredienteProd(ingr)
        }

        

        return jsonRes;
      } catch (err: any) {
        console.log(`Error ${err.status}: ${err.statusText}`);
      }
    }


    async crearEntity(datos: {}, ing: IngredienteDeProducto[]) {
      try {
        let res = await fetch(this.url+"/saveTime", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });
  
        if (!res.ok) {
          throw { status: res.status, statusText: res.statusText };
        }
  
        let jsonRes = await res.json();

        for(var ingr of ing){
          ingr.producto = jsonRes.id;
          await this.saveIngredienteProd(ingr)
        }

        return jsonRes;
      } catch (err: any) {
        console.log(`Error ${err.status}: ${err.statusText}`);
      }
    }

    }