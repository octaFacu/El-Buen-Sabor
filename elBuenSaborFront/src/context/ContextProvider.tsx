import { useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext"
import { Ingrediente, unidadDeMedida } from "./interfaces/interfaces";
import { IngredientesService } from "../services/IngredientesService";
import { ServiceBasicos } from "../services/ServiceBasicos";



//Declarar el tipo de las props del contexto
interface props {
    children: JSX.Element | JSX.Element[]
}

export const ContextProvider = ({ children }: props) => {
  //Declarar todas las constantes del valor
    const [unidadesDeMedida, setUnidadesDeMedida] = useState<unidadDeMedida[]>([]);
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const serviceBasicos = new ServiceBasicos("unidadDeMedida");
    const ingredientesService = new IngredientesService();


    //GET ALL UNIDADES DE MEDIDA
    useEffect(() => {
      const fetchData = async () => {
        const data = await serviceBasicos.getAllBasic();
        setUnidadesDeMedida(data);
      };
      fetchData();
    }, []);

    //GET ALL INGREDIENTES
    useEffect(() => {
      const fetchDataIngredientes = async () => {
        const data = await ingredientesService.getAllBasic();
        setIngredientes(data);
      };
      fetchDataIngredientes();
    }, []);
  
    //Devolver el provider con los valores que vamos a llevar a otros componentes
    return (
      <GlobalContext.Provider value={{ unidadesDeMedida, setUnidadesDeMedida, ingredientes, setIngredientes }}>
        {children}
      </GlobalContext.Provider>
    );
}