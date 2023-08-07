
import CateIngrCard from "../../components/compIngrediente/CateIngrCard";
import CategIngrForm from "../../components/compIngrediente/CategIngrForm";
import { useState, useEffect } from "react";
import { GlobalContext, useUnidadContext } from "../../context/GlobalContext";

import { Rubro } from "../../components/compIngrediente/Rubro";
import { CategoriaIngredienteService } from "../../services/CategoriaIngredienteService";
import { ListaCartasABM } from "../../components/genericos/ListaCartasABM";
import Paginacion from "../../components/genericos/Paginacion";

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

    //Para paginacion
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>()

    useEffect(() => {
        // categoriaIngredienteService.getAll()
        categoriaIngredienteService.getPaged(page, size)
            .then(data => {
                // console.log(data);
                setRubros(data.content)
                setTotalPages(data.totalPages)
            })

        categoriaIngredienteService.getAllPadres()
            .then(data => {
                // console.log(data);
                setRubrosPadre(data)
            })

    }, [page]);

    function recetDatos() {
        setDatos({ id: undefined, denominacion: "", categoriaIngredientePadre: { id: undefined, denominacion: "", activo: true }, activo: true })
    }

    return (

        <ListaCartasABM
            titulo="Rubro de ingredientes"
            estado={estadoModal}
            setEstadoModal={setEstadoModal}
            recetDatos={recetDatos}
        >


            <div className="row my-3 mx-2">

                <div className="">
                    <table className="table" style={{ borderSpacing: "5px" }}>
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

            <Paginacion
                page={page}
                size={size}
                totalPages={totalPages!}
                setPage={setPage}

            />

            <CategIngrForm
                estado={estadoModal}
                cambiarEstado={setEstadoModal}
                rubrosPadre={rubrosPadre}
                datos={datos}
                setDatos={setDatos}
            />

        </ListaCartasABM>

    );
}

export default CategoriaIngrABM;