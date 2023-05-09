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
                <div className="overlay"> 
                {/*onClick={cambiarEstadoVista(!estadoVista)}>*/}
                <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white"}}>
                    <div className="" style={{textAlign: "center"}}>

                        <h1>{ingrediente.nombre}</h1>

                    </div>
                    </div>
                    </div>
            }
        </div>
    )
}

export default ModalVistaDetalle;
