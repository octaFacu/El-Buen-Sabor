import { useContext, useEffect, useState } from "react"
import "../../css/ventanaModal.css"
import { Ingrediente, unidadDeMedida } from "../../context/interfaces/interfaces";
import { Rubro } from "../compIngrediente/Rubro";
import { GlobalContext } from "../../context/GlobalContext";
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
    producto: Producto,

    /*datos?: IngredienteDeProducto
    setDatos: any*/

}

const ModalAgregarIngrediente: React.FC<ProdFormProps> = ({ estado, cambiarEstado, producto }) => {

    const ingredienteService = new IngredientesService();
    const serviceMedida = new ServiceBasicos("unidadmedida");
  

    let Ingredientenuevo: IngredienteDeProducto = new IngredienteDeProducto();
    let ingredientes: Ingrediente[] = [];
    let medidas: unidadDeMedida[] = [];
    const [ingredienteSelect, setIngredienteSelect] = useState<IngredienteDeProducto>( new IngredienteDeProducto());
    


    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        //Ingredientenuevo.denominacion =(event.target.value)

        setIngredienteSelect({ ...ingredienteSelect, cantidad: parseFloat(event.target.value) });
    }

    useEffect(() => {
        /*if(datos !== undefined){
            setIngredienteSelect(datos!);
        }*/
        const getMedidasYIngredientes = async () => {

            medidas = await serviceMedida.getAllBasic();

            ingredientes = await ingredienteService.getAllBasic();
        }
        
        
    }, [])

    

    return (
        <>
            {estado && ingredienteSelect !== undefined &&
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
                                            <input type="number" style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-control me-2" id="Cantidad" name="Cantidad" required value={ingredienteSelect.cantidad.toString()}/>
                                        </div>
                                    </div>
                                    </div>
                                    

                                

                                
                                
                                
                                    


                                <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                <div className="mb-4" style={{display: "flex", maxWidth: "70%", maxHeight: "40%", alignItems: "center", justifyContent: "center" }}>
                                    <label htmlFor="rubro" className="form-label">Ingrediente</label>
                                    <select style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-select" id="ingredientes" name="ingredientes" /*onChange={e =>{  setUnidadElegida(e.target.value); Ingredientenuevo.unidadmedida = JSON.parse(unidadElegida!.valueOf());}}*/>
                                    <option /*selected value={JSON.stringify(Productonuevo.categoriaProducto)}*/>{/*Productonuevo.categoriaProducto.denominacion*/}</option>
                                        { ingredientes!.map(ing => (
                                            // TODO: ing es de clase diferente que ingredientes, comparar nombres
                                            !(producto.ingredientes!.find(ing)) &&
                                            <option value={JSON.stringify(ing)}>{ing.nombre}</option>
                                        ))}
                                    </select>

                                </div>
                                </div> 

                                <div className="container" style={{display: "flex", justifyContent: "space-evenly"}}>
                                <div className="mb-4" style={{display: "flex", maxWidth: "70%", maxHeight: "40%", alignItems: "center", justifyContent: "center" }}>
                                    <label htmlFor="rubro" className="form-label">Ingrediente</label>
                                    <select style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-select" id="medidas" name="medidas" /*onChange={e =>{  setUnidadElegida(e.target.value); Ingredientenuevo.unidadmedida = JSON.parse(unidadElegida!.valueOf());}}*/>
                                    <option /*selected value={JSON.stringify(Productonuevo.categoriaProducto)}*/>{/*Productonuevo.categoriaProducto.denominacion*/}</option>
                                        { medidas!.map(med => (

                                            <option value={JSON.stringify(med)}>{med.denominacion}</option>
                                        ))}
                                    </select>

                                </div>
                                </div> 

                                




                                {/* <button className="btn btn-danger mx-3" onClick={() => cambiarEstado(!estado)}><i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>highlight_off</i></button>

                                <button type="submit" className="btn" style={{backgroundColor: "#864e1b", color: "white"}} onClick={() => {


                                   if((categoriaElegida !== undefined || unidadElegida !== undefined) || (Ingredientenuevo.categoriaIngrediente.id !== 0 || Ingredientenuevo.unidadmedida.id !== 0)){

                                        if(categoriaElegida !== undefined){
                                            Ingredientenuevo.categoriaIngrediente = JSON.parse(categoriaElegida!.valueOf());
                                        }
                                        if(unidadElegida !== undefined){
                                            Ingredientenuevo.unidadmedida = JSON.parse(unidadElegida!.valueOf());
                                        }
                                    
                                    

                                        if(Ingredientenuevo.id !== 0){

                                            //pasar los datos guardados al metodo de update
                                            ingredientesService.updateEntity(Ingredientenuevo);
                                            cambiarEstado(!estado);

                                        }else{
                                            ingredientesService.createEntity(Ingredientenuevo);
                                            cambiarEstado(!estado);
                                            window.location.reload();
                                            
                                        }
 
                                }
                                }}> <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>check</i></button> */}
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>

    );

}

export default ModalAgregarIngrediente;