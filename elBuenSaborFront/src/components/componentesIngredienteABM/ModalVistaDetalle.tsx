import { Ingrediente } from "../../context/interfaces/interfaces"

interface ModalVistaDetalleProps{
    ingrediente: Ingrediente,
    estadoVista:boolean,
    cambiarEstadoVista: any
}

 const ModalVistaDetalle: React.FunctionComponent<ModalVistaDetalleProps> = ({ ingrediente, estadoVista, cambiarEstadoVista }) => {

    return(
        <div>
            {estadoVista &&
                <div className="overlay" onClick={() => cambiarEstadoVista(!estadoVista)}>
                <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white", maxWidth: "50%"}} onClick={e => e.stopPropagation()}>
                    <div className="" style={{textAlign: "center"}}>
                        <div className="rounded container pb-2 pt-4" style={{textAlign: "center", backgroundColor: "#864e1b", maxWidth: "30%"}}>
                            <h1>{ingrediente.nombre}</h1>
                        </div>
                        <hr style={{marginRight: "2%", marginLeft: "2%"}}></hr>
                        <h3>$ {ingrediente.precioCompra.toString()}</h3>
                        <h3>Stock Actual: {ingrediente.stockActual.toString()}</h3>
                        <h3>Stock Minimo: {ingrediente.stockMinimo.toString()}</h3>
                        <h3>Stock Maximo: {ingrediente.stockMaximo.toString()}</h3>
                        <br></br>
                        <hr style={{marginRight: "2%", marginLeft: "2%"}}></hr>
                        <h3>Unidad de Medida: {ingrediente.unidadmedida.denominacion}</h3>
                        <h3>Categoria: {ingrediente.categoriaIngrediente.denominacion}</h3>

                    </div>
                    </div>
                    </div>
                
            }
        </div>
    )
}

export default ModalVistaDetalle;
