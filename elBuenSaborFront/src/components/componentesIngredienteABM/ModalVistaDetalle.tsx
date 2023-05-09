import { Ingrediente } from "../../context/interfaces/interfaces"

interface ModalVistaDetalleProps{
    ingrediente: Ingrediente,
    estadoVista:boolean,
    cambiarEstadoVista: any
}

 const ModalVistaDetalle: React.FunctionComponent<ModalVistaDetalleProps> = ({ ingrediente, estadoVista, cambiarEstadoVista }) => {

console.log("INGREDIENTE QUE LE ESTAMOS PASANDO: "+ingrediente.nombre);

    return(
        <div>
            {estadoVista &&
                <div className="overlay" onClick={() => cambiarEstadoVista(!estadoVista)}>
                <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white"}} onClick={e => e.stopPropagation()}>
                    <div className="" style={{textAlign: "center"}}>

                        <h1>{ingrediente.nombre}</h1>
                        <h2>{ingrediente.precioCompra.toString()}</h2>
                        <h2>Stock Actual: {ingrediente.stockActual.toString()}</h2>
                        <h2>Stock Minimo: {ingrediente.stockMinimo.toString()}</h2>
                        <h2>Stock Maximo: {ingrediente.stockMaximo.toString()}</h2>
                        <br></br>
                        <h2>Unidad de Medida: {ingrediente.unidadmedida.denominacion}</h2>
                        <h2>Categoria: {ingrediente.categoriaIngrediente.denominacion}</h2>

                    </div>
                    </div>
                    </div>
            }
        </div>
    )
}

export default ModalVistaDetalle;
