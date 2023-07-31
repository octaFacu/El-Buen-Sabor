import { useEffect, useState } from 'react';
import IngredienteDeProducto from '../../context/interfaces/IngredienteDeProducto';
import { IngredientesService } from '../../services/IngredientesService';
import { ServiceBasicos } from '../../services/ServiceBasicos';

interface TablaIngredientesProdProps {
  ingredientesProd: IngredienteDeProducto[];
  setIngredientesProd?: any;
  edicion: boolean;
}

const TablaIngredientesMostrar: React.FC<TablaIngredientesProdProps> = ({ ingredientesProd, setIngredientesProd, edicion }) => {

    const ingredienteService = new IngredientesService();
    const [isLoading, setIsLoading] = useState(true);
    const medidas = new ServiceBasicos("unidadDeMedida");
    const [ingNombre, setIngNombre] = useState<string[]>([]);
  const [medidaNombre, setMedidaNombre] = useState<string[]>([]);

    //Get the names of the objects related to the ingredienteProd
    const getNamesMembers = async (ing: IngredienteDeProducto) => {
        try {
            // const ingredienteData = await ingredienteService.getOne(ing.ingrediente);
            // setIngNombre((prevIngNombre) => [...prevIngNombre, ingredienteData.nombre]);
      
            // const medidaData = await medidas.getOne(ing.unidadMedida);
            // setMedidaNombre((prevMedidaNombre) => [...prevMedidaNombre, medidaData.denominacion]);

            ingredienteService.getOne(ing.idIngrediente as number).then((ingredienteData) => {
                setIngNombre((prevIngNombre) => [...prevIngNombre, ingredienteData.nombre]);
              });
          
              medidas.getOne(ing.idMedida as number).then((medidaData) => {
                setMedidaNombre((prevMedidaNombre) => [...prevMedidaNombre, medidaData.denominacion]);
              });

        } catch (error) {
          // Handle any errors that might occur during the API calls
          console.error('Error fetching data:', error);
        }
      };

      useEffect(() => {
        // Fetch data when the component mounts or when ingredienteProdList changes
        if (ingredientesProd.length > 0) {
          setIsLoading(false);
        }

            ingredientesProd.forEach((ingredienteProd) => {
                console.log("ingrediente: ");
                console.log(JSON.stringify(ingredienteProd));
            
             if(ingredientesProd.length > 0) {
                 getNamesMembers(ingredienteProd);
             }
        });
      }, [ingredientesProd]);

      const handleRemoveIngredient = (index: number) => {

        const updatedIngredientesProd = [...ingredientesProd];

        updatedIngredientesProd.splice(index, 1);

        setIngredientesProd(updatedIngredientesProd);
      };

      


      if((ingredientesProd.length === 0 || ingNombre.length === 0 || medidaNombre.length === 0) && edicion == false){
        return(
            <div>
                Cargando ingredientes...
            </div>
        )
      }

    
  return (
    <div className="container" style={{ padding: '10px' }}>
    <table className="table" style={{ color: 'white', border: '1px solid #ccc', margin: '0 auto', textAlign: 'center', borderRadius: '8px', padding: '10px' }}>
      <thead style={{backgroundColor: "#864e1b"}}>
        <tr>
          <th scope="col">Ingrediente</th>
          <th scope="col">Cantidad</th>
          {edicion && <th scope="col">Eliminar</th> }
        </tr>
      </thead>
      <tbody>
        {ingredientesProd.map((ing, index) => (
          <tr key={ing.id!}>
            <td>{ingNombre[index]}</td>
            <td>{ing.cantidad} {medidaNombre[index]}s</td>
            {edicion && <td>
              <button className="btn btn-danger" onClick={
                ()=>{
                  handleRemoveIngredient(index);
                }
              }>
                <i className="material-icons" style={{ fontSize: '30px', cursor: 'pointer' }}>
                  not_interested
                </i>
              </button>
            </td> }
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default TablaIngredientesMostrar;