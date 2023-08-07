import { useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext"
import { CategoriaProducto, Ingrediente, unidadDeMedida } from "./models/interfaces";
import { IngredientesService } from "../services/IngredientesService";
import { ServiceBasicos } from "../services/ServiceBasicos";
import Producto from "./models/Producto";
import { ProductoService } from "../services/ProductoService";
import { CategoriaProductoService } from "../services/CategoriaProductoService";



//Declarar el tipo de las props del contexto
interface props {
    children: JSX.Element | JSX.Element[]
}

export const ContextProvider = ({ children }: props) => {
  //Declarar todas las constantes del valor
    const [unidadesDeMedida, setUnidadesDeMedida] = useState<unidadDeMedida[]>([]);
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [categoriasProductos, setCategoriasProductos] = useState<CategoriaProducto[]>([]);
    const serviceBasicos = new ServiceBasicos("unidadDeMedida");
    const ingredientesService = new IngredientesService();
    const productosService = new ProductoService();
    const categoriasPService = new CategoriaProductoService();


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

    //GET ALL PRODUCTOS
    useEffect(() => {
      const fetchDataProductos = async () => {
        const data = await productosService.getAllBasic();
        setProductos(data);
      };
      fetchDataProductos();
    }, []);

    //GET ALL CATEGORIAS DE PRODUCTOS
    useEffect(() => {
      const fetchDataCatProductos = async () => {
        const data = await categoriasPService.getAllBasic();
        setCategoriasProductos(data);
      };
      fetchDataCatProductos();
    }, []);
  
    //Devolver el provider con los valores que vamos a llevar a otros componentes
    return (
      <GlobalContext.Provider value={{ unidadesDeMedida, setUnidadesDeMedida, ingredientes,
         setIngredientes, productos, setProductos, categoriasProductos, setCategoriasProductos }}>
        {children}
      </GlobalContext.Provider>
    );
}