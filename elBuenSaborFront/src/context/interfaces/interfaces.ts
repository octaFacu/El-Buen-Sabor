import { Rubro } from "../../components/compIngrediente/Rubro";
import Producto from "./Producto";

export type unidadDeMedida = {
  id: number;
  denominacion: string;
  unidadesParaPadre?: number;
  padre?: unidadDeMedida;
};

export type Ingrediente = {
  id?: number;
  activo: boolean;
  nombre: string;
  precioCompra: number;
  stockActual: number;
  stockMaximo: number;
  stockMinimo: number;
  unidadmedida: unidadDeMedida;
  categoriaIngrediente: Rubro;
};

export type CategoriaProducto = {
  id?: number;
  activo: boolean;
  denominacion: string;
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
