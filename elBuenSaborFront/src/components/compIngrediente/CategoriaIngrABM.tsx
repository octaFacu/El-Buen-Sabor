
import CateIngrCard from "./CateIngrCard";
import CategIngrForm from "./CategIngrForm";
import { useState, useEffect } from "react";
import { GlobalContext, useUnidadContext } from "../../context/GlobalContext";


import { Rubro } from "./Rubro";
import { CategoriaIngredienteService } from "../../services/CategoriaIngredienteService";

interface PropsCategoriaIngrABM { }

// const CategoriaIngrABM: React.FunctionComponent<PropsCategoriaIngrABM> = () => {
const CategoriaIngrABM = () => {
    const { unidadesDeMedida } = useUnidadContext();

    const categoriaIngredienteService = new CategoriaIngredienteService();

    //Para la ventana modal del formulario
    const [estadoModal, setEstadoModal] = useState(false);

    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [rubrosPadre, setRubrosPadre] = useState<Rubro[]>([]);
    const [datos, setDatos] = useState<Rubro>({
        id: undefined,
        denominacion: '',
        categoriaPadre: undefined,
        activo: true
    })

    useEffect(() => {
        categoriaIngredienteService.getAll()
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

    console.log("GetALL");
    console.log(rubros);
    console.log("GETALL PADRES");
    console.log(rubrosPadre);


    return (
        <div>
            {/* <div>
                {unidadesDeMedida.map((unidadDeMedida) => (
                <div key={unidadDeMedida.id.toString()}>{unidadDeMedida.denominacion}</div>
                ))}
            </div> */}
        <div className="container my-5 pb-1 mb-3" style={{background: "#f99132", borderRadius: "25px"}}>
            <div style={{background: "#864e1b", borderRadius: "25px"}}>
            <div className="text-center py-2 px-3" style={{ display: "inline" }}>
                <button className="btn btn-sm mt-5" style={{background: "#f99132", color: "white", borderRadius: "50px"}} onClick={() => {
                    setDatos({id: undefined, denominacion:"", categoriaPadre: {id: undefined, denominacion: "", activo: true}, activo: true })
                    setEstadoModal(!estadoModal)
                }}><i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>add</i></button>
                <h1 style={{color: "white"}}> Rubro de ingredientes</h1>
            </div></div>
            
            <div className="row my-3">

                <div className="">
                    <table className="table table-striped">
                        {/* <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Padre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead> */}
                        <tbody>
                            {rubros.map(rub => (
                                
                                <CateIngrCard
                                    key={Math.random() * 100}
                                    id={rub.id}
                                    denominacion={rub.denominacion}
                                    padre={rub.categoriaPadre}
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