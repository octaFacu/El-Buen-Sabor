import { useEffect, useState } from "react"
import { Rubro } from "./Rubro";

interface CateIngrCardProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: any
    rubros: Rubro[]
    setRubros: any

    nombre: string
    padre?: string
    activo: boolean

    setDatos: any
}

const CateIngrCard: React.FunctionComponent<CateIngrCardProps> = ({nombre, padre, activo, cambiarEstado, estado, setDatos, rubros, setRubros}) => {

    return (

        <tr style={activo ? {backgroundColor: '#659355'} : {backgroundColor: '#C34942'}}  >
            <td>{nombre}</td>
            <td>{padre ? padre : "none"}</td>
            <td>
                <button className="btn mx-2 btn-sm btn-primary" onClick={
                    () => {
                    setDatos({nombreCard: nombre, padreCard: padre, activoCard: activo})
                    cambiarEstado(!estado)
                }}>Editar</button>
                <button className="btn btn-sm btn-danger">Desactivar</button>

                {/* {activoCd ? <button className="btn btn-sm btn-danger" onClick={() => setActivoCard(!activo)}>Desactivar</button> : <button className="btn btn-sm btn-success" onClick={() => setActivoCard(activo)}>Activar</button>} */}
                
            </td>
        </tr>

    );
}

export default CateIngrCard;