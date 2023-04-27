import { useEffect, useState } from "react"
import { Rubro } from "./Rubro";
import { PadreRubro } from "./PadreRubro";
import { CategoriaIngredienteService } from "./CategoriaIngredienteService";

interface CateIngrCardProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: any
    rubros: Rubro[]
    setRubros: any

    id?: Number
    denominacion: string
    padre?: PadreRubro
    activo: boolean

    datos: Rubro
    setDatos: any
}

const CateIngrCard: React.FunctionComponent<CateIngrCardProps> = ({denominacion, padre, activo, id, cambiarEstado, estado, setDatos, datos, rubros, setRubros}) => {
    
    const [botonActivo, setbotonActivo] = useState<Boolean>(activo)
    const categoriaIngredienteService = new CategoriaIngredienteService();

    useEffect(() => {
        if(datos.id){
            categoriaIngredienteService.updateActivoRubro(datos)
            
        }
        
    },[datos])

    return (

        <tr style={botonActivo ? {backgroundColor: '#659355'} : {backgroundColor: '#C34942'}}  >
            <td>{denominacion}</td>
            {padre ? (<td>{padre.denominacion}</td>) : <td>none</td>}
            <td>
                <button className="btn mx-2 btn-sm btn-primary" onClick={
                    () => {
                    setDatos({ id: id, denominacion: denominacion, categoriaPadre: {id: padre?.id, denominacion: padre?.denominacion, activo: padre?.activo}, activo: activo })
                    cambiarEstado(!estado)
                }}>Editar</button>

                <button className={`btn btn-sm ${botonActivo ? "btn-danger" : "btn-success"}`} onClick={async() => {
                    setbotonActivo(!botonActivo)
                   if(padre){
                    await setDatos({ id: id, denominacion: denominacion, categoriaPadre: {id: padre?.id, denominacion: padre?.denominacion, activo: padre?.activo}, activo: !activo })
                   }else{
                    await setDatos({ id: id, denominacion: denominacion, activo: !activo })
                   }

                    console.log(datos)
                    window.location.reload();
                    
                }}>{botonActivo ? "Desactivar" : "Activar"}</button>

                
            </td>
        </tr>

    );
}

export default CateIngrCard;