import { CategoriaProducto, Ingrediente } from "./interfaces";

export class Producto{
    id?: number = 0;
    activo: boolean = true;
    denominacion: string = '';
    esManufacturado: boolean = true;
    tiempoCocina?: string = '';
    descripcion: string = '';
    receta?: string = '';
    costoTotal: number = 0;
    imagen: string = '';
    precioTotal: number = 0;
    categoriaProducto: CategoriaProducto = { id: undefined, denominacion: "", activo: true };



    constructor() {
        this.activo = true;
        this.denominacion = '';
        this.esManufacturado = true;
        this.tiempoCocina = '00:00:00';
        this.descripcion = '';
        this.receta = '';
        this.costoTotal = 0;
        this.imagen = '';
        this.precioTotal = 0;
        this.categoriaProducto = { id: undefined, denominacion: '', activo: true };
      }
}

export default Producto;
