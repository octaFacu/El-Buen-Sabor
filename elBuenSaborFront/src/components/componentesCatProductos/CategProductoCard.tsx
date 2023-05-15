import { useEffect, useState } from "react"
import "../../pages/pagesStyles/categoriaIngredienteABM.css"
import { CategoriaIngredienteService } from "../../services/CategoriaIngredienteService";
import { CategoriaProducto } from "../../context/interfaces/interfaces";
import { CategoriaProductoService } from "../../services/CategoriaProductoService";

interface CategProductoCardProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: any

    id?: number
    denominacion: string
    activo: boolean

    datos: CategoriaProducto
    setDatos: any
}

const CategProductoCard: React.FunctionComponent<CategProductoCardProps> = ({denominacion, activo, id, cambiarEstado, estado, setDatos, datos}) => {
    
    const [botonActivo, setbotonActivo] = useState<Boolean>(activo)
    const categoriaProductoService = new CategoriaProductoService();

    useEffect(() => {
        if(datos.id){
            // categoriaIngredienteService.updateActivoRubro(datos)
            categoriaProductoService.updateEntity(datos)
            
        }
        
    },[datos])

    return (
        
        <tr className="" style={botonActivo ? {backgroundColor: '#659355', borderRadius: "25px"} : {backgroundColor: '#C34942', borderRadius: "25px"}}  >

            <td>{denominacion}</td>
            
            <td>
                <button className="btn mx-2 btn-sm" style={{backgroundColor: "#864e1b"}} onClick={
                    () => {
                    setDatos({ id: id, denominacion: denominacion, activo: activo })
                    cambiarEstado(!estado)
                }}><i className="material-icons" style={{fontSize: "30px", cursor:"pointer", color: "white"}}>create</i></button>

                {/* <button className={`btn btn-sm ${botonActivo ? "btn-danger" : "btn-success"}`} onClick={async() => { */}
                <button className="btn btn-sm" style={{backgroundColor: "#864e1b", color: "white"}} onClick={async() => { 
                    setbotonActivo(!botonActivo)
                   
                    await setDatos({ id: id, denominacion: denominacion, activo: !activo })
                   

                    console.log(datos)
                    window.location.reload();
                    
                }}>{botonActivo 
                ? <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>not_interested</i> 
                : <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>check</i>}</button>

                
            </td>
            
        </tr>

    );
}

export default CategProductoCard;