import { GlobalContext } from "../context/GlobalContext"
import { IngredientesService } from "../services/IngredientesService"



export const IngredientesABM = () => {


    return (
        <div>

        <GlobalContext.Consumer>
            {(context) => (
            <div>
                {context.ingredientes.map((ingrediente) => (
                <div key={ingrediente.id.toString()}>{ingrediente.nombre} {ingrediente.precioCompra.toString()} {ingrediente.unidadmedida.denominacion} {ingrediente.categoriaIngrediente.denominacion}</div>
                ))}
            </div>
            )}
        </GlobalContext.Consumer>


        
        {/* <div className="container my-5 pb-1 mb-3" style={{background: "#f99132", borderRadius: "25px"}}>
            <div style={{background: "#864e1b", borderRadius: "25px"}}>
            <div className="text-center py-2 px-3" style={{ display: "inline" }}>
                <button className="btn btn-sm mt-5" style={{background: "#f99132", color: "white", borderRadius: "50px"}} onClick={() => {
                    setDatos({id: undefined, denominacion:"", categoriaIngredientePadre: {id: undefined, denominacion: "", activo: true}, activo: true })
                    setEstadoModal(!estadoModal)
                }}><i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>add</i></button>
                <h1 style={{color: "white"}}> Rubro de ingredientes</h1>
            </div></div>
            
            <div className="row my-3">

                <div className="">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Padre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rubros.map(rub => (
                                
                                <CateIngrCard
                                    key={Math.random() * 100}
                                    id={rub.id}
                                    denominacion={rub.denominacion}
                                    padre={rub.categoriaIngredientePadre}
                                    activo={rub.activo}

                                    rubros={rubros}
                                    setRubros={setRubros}

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
            
            <CategIngrForm
                estado={estadoModal}
                cambiarEstado={setEstadoModal}
                rubrosPadre={rubrosPadre}
                datos={datos}
                setDatos={setDatos}
            />
            
        </div >
        <br></br> */}
        </div>
    )

}