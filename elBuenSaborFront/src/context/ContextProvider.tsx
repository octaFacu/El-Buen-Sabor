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

  //Para el filtro de busqueda de productos en el navbar
  const [busquedaXNombre, setBusquedaXNombre] = useState<string>("");

  const serviceBasicos = new ServiceBasicos("unidadDeMedida");
  const ingredientesService = new IngredientesService();

  const fetchData = async () => {
    const data = await serviceBasicos.getAllBasic();
    setUnidadesDeMedida(data);
  };

  const fetchDataIngredientes = async () => {
    const data = await ingredientesService.getAllBasic();
    setIngredientes(data);
  };

  useEffect(() => {

    //GET ALL UNIDADES DE MEDIDA
    fetchData();

    //GET ALL INGREDIENTES
    fetchDataIngredientes();

  }, []);

  //Devolver el provider con los valores que vamos a llevar a otros componentes
  return (
    <GlobalContext.Provider value={{ unidadesDeMedida, setUnidadesDeMedida, ingredientes, setIngredientes, busquedaXNombre, setBusquedaXNombre }}>
      {children}
    </GlobalContext.Provider>
  );
}