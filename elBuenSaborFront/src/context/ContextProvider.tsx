import { useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { CategoriaProducto, Ingrediente, unidadDeMedida } from "./interfaces/interfaces";
import { IngredientesService } from "../services/IngredientesService";
import { ServiceBasicos } from "../services/ServiceBasicos";
import Producto from "./interfaces/Producto";
import { ProductoService } from "../services/ProductoService";
import { CategoriaProductoService } from "../services/CategoriaProductoService";
import { useAuth0 } from "@auth0/auth0-react";
import { UsuarioService } from "../services/UsuarioService";

// Declarar el tipo de las props del contexto
interface props {
  children: JSX.Element | JSX.Element[];
}

export const ContextProvider = ({ children }: props) => {
  // Declarar todas las constantes del valor
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriasProductos, setCategoriasProductos] = useState<CategoriaProducto[]>([]);
  const [unidadesDeMedida, setUnidadesDeMedida] = useState<unidadDeMedida[]>([]);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const productosService = new ProductoService();
  const categoriasPService = new CategoriaProductoService();
  
  // Initialize role state with local storage
  const [rol, setRol] = useState<string>(() => {
    const storedRole = localStorage.getItem('userRole');
    return storedRole || 'nc';
  });

  const { isAuthenticated, isLoading, user } = useAuth0();

  // Para el filtro de busqueda de productos en el navbar
  const [busquedaXNombre, setBusquedaXNombre] = useState<string>("");

  const serviceBasicos = new ServiceBasicos("unidadDeMedida");
  const ingredientesService = new IngredientesService();
  const usuarioservice = new UsuarioService();

  const fetchData = async () => {
    const data = await serviceBasicos.getAllBasic(rol);
    setUnidadesDeMedida(data);
  };

  const saveRol = async (rolGuardar: string) => {

    setRol(rolGuardar);
    localStorage.setItem('userRole', rolGuardar);
  }
  const clearRol = () => {
    setRol("nc");
    localStorage.removeItem('userRole');
  };

  const fetchRol = async () => {
    var rolPaso: string = "";
    var rolGuardar: string = "";

    if(localStorage.getItem('userRole') === null){

    
    if (user != null) {
      const data = await usuarioservice.getOne(user.userId, rolPaso);
      const nombreRol = data.nombreRol;

      console.log("SETEANDO POR PRIMERA VEZ");
      // Setear la id del rol segun el nombre
      switch (nombreRol.toUpperCase()) {
        case "ADMIN":
          rolGuardar = import.meta.env.VITE_ADMIN;
          break;
        case "COCINERO":
          rolGuardar = import.meta.env.VITE_COCINERO;
          break;
        case "CAJERO":
          rolGuardar = import.meta.env.VITE_CAJERO;
          break;
        case "DELIVERY":
          rolGuardar = import.meta.env.VITE_DELIVERY;
          break;
        case "CLIENTE":
          rolGuardar = import.meta.env.VITE_CLIENTE;
          break;
        default:
          rolGuardar = import.meta.env.VITE_CLIENTE;
          break;
      }
    }
  }else{
    console.log("RECUPERO ROL DE LOCAL STORAGE");
    rolGuardar = localStorage.getItem('userRole')!;
  }
    await saveRol(rolGuardar);
  };

  const fetchDataIngredientes = async () => {
    const data = await ingredientesService.getAllBasic(rol);
    setIngredientes(data);
  };

  const fetchDataProductos = async () => {
    const data = await productosService.getAllBasic(rol);
    setProductos(data);
  };

  const fetchDataCatProductos = async () => {
    const data = await categoriasPService.getAllBasic(rol);
    setCategoriasProductos(data);
  };

  const loadAllContext = async () => {
    if (!isLoading) {
      if (!isAuthenticated) {
        clearRol();
      }


      if (isAuthenticated && user) {

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
    // Si Auth0 ya finalizo de cargar
    if (!isLoading) {
      // Carga el contexto
      loadAllContext();
    }
  }, [isAuthenticated, isLoading]);

  // Devolver el provider con los valores que vamos a llevar a otros componentes
  return (
    <GlobalContext.Provider value={{
      unidadesDeMedida,
      setUnidadesDeMedida,
      ingredientes,
      setIngredientes,
      busquedaXNombre,
      setBusquedaXNombre,
      productos,
      setProductos,
      categoriasProductos,
      setCategoriasProductos,
      rol,
      setRol
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
