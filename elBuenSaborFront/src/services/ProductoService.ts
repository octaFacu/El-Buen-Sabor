import IngredienteDeProducto from "../context/models/IngredienteDeProducto";
import Producto from "../context/models/Producto";
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

      console.log("Ingrediente pasado al servicio: "+JSON.stringify(ingredienteProd));

      
        try{

              
              const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(ingredienteProd)
              };
              

            let res = await fetch("http://localhost:8080" + "/ingredienteProd/save", requestOptions);

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
          console.log("Ingrediente a guardar: " + JSON.stringify(ingr))
          ingr.idProducto = datos.id;
          await this.saveIngredienteProd(ingr)
        }

        

        return jsonRes;
      } catch (err: any) {
        console.log(`Error ${err.status}: ${err.statusText}`);
      }
    }


    async crearEntity(datos: {}, ing: IngredienteDeProducto[]) {

      const nuevoProducto = new Producto();
      //Asignar los datos que se traen en un nuevo producto
      Object.assign(nuevoProducto, datos);

      //Si el producto no es manufacturado setear vacios los campos no correpondientes
      if(nuevoProducto.esManufacturado === false) { 
        nuevoProducto.receta = '';
        nuevoProducto.tiempoCocina = undefined;
        
      }

      try {
        console.log(JSON.stringify(nuevoProducto));
        let res = await fetch(this.url, {
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

        if(nuevoProducto.esManufacturado === true){

          console.log("nuevos ingredientes: ")

          for(var ingr of ing){
            console.log(ingr.idIngrediente);
            ingr.idProducto = jsonRes.id;
            await this.saveIngredienteProd(ingr)
          }
        } 

        return jsonRes;
      } catch (err: any) {
        console.log(`Error ${err.status}: ${err.statusText}`);
      }
    }

  


    async actualizarEntityActivo(datos: any) {

      var ingredientes = await this.getIngredientes(datos.id);

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

        for(var ingr of ingredientes){
          await this.saveIngredienteProd(ingr)
        }

        

        return jsonRes;
      } catch (err: any) {
        console.log(`Error ${err.status}: ${err.statusText}`);
      }
    }  }