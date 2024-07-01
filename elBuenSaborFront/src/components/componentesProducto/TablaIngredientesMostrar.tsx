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
  const medidas = new ServiceBasicos("unidadDeMedida");
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientes, setIngredientes] = useState<ProyeccionIngredienteDetalle[]>([]);
  const { rol } = useUnidadContext();

  const getNamesMembers = async (ing: IngredienteDeProducto) => {
    const ingrediente: ProyeccionIngredienteDetalle = new ProyeccionIngredienteDetalle();
    ingrediente.id = ing.id!;
    ingrediente.cantidad = ing.cantidad;

    try {
      const ingredienteData = await ingredienteService.getOne(ing.idIngrediente as number, rol);
      ingrediente.denominacion = ingredienteData.nombre;

      const medidaData = await medidas.getOne(ing.idMedida as number, rol);
      ingrediente.medida = medidaData.denominacion;

      return ingrediente;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchIngredientes = async () => {
      const fetchedIngredientes = await Promise.all(
        ingredientesProd.map(async (ingredienteProd) => {
          const fetchedIngrediente = await getNamesMembers(ingredienteProd);
          return fetchedIngrediente;
        })
      );

      setIngredientes(fetchedIngredientes.filter(Boolean) as ProyeccionIngredienteDetalle[]);
      setIsLoading(false);
    };

    if (ingredientesProd.length > 0) {
      fetchIngredientes();
    } else {
      setIsLoading(false);
    }
  }, [ingredientesProd]);

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredientesProd = [...ingredientesProd];
    updatedIngredientesProd.splice(index, 1);
    setIngredientesProd(updatedIngredientesProd);
  };

  if (isLoading) {
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
                    onClick={() => handleRemoveIngredient(index)}
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
