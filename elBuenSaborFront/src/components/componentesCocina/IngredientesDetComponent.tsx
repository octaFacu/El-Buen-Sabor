import { useEffect, useState } from "react";
import IngredienteDeProducto from "../../context/interfaces/IngredienteDeProducto";
import { IngredientesService } from "../../services/IngredientesService";
import { ServiceBasicos } from "../../services/ServiceBasicos";
import { Ingrediente, unidadDeMedida } from "../../context/interfaces/interfaces";
import { useUnidadContext } from "../../context/GlobalContext";
import { ProductoService } from "../../services/ProductoService";
import PageLoader from "../pageLoader/PageLoader";
import IngredienteDeProdCompleto from "../../context/interfaces/IngredienteDeProdCompleto";


interface TablaIngredientesProdProps {
  ingredienteProd: IngredienteDeProdCompleto;
  cantidad: number;
  productoId: number;
  estado: boolean;

}

const IngredientesDetComponent: React.FC<TablaIngredientesProdProps> = ({ ingredienteProd, cantidad, productoId, estado }) => {



  const [loading, setLoading] = useState(true);

  const { rol } = useUnidadContext();

  /*const getIngrediente = async() => {
    console.log("ingrediente id: " + ingredienteProd.idIngrediente);
    await ingredienteService.getOne(ingredienteProd.idIngrediente, rol).then((data) => {
      setIngrediente(data)
      console.log("Id de la medida: "+ingredienteProd.idMedida) //esto cuando lo llamo desde
      medidaService.getOne(ingredienteProd.idMedida, rol).then((data) => {
        console.log("DATA MEDIDA "+data)
        setMedidaIng(data)
        setLoading(false);
      });
    }); 

}*/

  useEffect(() => {
    if (ingredienteProd != null) {
      setLoading(false);
    }
  }, [ingredienteProd]);

  useEffect(() => {
    //console.log("se van a cargar los ingredientes");
    //getIngrediente();
    //console.log("se cargaron los ingredientes");
  }, []);

  if (!loading && estado) {
    return (
      <p className="fs-5">
        • {ingredienteProd?.ingrediente.nombre} {cantidad} {ingredienteProd?.unidadmedida.denominacion}
      </p>
    )
  } else {
    return (
      <PageLoader></PageLoader>)
  }


}
export default IngredientesDetComponent 