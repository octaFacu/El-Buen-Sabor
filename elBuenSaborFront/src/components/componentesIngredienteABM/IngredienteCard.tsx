import { useEffect, useState } from "react"

import { Ingrediente } from "../../context/interfaces/interfaces";
import { Rubro } from "../compIngrediente/Rubro";

interface IngrCardProps {

    //De categoriaIngrABM, cambio su estado
    estado:boolean,
    cambiarEstado: any


    id?: Number
    denominacion: String
    activo: Boolean

    datos: Ingrediente
    setDatos: any

    categoria: Rubro
}

const IngredienteCard: React.FunctionComponent<IngrCardProps> = ({denominacion, categoria, activo, id, cambiarEstado, estado, setDatos, datos }) => {
    
    const [botonActivo, setbotonActivo] = useState<Boolean>(activo)


    // useEffect(() => {
    //     if(datos.id){
    //         // categoriaIngredienteService.updateActivoRubro(datos)
    //         categoriaIngredienteService.updateEntity("categoriaIngrediente", datos)
            
    //     }
        
    // },[datos])

    return (
        
        <tr className="mb-5" style={botonActivo ? {backgroundColor: '#659355', borderRadius: "25px"} : {backgroundColor: '#C34942', borderRadius: "25px"}}  >

            <td>{denominacion}</td>
            <td>{categoria.denominacion}</td>
            <td>
                <button className="btn mx-2 btn-sm" style={{backgroundColor: "#864e1b"}} ><i className="material-icons" style={{fontSize: "30px", cursor:"pointer", color: "white"}}>remove_red_eye</i></button>
                <button className="btn mx-2 btn-sm" style={{backgroundColor: "#864e1b"}} 
                // onClick={
                    // () => {
                    // setDatos({ id: id, denominacion: denominacion, categoriaIngredientePadre: {id: padre?.id, denominacion: padre?.denominacion, activo: padre?.activo}, activo: activo })
                    // cambiarEstado(!estado)}}
                    ><i className="material-icons" style={{fontSize: "30px", cursor:"pointer", color: "white"}}>create</i></button>

                {/* <button className={`btn btn-sm ${botonActivo ? "btn-danger" : "btn-success"}`} onClick={async() => { */}
                <button className="btn btn-sm" style={{backgroundColor: "#864e1b", color: "white"}} 
                // onClick={async() => { 
                //     setbotonActivo(!botonActivo)
                //    if(padre){
                //     await setDatos({ id: id, denominacion: denominacion, categoriaIngredientePadre: {id: padre?.id, denominacion: padre?.denominacion, activo: padre?.activo}, activo: !activo })
                //    }else{
                //     await setDatos({ id: id, denominacion: denominacion, activo: !activo })
                //    }

                //     console.log(datos)
                //     window.location.reload();
                //     }}
                    >{botonActivo 
                ? <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>not_interested</i> 
                : <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>check</i>}</button>

                
            </td>
            
        </tr>

    );
}

export default IngredienteCard;