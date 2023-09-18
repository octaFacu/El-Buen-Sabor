import { useEffect, useState } from "react"

import { Ingrediente } from "../../context/interfaces/interfaces";
import { Rubro } from "../compIngrediente/Rubro";
import { IngredientesService } from "../../services/IngredientesService";

interface IngrCardProps {

    //De categoriaIngrABM, cambio su estado
    estado:boolean,
    cambiarEstado: any

    estadoVista:boolean,
    cambiarEstadoVista: any,

    estadoCompra:boolean,
    cambiarEstadoCompra: any,


    ingrediente: Ingrediente

    datos: Ingrediente
    setearDatos: any

    
}

const IngredienteCard: React.FunctionComponent<IngrCardProps> = ({ingrediente, cambiarEstado, estado, cambiarEstadoVista, estadoVista, cambiarEstadoCompra, estadoCompra, setearDatos, datos }) => {
    
    const [botonActivo, setbotonActivo] = useState<Boolean>(ingrediente.activo)

    const ingredientesService = new IngredientesService();

    // useEffect(() => {
    //     if(datos.id){
    //         // categoriaIngredienteService.updateActivoRubro(datos)
    //         categoriaIngredienteService.updateEntity("categoriaIngrediente", datos)
            
    //     }
        
    // },[datos])

    return (
        
        <tr className="mb-5" style={
            botonActivo 
            ? (ingrediente.stockActual <= ingrediente.stockMinimo 
              ? { backgroundColor: '#eb5f0e', borderRadius: '25px' } // Orange background
              : { backgroundColor: '#659355', borderRadius: '25px' } // Green background
              )
            : { backgroundColor: '#C34942', borderRadius: '25px' } // Red background
          }  >
            <td></td>
            <td>{ingrediente.nombre}</td>
            <td>{ingrediente.categoriaIngrediente.denominacion}</td>
            <td></td>
            <td>
                <button className="btn mx-2 btn-sm" style={{backgroundColor: "#864e1b"}}
                onClick={
                      () => {
                        
                     setearDatos(ingrediente)
                      
                      cambiarEstadoVista(!estado)}} >
                    <i className="material-icons" style={{fontSize: "30px", cursor:"pointer", color: "white"}}>remove_red_eye</i></button>
                <button className="btn mx-2 btn-sm" style={{backgroundColor: "#864e1b"}} 
                onClick={
                    () => {
                    setearDatos(ingrediente)
                    cambiarEstado(!estado)}}
                    ><i className="material-icons" style={{fontSize: "30px", cursor:"pointer", color: "white"}}>create</i></button>

                {/* <button className={`btn btn-sm ${botonActivo ? "btn-danger" : "btn-success"}`} onClick={async() => { */}
                <button className="btn btn-sm" style={{backgroundColor: "#864e1b", color: "white"}} 
                onClick={async() => { 
                    setbotonActivo(!botonActivo)
                   
                    let ingredienteNuevo: Ingrediente = ingrediente;
                    ingredienteNuevo.activo = !(ingrediente.activo);
                    // await setearDatos(ingredienteNuevo)
                   
                    await ingredientesService.updateEntity(ingredienteNuevo);

                    //console.log(ingredienteNuevo);
                    // window.location.reload();
                    }}
                    >{botonActivo 
                ? <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>not_interested</i> 
                : <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>check</i>}</button>

                
            </td>
            <td></td>
            <td ><button className="btn mx-2 btn-sm" style={{backgroundColor: "#864e1b"}} 
                onClick={
                     () => {
                     setearDatos(ingrediente)
                     cambiarEstadoCompra(!estadoCompra)}}
                ><i className="material-icons" style={{fontSize: "30px", cursor:"pointer", color: "white"}}>add_shopping_cart</i></button></td>
            
        </tr>

    );
}

export default IngredienteCard;