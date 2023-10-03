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

export type IngredienteDeProducto = {
  id?: number;
  cantidad: number;
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
  email: string;
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

//Esta interfaz no es una entidad en si, solo lo uso apra dar formato a la informacion que sera pasada para crear un pedido (producto y cantidad del mismo) --- Tambien se usa para mercado pago
export interface ProductoParaPedido{
  producto: Producto,
  cantidad: number
}
//Se usa para mercado pago
export interface UserAuth0{
  nombre?: string,
  apellido?: string,
  email?: string
}
//Se usa para mercado pago
export interface RequestDataMP{
  usuario: UserAuth0
  productos: ProductoParaPedido[]
}