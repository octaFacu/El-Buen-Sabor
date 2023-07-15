import Producto from "./Producto";
import { Ingrediente, unidadDeMedida } from "./interfaces";

export class IngredienteDeProducto{
    id?: number = 0;
    cantidad: number = 0;
    ingrediente: number = 0;
    producto: number = 0;
    unidadMedida: number = 0;



    constructor() {
        this.id = 0;
        this.unidadMedida = 0;
        this.cantidad = 0;
        this.ingrediente = 0;
        this.producto = 0;
      }
}

export default IngredienteDeProducto;
