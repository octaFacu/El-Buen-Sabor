import { CategoriaProducto, Ingrediente } from "./interfaces";

export class Producto{
    id?: number = 0;
    activo: boolean = true;
    denominacion: string = '';
    esManufacturado: boolean = true;
    tiempoCocina?: number = 0;
    descripcion: string = '';
    receta?: string = '';
    costoTotal: number = 0;
    imagen: string = '';
    precioTotal: number = 0;
    categoriaProducto: CategoriaProducto = { id: undefined, denominacion: "", activo: true };
    ingredientes?: Ingrediente[];



    constructor() {
        this.id = 0;
        this.activo = true;
        this.denominacion = '';
        this.esManufacturado = true;
        this.tiempoCocina = 0;
        this.descripcion = '';
        this.receta = '';
        this.costoTotal = 0;
        this.imagen = '';
        this.precioTotal = 0;
        this.categoriaProducto = { id: undefined, denominacion: '', activo: true };
        this.ingredientes = [{
          id: 0,
          activo: true,
          nombre: '',
          precioCompra: 0,
          stockActual: 0,
          stockMaximo: 0,
          stockMinimo: 0,
          unidadmedida: { id: 0, denominacion: '', unidadesParaPadre: 0, padre: { id: 0, denominacion: '', unidadesParaPadre: 0 } },
          categoriaIngrediente: { id: 0, denominacion: '', activo: true }
        }];
      }
}

export default Producto;
