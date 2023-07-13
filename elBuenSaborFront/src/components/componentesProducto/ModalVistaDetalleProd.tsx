import { useEffect, useState } from "react";
import Producto from "../../context/interfaces/Producto";
import { IngredienteDeProducto } from "../../context/interfaces/interfaces";
import { ProductoService } from "../../services/ProductoService";
import './Dropdown.css';

interface ModalVistaDetalleProps{
    producto: Producto,
    estadoVista:boolean,
    cambiarEstadoVista: any
}

 const ModalVistaDetalleProd: React.FunctionComponent<ModalVistaDetalleProps> = ({ producto, estadoVista, cambiarEstadoVista }) => {

    const prodService = new ProductoService();
     const [ingredientes, setIngredientes] = useState<IngredienteDeProducto[]>([]); ;

    useEffect(() => {
        prodService.getIngredientes(producto.id!).then((data) => setIngredientes(data));
    })
    

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
                        {/* <hr style={{marginRight: "2%", marginLeft: "2%"}}></hr>
                        <h3>Unidad de Medida: {ingrediente.unidadmedida.denominacion}</h3>
                        <h3>Categoria: {ingrediente.categoriaIngrediente.denominacion}</h3> */}
                        { producto.esManufacturado &&
                        <div>
                            <hr style={{marginRight: "2%", marginLeft: "2%"}}></hr>
                            <h4>Tiempo de Preparación: {producto.tiempoCocina}</h4>
                            <h4>Receta: </h4><p>{producto.receta}</p>

                            {/* {producto.ingredientes!.length > 0 && producto.ingredientes != undefined && */}
                            {ingredientes.length != 0 &&
                            <div>
                            <h4>Ingredientes:</h4>

                            <select className="select-dropdown">
                            {ingredientes!.map((ingrediente) => (
                                
                                <option value={ingrediente.ingrediente.id?.toString()}>
                                {ingrediente.ingrediente.nombre} | {ingrediente.cantidad.toString()} {ingrediente.unidadmedida.denominacion}
                                </option>
                            ))}
                            </select>
                            </div>}

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
