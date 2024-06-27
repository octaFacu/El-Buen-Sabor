import { useEffect, useState } from "react";
import Producto from "../../context/interfaces/Producto";
import { IngredienteDeProducto } from "../../context/interfaces/IngredienteDeProducto";
import { ProductoService } from "../../services/ProductoService";
import './Dropdown.css';
import TablaIngredientesMostrar from "./TablaIngredientesMostrar";
import { useUnidadContext } from "../../context/GlobalContext";

interface ModalVistaDetalleProps {
    producto: Producto,
    estadoVista: boolean,
    cambiarEstadoVista: any
}

const ModalVistaDetalleProd: React.FunctionComponent<ModalVistaDetalleProps> = ({ producto, estadoVista, cambiarEstadoVista }) => {

    const prodService = new ProductoService();
    const [ingredientes, setIngredientes] = useState<IngredienteDeProducto[]>([]);;
    const { rol } = useUnidadContext();


    const getIngredientes = async () => {
        setIngredientes([]);
        await prodService.getIngredientes(producto.id!, rol).then((data) => setIngredientes(castIngredientesIds(data)));


    }

    const castIngredientesIds = (ingredientes: any[]): IngredienteDeProducto[] => {
        const castIngredientes: IngredienteDeProducto[] = [];

        for (let i = 0; i < ingredientes.length; i++) {

            console.log(JSON.stringify(ingredientes[i]));


            let nuevoIng: IngredienteDeProducto = new IngredienteDeProducto();

            nuevoIng.cantidad = ingredientes[i].cantidad;
            nuevoIng.id = ingredientes[i].id;
            nuevoIng.idIngrediente = ingredientes[i].ingrediente.id;
            nuevoIng.idProducto = ingredientes[i].producto.id;
            nuevoIng.idMedida = ingredientes[i].unidadmedida.id;

            castIngredientes.push(nuevoIng);
        }
        console.log("Los ingredientes han sido cargados!");
        return (castIngredientes);
    }

    useEffect(() => {
        /*if(ingredientes.length > 0){
            if(ingredientes[0].idProducto !== producto.id){
                getIngredientes();
                console.log("Han cambiado los ingredientes");
            }
        }else{*/
        getIngredientes();
        console.log("Han cambiado los ingredientes...");
        //}

    }, [producto, estadoVista]);

    useEffect(() => {
        if (ingredientes.length > 0) {
            //if(!estadoVista && ingredientes[0].idProducto !== producto.id){
            setIngredientes([]);
            //}
        }


    }, [estadoVista]);



    return (
        <div>
            {estadoVista &&
                <div className="overlay" onClick={() => cambiarEstadoVista(!estadoVista)}>
                    <div className="container my-5 contenedorModal modal-dialog-scrollable" style={{ borderRadius: "25px", backgroundColor: "#f99132", color: "white", maxWidth: "50%" }} onClick={e => e.stopPropagation()}>
                        <div className="" style={{ textAlign: "center", overflowY: 'auto', maxHeight: '650px' }}>
                            <div className="rounded container pb-2 pt-4" style={{ textAlign: "center", backgroundColor: "#864e1b", maxWidth: "40%" }}>
                                <h1>{producto.denominacion}</h1> <img className="imagen-style" src={producto.imagen}></img>
                            </div>
                            <hr style={{ marginRight: "2%", marginLeft: "2%" }}></hr>
                            <h3>Categoria: {producto.categoriaProducto.denominacion}</h3>
                            <h4>$ {producto.precioTotal.toString()}</h4>
                            <h4>Costo: ${producto.costoTotal.toString()}</h4>
                            <h4>Descripcion:</h4> <p>{producto.descripcion}</p>
                            {(!producto.esManufacturado || producto.receta == null) &&
                                <h4>Stock: {producto.stock!.toString()}</h4>
                            }

                            {producto.esManufacturado && producto.receta != "" && producto.receta != null &&
                                <div>
                                    <hr style={{ marginRight: "2%", marginLeft: "2%" }}></hr>
                                    <h4>Tiempo de Preparación: {producto.tiempoCocina}</h4>
                                    <h4>Receta: </h4><p>{producto.receta}</p>

                                    <hr style={{ marginRight: "2%", marginLeft: "2%" }}></hr>
                                    {ingredientes!.length > 0 &&

                                        <div>
                                            <h4>Ingredientes:</h4>
                                            <TablaIngredientesMostrar productoId={producto.id!} ingredientesProd={ingredientes} edicion={false}></TablaIngredientesMostrar>

                                        </div>
                                    }

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