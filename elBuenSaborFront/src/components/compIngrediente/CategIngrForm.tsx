import { useEffect, useState } from "react"
import { Rubro } from "./Rubro";
import "../../css/ventanaModal.css"
import { PadreRubro } from "./PadreRubro";
import { CategoriaIngredienteService } from "../../services/CategoriaIngredienteService";
import { ServiceBasicos } from "../../services/ServiceBasicos";

interface CaracIngrFormProps {

    //De categoriaIngrABM, cambio su estado
    estado: boolean,
    cambiarEstado: any

    rubrosPadre: Rubro[]

    datos?: any
    setDatos: any
}

const CaracIngrForm: React.FunctionComponent<CaracIngrFormProps> = ({ estado, cambiarEstado, rubrosPadre, datos, setDatos }) => {

    const categoriaIngredienteService = new CategoriaIngredienteService();

    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [padre, setPadre] = useState<PadreRubro>({ id: undefined, denominacion: '', activo: true })
    const [padreGuardar, setPadreGuardar] = useState('');
    const [activo, setActivo] = useState('')
    const [esPadre, setEsPadre] = useState<Boolean>()

    var creando: boolean;
    if(!datos.id){
        creando = true;
    }else{
        creando = false;
    }

    console.log("-----Estado datos-------");
    console.log(datos);


    //Setear toda la informacion de los datos que le pasamos al form
    useEffect(() => {
        setNombre(datos.denominacion);
        setPadre(datos.categoriaIngredientePadre);
        setActivo(datos.activo);
        setId(datos.id);
        chequearSiPadre();


        

        
    }, [datos.id, datos.denominacion, datos.categoriaIngredientePadre, datos.activo])

    const chequearSiPadre = async () => {

        return await categoriaIngredienteService.getAllPadresConHijos().then(data => {
            //DICE QUE SON PADRE TODOS LOS QUE SON PADRE Y NO SON HIJOS
            // console.log(data);
            // console.log(datos.id)

            const padreEncontrado: PadreRubro | undefined = data.find((obj: PadreRubro) => (obj.id?.toString() == datos.id));
            if(padreEncontrado !== undefined){
                setEsPadre(true);
            }else{
                setEsPadre(false);
            }
            
                
        });

    }
    
    
        

    

    if (padre === undefined || esPadre === undefined) {

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
                                <h3 className="mb-3">Agregar Rubro de Ingrediente</h3>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} type="text" className="form-control" id="nombre" name="nombre" required value={nombre} onChange={e => setNombre(e.target.value)} />
                                </div>

                                
                                { !esPadre &&
                                

                                <div className="mb-3">
                                    <label htmlFor="rubro" className="form-label">Rubro padre</label>
                                    <select style={{borderRadius: "25px", backgroundColor: "#FDA859", color: "white"}} className="form-select" id="rubro" name="rubro" onChange={e => setPadreGuardar(e.target.value)}>
                                        {padre.denominacion === "" || padre.denominacion === undefined
                                        ? <option selected value="">No tiene rubro padre</option>
                                        : <><option selected value={JSON.stringify(padre)}>{padre.denominacion}</option> <option value="">No tiene rubro padre</option> </>
                                        }
                                        {rubrosPadre.map(rubro => (
                                            
                                            padre.denominacion !== rubro.denominacion && nombre !== rubro.denominacion
                                            && (rubro.id! < parseInt(id) || creando === true) && <option value={JSON.stringify(rubro)}>{rubro.denominacion}</option>
                                            ))}
                                    </select>
                                </div>}
                                <button className="btn btn-danger mx-3" onClick={() => cambiarEstado(!estado)}><i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>highlight_off</i></button>

                                <button type="submit" className="btn" style={{backgroundColor: "#864e1b", color: "white"}} onClick={() => {

                                   
                                    if(datos.id){

                                        //Si hay un padre seleccionado
                                        if(padreGuardar){


                                            let padreAPersistir: PadreRubro = JSON.parse(padreGuardar);

                                            //guardar los datos con un padre
                                            setDatos({id: id, denominacion:nombre, categoriaIngredientePadre: { id: padreAPersistir.id, denominacion: padreAPersistir.denominacion, activo: padreAPersistir.activo }, activo: activo })
                                            
                                        }else{
                                            //guardar los datos sin un padre
                                            setDatos({id: id, denominacion:nombre, activo: activo })
                                        }

                                        //pasar los datos guardados al metodo de update
                                        categoriaIngredienteService.updateEntity(datos)

                                    }else{
                                        // chequear si la nueva categoria tiene seleccionado un padre
                                        if(padreGuardar){

                                            //Pasar los datos del padre de string a json
                                            let padreAPersistir: PadreRubro = JSON.parse(padreGuardar);

                                            //Creacion de nueva categoria con un padre

                                            // categoriaIngredienteService.createRubro({denominacion: nombre, categoriaPadre: {id: padreAPersistir.id}, activo: activo })
                                            categoriaIngredienteService.createEntity({denominacion: nombre, categoriaIngredientePadre: {id: padreAPersistir.id}, activo: activo })

                                         }else{
                                            //Creacion de nueva categoria sin un padre
                                            categoriaIngredienteService.createEntity({denominacion: nombre, activo: activo })
                                            
                                        }
                                        
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

export default CaracIngrForm;

