import { useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext"
import { CategoriaProducto, Ingrediente, unidadDeMedida } from "./interfaces/interfaces";
import { IngredientesService } from "../services/IngredientesService";
import { ServiceBasicos } from "../services/ServiceBasicos";
import Producto from "./interfaces/Producto";
import { ProductoService } from "../services/ProductoService";
import { CategoriaProductoService } from "../services/CategoriaProductoService";
import { useAuth0 } from "@auth0/auth0-react";
import { UsuarioService } from "../services/UsuarioService";


//Declarar el tipo de las props del contexto
interface props {
  children: JSX.Element | JSX.Element[]
}

export const ContextProvider = ({ children }: props) => {
  //Declarar todas las constantes del valor
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriasProductos, setCategoriasProductos] = useState<CategoriaProducto[]>([]);
  const [unidadesDeMedida, setUnidadesDeMedida] = useState<unidadDeMedida[]>([]);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const productosService = new ProductoService();
  const categoriasPService = new CategoriaProductoService();
  const [rol, setRol] = useState<string>("");


  const { isAuthenticated, isLoading, user } = useAuth0();

  //Para el filtro de busqueda de productos en el navbar
  const [busquedaXNombre, setBusquedaXNombre] = useState<string>("");

  const serviceBasicos = new ServiceBasicos("unidadDeMedida");
  const ingredientesService = new IngredientesService();
  const usuarioservice = new UsuarioService();




    const fetchData = async () => {
      const data = await serviceBasicos.getAllBasic(rol);
      console.log("Unidades de medida " + data);
      setUnidadesDeMedida(data);
    };

    const saveRol = async (rolGuardar: string) => {
      await setRol(rolGuardar);
    }

    const fetchRol = async () => {
      var rolPaso:string = "";
      var rolGuardar: string = "";
      
      
      if(user != null) {
        console.log("User id: " + user.userId);
      const data = await usuarioservice.getOne(user.userId, rolPaso);
      console.log("User ROL TRAIDO DE LA DB: " + data.nombreRol);
      const nombreRol = data.nombreRol;
      
      //Setear la id del rol segun el nombre
      switch (nombreRol.toUpperCase()) {
        case "ADMIN":
          rolGuardar =  import.meta.env.VITE_ADMIN
          console.log("Rol a guardar "+rolGuardar);
          break;
        case "COCINERO":
          rolGuardar = import.meta.env.VITE_COCINERO
          break;
        case "CAJERO":
          rolGuardar = import.meta.env.VITE_CAJERO
          break;
        case "DELIVERY":
          rolGuardar = import.meta.env.VITE_DELIVERY
          break;
        case "CLIENTE":
          rolGuardar = import.meta.env.VITE_CLIENTE
          break;
        default:
          rolGuardar = ""
          break;
      }
    }
    await saveRol(rolGuardar);
    };

    const fetchDataIngredientes = async () => {
      const data = await ingredientesService.getAllBasic(rol);
      console.log("Ingredientes: " + data);
      setIngredientes(data);
    };

    const fetchDataProductos = async () => {
      console.log("Tomando producto, rol: " + rol);
      const data = await productosService.getAllBasic(rol);
      console.log("Productos: " + data);
      setProductos(data);
    };

    const fetchDataCatProductos = async () => {
      console.log("Tomando categorias, rol: " + rol);
      const data = await categoriasPService.getAllBasic(rol);
      console.log("Categorias: " + data);
      setCategoriasProductos(data);
    };

    const loadAllContext = async () => {
      console.log("Entro al seteo de contexto");
    
      if (!isLoading) {
        console.log("ya ha cargado");
    
        if (!isAuthenticated) {
          console.log("No está autenticado.");
          await setRol("");
        }
    
        if (isAuthenticated && user) {
          console.log("Esta autenticado.");
          await fetchRol();
        }
    
        // Ensure that fetchRol is completed before proceeding
        // GET ALL UNIDADES DE MEDIDA
        await fetchData();
    
        // GET ALL INGREDIENTES
        await fetchDataIngredientes();
    
        // GET ALL PRODUCTOS
        await fetchDataProductos();
    
        // GET ALL CATEGORIAS
        await fetchDataCatProductos();
      }
    };
    useEffect(() => {
      //Si Auth0 ya finalizo de cargar
        if(!isLoading){
          //Carga el contexto
              loadAllContext();
        }

    }, [isAuthenticated, isLoading]);

    //Devolver el provider con los valores que vamos a llevar a otros componentes
    return (
      <GlobalContext.Provider value={{ unidadesDeMedida, setUnidadesDeMedida, ingredientes, setIngredientes,
      busquedaXNombre, setBusquedaXNombre, productos, setProductos, categoriasProductos, setCategoriasProductos, rol, setRol }}>
        {children}
      </GlobalContext.Provider>
    );
  }
