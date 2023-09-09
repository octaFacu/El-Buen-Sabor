import { useEffect, useState } from "react";
import IngredienteDeProducto from "../../context/models/IngredienteDeProducto";
import { IngredientesService } from "../../services/IngredientesService";
import { ServiceBasicos } from "../../services/ServiceBasicos";
import { Ingrediente, unidadDeMedida } from "../../context/models/interfaces";


interface TablaIngredientesProdProps {
    ingredienteProd: IngredienteDeProducto;
    cantidad: number;
    productoId: number;
  
  }
  
  const IngredientesDetComponent: React.FC<TablaIngredientesProdProps> = ({ ingredienteProd, cantidad, productoId }) => {
  
  //const IngredientesDetComponent: React.FC<TablaIngredientesProdProps> = ({ ingredienteProd, cantidad }) => {

      const ingredienteService = new IngredientesService();
      const medidaService = new ServiceBasicos("unidadDeMedida");
      const [medidaIng, setMedidaIng] = useState<unidadDeMedida>();
      const [ingrediente, setIngrediente] = useState<Ingrediente>();
      const [loading, setLoading] = useState(true);

      const getIngrediente = async() => {

        await ingredienteService.getOne(productoId).then((data) => {
          setIngrediente(data)
          console.log("Id de la medida: "+ingredienteProd.idMedida) //esto cuando lo llamo desde
          medidaService.getOne(ingredienteProd.idMedida).then((data) => {
            console.log("DATA MEDIDA "+data)
            setMedidaIng(data)
            setLoading(false);
          });
        }); 

    }

    useEffect(() => {
      console.log("PRODUCTO HA CAMBIADO: "+ingredienteProd.id)
    }, [ingredienteProd]);

      useEffect(() => {
        console.log("se van a cargar los ingredientes");
        getIngrediente();
        console.log("se cargaron los ingredientes");
      }, []);

      if(!loading){
        return(
        <p className="fs-5">
          • {ingrediente?.nombre} {cantidad}{medidaIng?.denominacion}
        </p>
        )
      }else{
        return(
        <p>Cargando...</p>)
      }
    

  }
  export default IngredientesDetComponent 