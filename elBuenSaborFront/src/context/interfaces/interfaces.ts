import { Rubro } from "../../components/compIngrediente/Rubro";
import Producto from "./Producto";

export type unidadDeMedida = {
  id: Number;
  denominacion: String;
  unidadesParaPadre?: Number;
  padre?: unidadDeMedida;
};

export type Ingrediente = {
  id?: Number;
  activo: boolean;
  nombre: string;
  precioCompra: Number;
  stockActual: number;
  stockMaximo: Number;
  stockMinimo: Number;
  unidadmedida: unidadDeMedida;
  categoriaIngrediente: Rubro;
};

export type CategoriaProducto = {
  id?: number;
  activo: boolean;
  denominacion: string;
};

export type IngredienteDeProducto = {
  id?: Number;
  cantidad: Number;
  producto: Producto;
  ingrediente: Ingrediente;
  unidadmedida: unidadDeMedida;
};

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  activo: boolean;
}

export interface Direccion {
  idDireccion: number;
  calle: string;
  nroCasa: number;
  pisoDpto: string;
  usuario: Usuario;
  activo: boolean
}

export interface proyeccionProductoFavorito{
  id: number;
  imagen: string;
  denominacion: string;
}

export interface ExcepcionesVerificaUsuario{
  errorStatus: number,
  msj: string
}

//Esta interfaz no es una entidad en si, solo lo uso apra dar formato a la informacion que sera pasada para crear un pedido (producto y cantidad del mismo)
export interface ProductoParaPedido{
  id: number,
  cantidad: number
}