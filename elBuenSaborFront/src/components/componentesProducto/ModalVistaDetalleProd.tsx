import { useEffect, useState } from "react";
import Producto from "../../context/interfaces/Producto";
import { IngredienteDeProducto } from "../../context/interfaces/IngredienteDeProducto";
import { ProductoService } from "../../services/ProductoService";
import './Dropdown.css';
import TablaIngredientesMostrar from "./TablaIngredientesMostrar";

interface ModalVistaDetalleProps{
    producto: Producto,
    estadoVista:boolean,
    cambiarEstadoVista: any
}

 const ModalVistaDetalleProd: React.FunctionComponent<ModalVistaDetalleProps> = ({ producto, estadoVista, cambiarEstadoVista }) => {

    const prodService = new ProductoService();
     const [ingredientes, setIngredientes] = useState<IngredienteDeProducto[]>([]); ;
     const [unidadElegida, setUnidadElegida] = useState<String>();
    const [categoriaElegida, setCategoriaElegida] = useState<String>();

    const getIngredientes = async() => {
        await prodService.getIngredientes(producto.id!).then((data) => setIngredientes(castIngredientesIds(data)));
        
        
    }

    const castIngredientesIds = (ingredientes: any[]): IngredienteDeProducto[] =>{
        const castIngredientes: IngredienteDeProducto[] = [];

        for(let i=0; i<ingredientes.length; i++) {

            console.log(JSON.stringify(ingredientes[i]));
            

            let nuevoIng: IngredienteDeProducto = new IngredienteDeProducto();

            nuevoIng.cantidad = ingredientes[i].cantidad;
            nuevoIng.id = ingredientes[i].id;
            nuevoIng.ingrediente = ingredientes[i].ingrediente.id;
            nuevoIng.producto = ingredientes[i].producto.id;
            nuevoIng.unidadMedida = ingredientes[i].unidadmedida.id;


            castIngredientes.push(nuevoIng);
        }

        return(castIngredientes);
    }

    useEffect(() => {
        getIngredientes();
    }, [producto, ingredientes]);
    
    

    return(
        <div>
            {estadoVista &&
                <div className="overlay" onClick={() => cambiarEstadoVista(!estadoVista)}>
                <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white", maxWidth: "50%"}} onClick={e => e.stopPropagation()}>
                    <div className="" style={{textAlign: "center"}}>
                        <div className="rounded container pb-2 pt-4" style={{textAlign: "center", backgroundColor: "#864e1b", maxWidth: "40%"}}>
                            <h1>{producto.denominacion}</h1>
                        </div>
                        <hr style={{marginRight: "2%", marginLeft: "2%"}}></hr>
                        <h3>Categoria: {producto.categoriaProducto.denominacion}</h3>
                        <h4>$ {producto.precioTotal.toString()}</h4>
                        <h4>Costo: ${producto.costoTotal.toString()}</h4>
                        <h4>Descripcion:</h4> <p>{producto.descripcion}</p>

                        { producto.esManufacturado &&
                        <div>
                            <hr style={{marginRight: "2%", marginLeft: "2%"}}></hr>
                            <h4>Tiempo de Preparación: {producto.tiempoCocina}</h4>
                            <h4>Receta: </h4><p>{producto.receta}</p>

                            <hr style={{marginRight: "2%", marginLeft: "2%"}}></hr>
                            {/* {producto.ingredientes!.length > 0 && producto.ingredientes != undefined && */}
                            
                            <div>
                            <h4>Ingredientes:</h4>
                                <TablaIngredientesMostrar ingredientesProd={ingredientes} edicion={false}></TablaIngredientesMostrar>
                            
                            </div>

                        </div>

                        }

                    </div>
                    </div>
                    </div>
                
            }
        </div>
    )
}

export default ModalVistaDetalleProd;
