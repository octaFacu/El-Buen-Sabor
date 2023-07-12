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
}
