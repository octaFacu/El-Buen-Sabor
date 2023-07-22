import { useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext"
import { CategoriaProducto, Ingrediente, unidadDeMedida } from "./interfaces/interfaces";
import { IngredientesService } from "../services/IngredientesService";
import { ServiceBasicos } from "../services/ServiceBasicos";
import { CategoriaProductoService } from "../services/CategoriaProductoService";



//Declarar el tipo de las props del contexto
interface props {
  children: JSX.Element | JSX.Element[]
}

export const ContextProvider = ({ children }: props) => {
  //Declarar todas las constantes del valor
  const [unidadesDeMedida, setUnidadesDeMedida] = useState<unidadDeMedida[]>([]);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  // const [categorias, setCategorias] = useState<CategoriaProducto[]>([]);

  const serviceBasicos = new ServiceBasicos("unidadDeMedida");
  const ingredientesService = new IngredientesService();
  // const categoriaProductoService = new CategoriaProductoService()

  const fetchData = async () => {
    const data = await serviceBasicos.getAllBasic();
    setUnidadesDeMedida(data);
  };

  const fetchDataIngredientes = async () => {
    const data = await ingredientesService.getAllBasic();
    setIngredientes(data);
  };

  // const fetchDataCategorias = async () => {
  //   const data = await categoriaProductoService.getAllBasic();
  //   setCategorias(data);
  // };

  useEffect(() => {

      //GET ALL UNIDADES DE MEDIDA
      fetchData();

      //GET ALL INGREDIENTES
      fetchDataIngredientes();

      //GET ALL CATEGORIAS PRODUCTO
      // fetchDataCategorias();

  }, []);

  //Devolver el provider con los valores que vamos a llevar a otros componentes
  return (
    <GlobalContext.Provider value={{ unidadesDeMedida, setUnidadesDeMedida, ingredientes, setIngredientes, /*categorias, setCategorias */ }}>
      {children}
    </GlobalContext.Provider>
  );
}