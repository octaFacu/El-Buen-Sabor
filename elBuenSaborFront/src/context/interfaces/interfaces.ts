import { Rubro } from "../../components/compIngrediente/Rubro"

export type unidadDeMedida = {
    id: Number,
    denominacion: String,
    padre_id: Number
}

export type Ingrediente = {
    id: Number,
    activo: Boolean,
    nombre: String,
    precioCompra: Number,
    stockActual: Number,
    stockMaximo: Number,
    stockMinimo: Number,
    unidadmedida: unidadDeMedida,
    categoriaIngrediente: Rubro
}

