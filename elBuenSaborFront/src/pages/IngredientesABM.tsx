import { useEffect, useState } from "react";
import { GlobalContext, useUnidadContext } from "../context/GlobalContext"
import { IngredientesService } from "../services/IngredientesService"
import { Ingrediente } from "../context/interfaces/interfaces";
import { Rubro } from "../components/compIngrediente/Rubro";
import IngredienteCard from "../components/componentesIngredienteABM/IngredienteCard";
import ModalVistaDetalle from "../components/componentesIngredienteABM/ModalVistaDetalle";
import { ListaCartasABM } from "../components/genericos/ListaCartasABM";



export const IngredientesABM = () => {

    const { unidadesDeMedida, ingredientes } = useUnidadContext();

    //Para la ventana modal del formulario
    const [estadoModal, setEstadoModal] = useState(false);
    const [estadoModalVista, setEstadoModalVista] = useState(false);
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

    function resetDatos() {
        setDatos({ id: 0,
            activo: true,
            nombre: '',
            precioCompra: 0,
            stockActual: 0,
            stockMaximo: 0,
            stockMinimo: 0,
            unidadmedida: {id: 0, denominacion: '', unidadesParaPadre: 0, padre: {id: 0, denominacion: '', unidadesParaPadre: 0}},
            categoriaIngrediente: {id: 0, denominacion: '', activo: true} })
    }

    function sendDatos(ingrediente: Ingrediente){
        console.log("ME VOY A SETEAR: "+ingrediente.nombre)
        setDatos(ingrediente);
    }
    

    if(ingredientes.length === 0){
        return <div style={{textAlign: "center"}}>
            Loading...
        </div>
    }

    

    


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


        
        <ListaCartasABM 
        titulo="Ingredientes"
        estado={estadoModal}
        setEstadoModal={setEstadoModal}
        recetDatos={resetDatos}
        >
            
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
                                    ingrediente={ing}

                                    // rubros={rubros}
                                    // setRubros={setRubros}

                                    estado={estadoModal}
                                    cambiarEstado={setEstadoModal}
                                    estadoVista={estadoModalVista}
                                    cambiarEstadoVista={setEstadoModalVista}

                                    datos={datos}
                                    setearDatos={sendDatos}
                                />
                               
                                
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            </ListaCartasABM>
            {/* <CategIngrForm
                estado={estadoModal}
                cambiarEstado={setEstadoModal}
                rubrosPadre={rubrosPadre}
                datos={datos}
                setDatos={setDatos}
            /> */}
            <ModalVistaDetalle ingrediente= {datos} estadoVista={estadoModalVista} cambiarEstadoVista={setEstadoModalVista}/>

            </div >
        
    )

}