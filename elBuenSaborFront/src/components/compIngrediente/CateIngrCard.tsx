import { useEffect, useState } from "react"
import { Rubro } from "./Rubro";

interface CateIngrCardProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: any
    rubros: Rubro[]
    setRubros: any

    id?: Number
    denominacion: string
    padre?: Rubro
    activo: boolean

    setDatos: any
}

const CateIngrCard: React.FunctionComponent<CateIngrCardProps> = ({denominacion, padre, activo, id, cambiarEstado, estado, setDatos, rubros, setRubros}) => {
    
    // denominacion ? console.log("padre:" + denominacion) : console.log("no hay nombre")
    padre ? console.log("padre:" + padre) : console.log("no hay padre")
    // console.log("activo:" + activo)

    return (

        <tr style={activo ? {backgroundColor: '#659355'} : {backgroundColor: '#C34942'}}  >
            <td>{denominacion}</td>
            {padre ? (<td>{padre.denominacion}</td>) : <td>none</td>}
            <td>
                <button className="btn mx-2 btn-sm btn-primary" onClick={
                    () => {
                    setDatos({ id: id, denominacion: denominacion, categoriaPadre: padre?.denominacion, activo: activo })
                    cambiarEstado(!estado)
                }}>Editar</button>
                <button className="btn btn-sm btn-danger">Desactivar</button>

                {/* {activoCd ? <button className="btn btn-sm btn-danger" onClick={() => setActivoCard(!activo)}>Desactivar</button> : <button className="btn btn-sm btn-success" onClick={() => setActivoCard(activo)}>Activar</button>} */}
                
            </td>
        </tr>

    );
}

export default CateIngrCard;