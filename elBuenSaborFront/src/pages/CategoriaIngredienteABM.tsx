
import CateIngrCard from "../components/compIngrediente/CateIngrCard";
import CategIngrForm from "../components/compIngrediente/CategIngrForm";
import { useState, useEffect } from "react";
import { GlobalContext, useUnidadContext } from "../context/GlobalContext";


import { Rubro } from "../components/compIngrediente/Rubro";
import { CategoriaIngredienteService } from "../services/CategoriaIngredienteService";

interface PropsCategoriaIngrABM { }

// const CategoriaIngrABM: React.FunctionComponent<PropsCategoriaIngrABM> = () => {
const CategoriaIngrABM = () => {
    // const { unidadesDeMedida } = useUnidadContext();


    const categoriaIngredienteService = new CategoriaIngredienteService();

    //Para la ventana modal del formulario
    const [estadoModal, setEstadoModal] = useState(false);

    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [rubrosPadre, setRubrosPadre] = useState<Rubro[]>([]);
    const [datos, setDatos] = useState<Rubro>({
        id: undefined,
        denominacion: '',
        categoriaIngredientePadre: undefined,
        activo: true
    })

    useEffect(() => {
        // categoriaIngredienteService.getAll()
        categoriaIngredienteService.getAllBasic("categoriaIngrediente")
            .then(data => {
                // console.log(data);
                setRubros(data)
            })

        categoriaIngredienteService.getAllPadres()
            .then(data => {
                // console.log(data);
                setRubrosPadre(data)
            })

    }, []);



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
            <div className="text-center py-4 px-3" style={{ display: "flex" }}>
                <button className="btn btn-sm " style={{background: "#f99132", color: "white", borderRadius: "50px"}} onClick={() => {
                    setDatos({id: undefined, denominacion:"", categoriaIngredientePadre: {id: undefined, denominacion: "", activo: true}, activo: true })
                    setEstadoModal(!estadoModal)
                }}><i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>add</i></button>
                <h1 style={{margin: "auto", color: "white"}}> Rubro de ingredientes</h1>
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
        <br></br>
        </div>
        
        

    );
}

export default CategoriaIngrABM;