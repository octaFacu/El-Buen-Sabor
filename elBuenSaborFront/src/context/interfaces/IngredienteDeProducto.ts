import Producto from "./Producto";
import { Ingrediente, unidadDeMedida } from "./interfaces";

export class IngredienteDeProducto{
    id?: number = 0;
    cantidad: number = 0;
    ingrediente: Ingrediente;
    producto: Producto;
    unidadMedida: unidadDeMedida;



    constructor() {
        this.id = 0;
        this.unidadMedida = {
            id: 0,
            denominacion: "",
            unidadesParaPadre: 0

        };
        this.cantidad = 0;
        this.ingrediente = {
          id: 0,
          activo: true,
          nombre: '',
          precioCompra: 0,
          stockActual: 0,
          stockMaximo: 0,
          stockMinimo: 0,
          unidadmedida: { id: 0, denominacion: '', unidadesParaPadre: 0, padre: { id: 0, denominacion: '', unidadesParaPadre: 0 } },
          categoriaIngrediente: { id: 0, denominacion: '', activo: true }
        };
        this.producto = {
            id: 0,
            activo: true,
            denominacion: '',
            esManufacturado: true,
            tiempoCocina: 0,
            descripcion: '',
            receta: '',
            costoTotal: 0,
            imagen: '',
            precioTotal: 0,
            categoriaProducto: { id: undefined, denominacion: '', activo: true }
        }
      }
}

export default IngredienteDeProducto;
