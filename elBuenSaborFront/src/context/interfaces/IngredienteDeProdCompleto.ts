import Producto from "./Producto";
import { Ingrediente, unidadDeMedida } from "./interfaces";

export class IngredienteDeProdCompleto{
  id?: number = 0;
  cantidad: number = 0;
  ingrediente: Ingrediente = {nombre: "",
                            activo: true,
                            precioCompra: 0,
                            stockActual: 0,
                            stockMaximo: 0,
                            stockMinimo: 0,
                            unidadmedida: {id: 0, denominacion: ""},
                            categoriaIngrediente: {id: 0, denominacion: "", activo: true}};
  producto: Producto = new Producto();
  unidadmedida: unidadDeMedida = {
    id: 0, denominacion: ""
  };


}

export default IngredienteDeProdCompleto;