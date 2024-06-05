import { useContext, useEffect, useState } from "react"
import "../../css/ventanaModal.css"
import { Ingrediente, unidadDeMedida } from "../../context/interfaces/interfaces";
import { Rubro } from "../compIngrediente/Rubro";
import { GlobalContext, useUnidadContext } from "../../context/GlobalContext";
import { ProductoService } from "../../services/ProductoService";
import Producto from "../../context/interfaces/Producto";
import GrupoBotones from "../genericos/GrupoBotones";
import IngredienteDeProducto from "../../context/interfaces/IngredienteDeProducto";
import { IngredientesService } from "../../services/IngredientesService";
import { ServiceBasicos } from "../../services/ServiceBasicos";

interface ProdFormProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: (estado: boolean) => void,
    cambiarEstadoFormProd: any,

    ingredientesList: IngredienteDeProducto[],
    setIngredientesList: any,

    productoId?: number

}

const ModalAgregarIngrediente: React.FC<ProdFormProps> = ({ estado, cambiarEstado, ingredientesList, setIngredientesList, cambiarEstadoFormProd, productoId }) => {

    const ingredienteService = new IngredientesService()
    const serviceMedida = new ServiceBasicos("unidadDeMedida");
    const { rol } = useUnidadContext();
  
    const [Ingredientenuevo, setIngredienteNuevo] = useState<IngredienteDeProducto>(new IngredienteDeProducto());

    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [medidas, setMedidas] = useState<unidadDeMedida[]>([]);


    useEffect(() => {
        setIngredienteNuevo(new IngredienteDeProducto());
        setIngredienteSelect(ingredientes[0]);
        setMedidaSelect(medidas[0]);
    }, [estado]);




    const [ingredienteSelect, setIngredienteSelect] = useState<Ingrediente>({
        nombre: "",
        activo: true,
        precioCompra: 0,
        stockActual: 0,
        stockMaximo: 0,
        stockMinimo: 0,
        unidadmedida: {id: 0, denominacion: ""},
        categoriaIngrediente: {id: 0, denominacion: "", activo: true}


    });
    const [medidaSelect, setMedidaSelect] = useState<unidadDeMedida>();
    


    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setIngredienteNuevo({ ...Ingredientenuevo, cantidad: parseFloat(event.target.value) });
    }

    const getMedidasYIngredientes = async () => {

        setMedidas(await serviceMedida.getAllBasic(rol));

        setIngredientes(await ingredienteService.getAllBasic(rol)); 
    }

    useEffect(() => {

        getMedidasYIngredientes(); 

    }, [])

    useEffect(() => {
        if (ingredientes.length > 0) {
          setIngredienteSelect(ingredientes[0]);
        }
    
        if (medidas.length > 0) {
          setMedidaSelect(medidas[0]);
        }
      }, [ingredientes, medidas]);

    

    if(estado && (ingredientes.length == 0 || medidas.length == 0)){

        return(
            <div>
                <div className="overlay">
                    <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white", maxWidth: "50%"}}>
                        <div className="" style={{textAlign: "center", alignContent: "center"}}>
                            <h3>No se han encontrado ingredientes cargados...</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    

    return (
        <>
            {estado && ingredientes.length !== 0 && medidas.length !== 0 &&
                <div className="overlay">
                    <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white", maxWidth: "50%"}}>
                        <div className="" style={{textAlign: "center", alignContent: "center"}}>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                               
                            }}>
                                <h3 className="mb-3">Añadir nuevo Ingrediente al Producto</h3>
                                
                                
                                    <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                    <div style={{display: "flex"}}>
                                        <div className="mb-3">
                                            <label htmlFor="stockActual" className="form-label">Cantidad</label>
                                            <input type="number" min="0" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control me-2" id="Cantidad" name="Cantidad" required value={Ingredientenuevo.cantidad.toString()} onChange={e => handleSelectChange(e)}/>
                                        </div>
                                    </div>
                                    </div>
                                    
                                    


                                <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                <div className="mb-4" style={{display: "flex", maxWidth: "70%", maxHeight: "40%", alignItems: "center", justifyContent: "center" }}>
                                    <label htmlFor="rubro" className="form-label">Ingrediente</label>
                                    <select style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-select" id="ingredientes" name="ingredientes" onChange={e =>{  setIngredienteSelect(JSON.parse(e.target.value)); Ingredientenuevo.idIngrediente = ingredienteSelect.id!;}}>
                                        { ingredientes!.map(ing => (
                                            <option value={JSON.stringify(ing)}>{ing.nombre}</option>
                                        ))}
                                    </select>

                                </div>
                                </div> 

                                <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                <div className="mb-4" style={{display: "flex", maxWidth: "70%", maxHeight: "40%", alignItems: "center", justifyContent: "center" }}>
                                    <label htmlFor="rubro" className="form-label">Unidad de Medida</label>
                                    <select style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-select" id="medidas" name="medidas" onChange={e =>{  setMedidaSelect(JSON.parse(e.target.value)); Ingredientenuevo.idMedida = medidaSelect!.id;}}>
                                        { medidas!.map(med => (

                                            <option value={JSON.stringify(med)}>{med.denominacion}</option>
                                        ))}
                                    </select>

                                </div>
                                </div> 

                                




                                 <button className="btn btn-danger mx-3" onClick={() => {cambiarEstado(!estado);
                                                                                            cambiarEstadoFormProd(true);}}>
                                    <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>highlight_off</i></button>

                                <button type="submit" className="btn" style={{backgroundColor: "#864e1b", color: "white"}} onClick={() => {


                                   if(ingredienteSelect.id !== 0 || medidaSelect!.id !== 0 || Ingredientenuevo.cantidad !== 0){
                                            

                                            Ingredientenuevo.idIngrediente = ingredienteSelect.id!;
                                            Ingredientenuevo.idMedida = medidaSelect!.id!;

                                            if(productoId != undefined){
                                                Ingredientenuevo.idProducto = productoId;
                                            }

                                            setIngredientesList([...ingredientesList, Ingredientenuevo]);
                                            

                                            cambiarEstado(!estado);
                                            cambiarEstadoFormProd(true);
                            
 
                                }
                                }}> <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>check</i></button> 
                            </form>
                        </div>
                    </div>
                    
                </div>
                
            }
        </>

    );

}

export default ModalAgregarIngrediente;