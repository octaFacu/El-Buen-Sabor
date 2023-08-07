import { useState } from "react";
import { Ingrediente } from "../../context/models/interfaces"
import { IngredientesService } from "../../services/IngredientesService";

interface ModalCompraProps {
    ingrediente: Ingrediente,
    estadoCompra: boolean,
    cambiarEstadoCompra: any
}

const ModalCompra: React.FunctionComponent<ModalCompraProps> = ({ ingrediente, estadoCompra, cambiarEstadoCompra }) => {


    let Ingredientenuevo: Ingrediente;
    const [cantidadAgregar, setCantidadAgregar] = useState<number>(0);
    const [precio, setPrecio] = useState<Number>(0);
    const ingredientesService = new IngredientesService();



    return (
        <div>
            {estadoCompra &&
                <div className="overlay" onClick={() => cambiarEstadoCompra(!estadoCompra)}>
                    <div className="container my-5 contenedorModal" style={{ borderRadius: "25px", backgroundColor: "#f99132", color: "white", maxWidth: "50%" }} onClick={e => e.stopPropagation()}>
                        <div className="" style={{ textAlign: "center" }}>
                            <div className="rounded container pb-2 pt-4" style={{ textAlign: "center", backgroundColor: "#864e1b", maxWidth: "60%" }}>
                                <h2>Añadir compra de {ingrediente.nombre}</h2>
                            </div>
                        </div>
                        <div className="container mt-4" style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <div style={{ display: "flex" }}>
                                <div className="mb-3 mr-2 text-center">
                                    <label htmlFor="stockActual" className="form-label"><h4>Precio Compra</h4></label>
                                    <input type="number" style={{ borderRadius: "25px", backgroundColor: "#FDA859", color: "white" }} className="form-control" id="precioCompra" name="precioCompra" required value={precio.toString()} onChange={(e) => setPrecio(+e.target.value)} />
                                    <h4>$</h4>
                                </div>
                                <div className="mb-3 ml-2 text-center">
                                    <label htmlFor="stockActual" className="form-label"><h4>Cant. Comprada</h4></label>
                                    <input type="number" style={{ borderRadius: "25px", backgroundColor: "#FDA859", color: "white" }} className="form-control" id="stockActual" name="stockActual" required value={cantidadAgregar.toString()} onChange={(e) => setCantidadAgregar(+e.target.value)} />
                                    <h4>{ingrediente.unidadmedida.denominacion}/s</h4>
                                </div>
                            </div>
                        </div>


                        <div className="container mt-4" style={{ display: "flex", justifyContent: "center" }}>
                        <button className="btn btn-danger mx-3" onClick={() => cambiarEstadoCompra(!estadoCompra)}><i className="material-icons" style={{ fontSize: "30px", cursor: "pointer" }}>highlight_off</i></button>

                        <button type="submit" className="btn" style={{ backgroundColor: "#864e1b", color: "white" }} onClick={() => {


                            if (cantidadAgregar !== 0 && precio !== 0) {

                                ingrediente.stockActual += cantidadAgregar;

                                ingrediente.precioCompra = precio;

                                ingredientesService.updateEntity(ingrediente);
                                cambiarEstadoCompra(!estadoCompra);

                            }
                        }}> <i className="material-icons" style={{ fontSize: "30px", cursor: "pointer" }}>check</i></button>
                        </div>
                    </div>
                </div>

            }
        </div>
    );
}

export default ModalCompra;