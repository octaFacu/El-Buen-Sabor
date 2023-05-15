import { Rubro } from "../../components/compIngrediente/Rubro"

export type unidadDeMedida = {
    id: Number,
    denominacion: String,
    unidadesParaPadre?: Number,
    padre?: unidadDeMedida
}

export type Ingrediente = {
    id?: Number,
    activo: boolean,
    nombre: string,
    precioCompra: Number,
    stockActual: number,
    stockMaximo: Number,
    stockMinimo: Number,
    unidadmedida: unidadDeMedida,
    categoriaIngrediente: Rubro
}

export type CategoriaProducto = {
    id?: number,
    activo: boolean,
    denominacion: string
}

