import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { unidadDeMedida, Ingrediente, CategoriaProducto } from "./interfaces/interfaces";
import Producto from "./interfaces/Producto";

//Interface de que es lo que va a contener este contexto
export interface UnidadContextInteface{
    unidadesDeMedida: unidadDeMedida[],
    //este set va a ser un hook de react que toma unidadDeMedida como prop
    setUnidadesDeMedida: Dispatch<SetStateAction<unidadDeMedida[]>>,

    ingredientes: Ingrediente[],
    setIngredientes: Dispatch<SetStateAction<Ingrediente[]>>

    productos: Producto[],
    setProductos: Dispatch<SetStateAction<Producto[]>>

    categoriasProductos: CategoriaProducto[],
    setCategoriasProductos: Dispatch<SetStateAction<CategoriaProducto[]>>

}

// const serviceBasicos = new ServiceBasicos();

export const GlobalContext = createContext<UnidadContextInteface>({
    //unidadesDeMedida: await  serviceBasicos.getAll("unidadDeMedida").then(data => {return data})
    unidadesDeMedida: [],
    setUnidadesDeMedida: () => {},
    ingredientes: [],
    setIngredientes: () => {},
    productos: [],
    setProductos: () => {},
    categoriasProductos: [],
    setCategoriasProductos: () => {},

});

export const useUnidadContext = () => useContext(GlobalContext);