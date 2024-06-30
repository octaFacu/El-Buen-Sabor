import { useEffect, useState } from "react";
import IngredienteDeProducto from "../../context/interfaces/IngredienteDeProducto";
import { IngredientesService } from "../../services/IngredientesService";
import { ServiceBasicos } from "../../services/ServiceBasicos";
import { useUnidadContext } from "../../context/GlobalContext";
import { ProyeccionIngredienteDetalle } from "../../context/interfaces/Proyecciones/ProyeccionIngredienteDetalle";

interface TablaIngredientesProdProps {
  ingredientesProd: IngredienteDeProducto[];
  setIngredientesProd?: any;
  edicion: boolean;
  productoId?: number;
}

const TablaIngredientesMostrar: React.FC<TablaIngredientesProdProps> = ({
  ingredientesProd,
  setIngredientesProd,
  edicion,
  productoId,
}) => {
  const ingredienteService = new IngredientesService();
  const [isLoading, setIsLoading] = useState(true);
  const medidas = new ServiceBasicos("unidadDeMedida");
  const [ingNombre, setIngNombre] = useState<string[]>([]);
  const [medidaNombre, setMedidaNombre] = useState<string[]>([]);
  const [ingredientes, setIngredientes] =useState<ProyeccionIngredienteDetalle[]>([]);

  const { rol } = useUnidadContext();

  //Get the names of the objects related to the ingredienteProd
  const getNamesMembers = async (ing: IngredienteDeProducto) => {
    try {
      // const ingredienteData = await ingredienteService.getOne(ing.ingrediente);
      // setIngNombre((prevIngNombre) => [...prevIngNombre, ingredienteData.nombre]);

      // const medidaData = await medidas.getOne(ing.unidadMedida);
      // setMedidaNombre((prevMedidaNombre) => [...prevMedidaNombre, medidaData.denominacion]);
      var ingrediente: ProyeccionIngredienteDetalle = new ProyeccionIngredienteDetalle;
      
      ingrediente.id = ing.id!;
      ingrediente.cantidad = ing.cantidad;
      ingredienteService
        .getOne(ing.idIngrediente as number, rol)
        .then((ingredienteData) => {
          ingrediente.denominacion =  ingredienteData.nombre
        });

      medidas.getOne(ing.idMedida as number, rol).then((medidaData) => {
        ingrediente.medida = medidaData.denominacion;
      });
      setIngredientes([...ingredientes, ingrediente]);
    } catch (error) {
      // Handle any errors that might occur during the API calls
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts or when ingredienteProdList changes
    setIngNombre([]);
    setMedidaNombre([]);
    if (ingredientesProd.length > 0) {
      setIsLoading(false);
    }

    ingredientesProd.forEach((ingredienteProd) => {
      console.log("ingrediente: ");
      console.log(JSON.stringify(ingredienteProd));

      if (ingredientesProd.length > 0) {
        getNamesMembers(ingredienteProd);
        console.log(ingredientes);
      }

      //  if(productoId !== ingredienteProd.idProducto){
      //     setIngredientesProd([]);
      //  }
    });
  }, [ingredientesProd]);

  useEffect(()=>{
    if (ingredientes.length > 0) {
      setIsLoading(false);
    }
  },[ingredientes])

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredientesProd = [...ingredientesProd];

    updatedIngredientesProd.splice(index, 1);

    setIngredientesProd(updatedIngredientesProd);
  };

  if (
    (ingredientesProd.length === 0 ||
      ingredientes.length === 0 &&
    edicion == false)) {
    return <div>Cargando ingredientes...</div>;
  }

  return (
    <div className="container" style={{ padding: "10px" }}>
      <table
        className="table"
        style={{
          color: "white",
          border: "1px solid #ccc",
          margin: "0 auto",
          textAlign: "center",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <thead style={{ backgroundColor: "#864e1b" }}>
          <tr>
            <th scope="col">Ingrediente</th>
            <th scope="col">Cantidad</th>
            {edicion && <th scope="col">Eliminar</th>}
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((ing, index) => (
            <tr key={ing.id!}>
              <td>{ing.denominacion}</td>
              <td>
                {ing.cantidad} {ing.medida}s/es
              </td>
              {edicion && (
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleRemoveIngredient(index);
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ fontSize: "30px", cursor: "pointer" }}
                    >
                      not_interested
                    </i>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaIngredientesMostrar;
