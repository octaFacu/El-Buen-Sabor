
import CateIngrCard from "./CateIngrCard";
import CategIngrForm from "./CategIngrForm";
import { useState, useEffect } from "react";

import { Rubro } from "./Rubro";
import { CategoriaIngredienteService } from "./CategoriaIngredienteService";

interface PropsCategoriaIngrABM { }

// const CategoriaIngrABM: React.FunctionComponent<PropsCategoriaIngrABM> = () => {
const CategoriaIngrABM = () => {

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

        <div className="container my-5">
            <h1 className="text-center">Rubro de ingredientes</h1>
            <hr />
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
            <button className="btn btn-sm btn-primary" onClick={() => {
                setDatos({id: undefined, denominacion:"", categoriaPadre: {id: undefined, denominacion: "", activo: true}, activo: true })
                // setDatos({nombre: '', padre: '', activo: true})
                setEstadoModal(!estadoModal)
            }}>Agregar Rubro</button>
            <CategIngrForm
                estado={estadoModal}
                cambiarEstado={setEstadoModal}
                rubrosPadre={rubrosPadre}
                datos={datos}
            />
        </div >

    );
}

export default CategoriaIngrABM;