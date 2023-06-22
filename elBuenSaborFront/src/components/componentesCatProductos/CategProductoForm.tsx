import { useEffect, useState } from "react"

import "../../css/ventanaModal.css"

import { CategoriaIngredienteService } from "../../services/CategoriaIngredienteService";
import { ServiceBasicos } from "../../../../../../Programación - S4/Laboratorio de Computación IV/importante/parcialN1-LabIV/src/services/ServiceBasicos";
import { CategoriaProductoService } from "../../services/CategoriaProductoService";


interface CategProductoFormProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: any

    datos?: any
    setDatos: any
}

const CategProductoForm: React.FunctionComponent<CategProductoFormProps> = ({ estado, cambiarEstado, datos, setDatos }) => {

    const categoriaProductoService = new CategoriaProductoService();

    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [activo, setActivo] = useState('')

    console.log("-----Estado datos-------");
    console.log(datos);


    //Setear toda la informacion de los datos que le pasamos al form
    useEffect(() => {
        setNombre(datos.denominacion);

        setActivo(datos.activo);
        setId(datos.id);



        

        
    }, [datos.id, datos.denominacion, datos.activo])

    
    
    
        

    

    if (datos === undefined) {

            return (
                <>
                    {estado &&
                        <h1>LOADING!</h1>
                    }
                </>
            )
    }

    

    // console.log("-----info-------");
    // console.log(id);
    // console.log("Nombre:" + nombre);
    // console.log("Padre: " + padre.denominacion);
    // console.log(activo);

    

    return (
        <>
            {estado &&
                <div className="overlay">
                    <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", color: "white"}}>
                        <div className="" style={{textAlign: "center"}}>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                               
                            }}>
                                <h3 className="mb-3">Agregar Rubro de Producto</h3>
                                <div className="mb-3 center-block">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <div>
                                        <input style={{margin:"auto", borderRadius: "25px", backgroundColor: "#FDA859", color: "white", maxWidth: "50%"}} type="text" className="form-control" id="nombre" name="nombre" required value={nombre} onChange={e => setNombre(e.target.value)} />
                                    </div>
                                </div>

                                
                                
                                <button className="btn btn-danger mx-3" onClick={() => cambiarEstado(!estado)}><i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>highlight_off</i></button>

                                <button type="submit" className="btn" style={{backgroundColor: "#864e1b", color: "white"}} onClick={() => {

                                   
                                    if(datos.id){

                                        
                                            //guardar los datos sin un padre
                                            setDatos({id: id, denominacion:nombre, activo: activo })
                                        

                                        //pasar los datos guardados al metodo de update
                                        categoriaProductoService.updateEntity(datos)

                                    }else{
                                        
                                         
                                        //Creacion de nueva categoria sin un padre
                                        categoriaProductoService.createEntity({denominacion: nombre, activo: activo });
                                        
                                    }
                                    //Cambiar el estado para que se cierre el formulario
                                    cambiarEstado(!estado);
                                    //Actualizar la pagina
                                    window.location.reload();
                                }}> <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>check</i></button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default CategProductoForm;

