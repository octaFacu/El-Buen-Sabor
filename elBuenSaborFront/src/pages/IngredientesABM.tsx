import { useState } from "react";
import { GlobalContext, useUnidadContext } from "../context/GlobalContext"
import { IngredientesService } from "../services/IngredientesService"
import { Ingrediente } from "../context/interfaces/interfaces";
import { Rubro } from "../components/compIngrediente/Rubro";
import IngredienteCard from "../components/componentesIngredienteABM/IngredienteCard";



export const IngredientesABM = () => {

    const { unidadesDeMedida, ingredientes } = useUnidadContext();

    //Para la ventana modal del formulario
    const [estadoModal, setEstadoModal] = useState(false);
    const [datos, setDatos] = useState<Ingrediente>({
        id: 0,
        activo: true,
        nombre: '',
        precioCompra: 0,
        stockActual: 0,
        stockMaximo: 0,
        stockMinimo: 0,
        unidadmedida: {id: 0, denominacion: '', unidadesParaPadre: 0, padre: {id: 0, denominacion: '', unidadesParaPadre: 0}},
        categoriaIngrediente: {id: 0, denominacion: '', activo: true}
    })


    return (
        <div>

        {/* <GlobalContext.Consumer>
            {(context) => (
            <div>
                {context.ingredientes.map((ingrediente) => (
                <div key={ingrediente.id.toString()}>{ingrediente.nombre} {ingrediente.precioCompra.toString()} {ingrediente.unidadmedida.denominacion} {ingrediente.categoriaIngrediente.denominacion}</div>
                ))}
            </div>
            )}
        </GlobalContext.Consumer> */}


        
        <div className="container my-5 pb-1 mb-3" style={{background: "#f99132", borderRadius: "25px"}}>
            <div style={{background: "#864e1b", borderRadius: "25px"}}>
            <div className="text-center py-2 px-3" style={{ display: "inline" }}>
                <button className="btn btn-sm mt-5" style={{background: "#f99132", color: "white", borderRadius: "50px"}} 
                // onClick={() => {
                //     setDatos({id: undefined, nombre:"", categoriaIngredientePadre: {id: undefined, denominacion: "", activo: true}, activo: true })
                //     setEstadoModal(!estadoModal)}}
                    ><i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>add</i></button>
                <h1 style={{color: "white"}}> Ingredientes</h1>
            </div></div>
            
            <div className="row my-3">

                <div className="">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Categoria</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredientes.map(ing => (
                                
                                <IngredienteCard
                                    key={Math.random() * 100}
                                    id={ing.id}
                                    denominacion={ing.nombre}
                                    categoria={ing.categoriaIngrediente}
                                    activo={ing.activo}

                                    // rubros={rubros}
                                    // setRubros={setRubros}

                                    estado={estadoModal}
                                    cambiarEstado={setEstadoModal}

                                    datos={datos}
                                    setDatos={setDatos}
                                />
                               
                                
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
             
            {/* <CategIngrForm
                estado={estadoModal}
                cambiarEstado={setEstadoModal}
                rubrosPadre={rubrosPadre}
                datos={datos}
                setDatos={setDatos}
            /> */}
            
        </div >
        <br></br>
        </div>
    )

}