import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { unidadDeMedida, Ingrediente } from "./interfaces/interfaces";
import { ServiceBasicos } from "../services/ServiceBasicos";

//Interface de que es lo que va a contener este contexto
export interface UnidadContextInteface{
    unidadesDeMedida: unidadDeMedida[],
    //este set va a ser un hook de react que toma unidadDeMedida como prop
    setUnidadesDeMedida: Dispatch<SetStateAction<unidadDeMedida[]>>,

    ingredientes: Ingrediente[],
    setIngredientes: Dispatch<SetStateAction<Ingrediente[]>>
}

const serviceBasicos = new ServiceBasicos();

export const GlobalContext = createContext<UnidadContextInteface>({
    //unidadesDeMedida: await  serviceBasicos.getAll("unidadDeMedida").then(data => {return data})
    unidadesDeMedida: [],
    setUnidadesDeMedida: () => {},
    ingredientes: [],
    setIngredientes: () => {},



});

export const useUnidadContext = () => useContext(GlobalContext);