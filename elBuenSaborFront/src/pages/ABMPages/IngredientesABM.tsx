import { useEffect, useState } from "react";
import { GlobalContext, useUnidadContext } from "../../context/GlobalContext"
import { IngredientesService } from "../../services/IngredientesService"
import { Ingrediente } from "../../context/interfaces/interfaces";
import { Rubro } from "../../components/compIngrediente/Rubro";
import IngredienteCard from "../../components/componentesIngredienteABM/IngredienteCard";
import ModalVistaDetalle from "../../components/componentesIngredienteABM/ModalVistaDetalle";
import ModalCompra from "../../components/componentesIngredienteABM/ModalCompra";
import { ListaCartasABM } from "../../components/genericos/ListaCartasABM";
import IngredienteForm from "../../components/componentesIngredienteABM/IngredienteForm";
import { CategoriaIngredienteService } from "../../services/CategoriaIngredienteService";
import PageLoader from "../../components/pageLoader/PageLoader";



export const IngredientesABM = () => {

    const { unidadesDeMedida, ingredientes, rol } = useUnidadContext();
    const categoriaIngredienteService = new CategoriaIngredienteService();


    //Para la ventana modal del formulario
    const [estadoModal, setEstadoModal] = useState(false);
    const [estadoModalVista, setEstadoModalVista] = useState(false);
    const [estadoModalCompra, setEstadoModalCompra] = useState(false);

    const [categorias, setCategorias] = useState<Rubro[]>([]);
    const [datos, setDatos] = useState<Ingrediente>({
        id: 0,
        activo: true,
        nombre: '',
        precioCompra: 0,
        stockActual: 0,
        stockMaximo: 0,
        stockMinimo: 0,
        unidadmedida: { id: 0, denominacion: '', unidadesParaPadre: 0, padre: { id: 0, denominacion: '', unidadesParaPadre: 0 } },
        categoriaIngrediente: { id: 0, denominacion: '', activo: true }
    })

    useEffect(() => {

        categoriaIngredienteService.getAllBasic(rol)
            .then(data => {
                console.log("CARGANDO CATEGORIAS " + data);
                setCategorias(data)
            })

    }, [])



    function resetDatos() {
        setDatos({
            id: 0,
            activo: true,
            nombre: '',
            precioCompra: 0,
            stockActual: 0,
            stockMaximo: 0,
            stockMinimo: 0,
            unidadmedida: { id: 0, denominacion: '', unidadesParaPadre: 0, padre: { id: 0, denominacion: '', unidadesParaPadre: 0 } },
            categoriaIngrediente: { id: 0, denominacion: '', activo: true }
        })
    }

    function sendDatos(ingrediente: Ingrediente) {
        setDatos(ingrediente);
    }

    //Cambio de ingredientes a categorias (de ingredientes)
    if (categorias.length === 0) {
        return <div style={{ textAlign: "center" }}>
            <PageLoader />
        </div>
    }






    return (
        <div>
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
                                    <th></th>
                                    <th>Nombre</th>
                                    <th>Categoria</th>
                                    <th></th>
                                    <th>Acciones</th>
                                    <th></th>
                                    <th></th>
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


                                        estadoCompra={estadoModalCompra}
                                        cambiarEstadoCompra={setEstadoModalCompra}


                                        datos={datos}
                                        setearDatos={sendDatos}
                                    />


                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </ListaCartasABM>
            <IngredienteForm
                estado={estadoModal}
                cambiarEstado={setEstadoModal}

                datos={datos}
                setDatos={setDatos}

                categorias={categorias}
            />
            <ModalVistaDetalle ingrediente={datos} estadoVista={estadoModalVista} cambiarEstadoVista={setEstadoModalVista} />
            <ModalCompra ingrediente={datos} estadoCompra={estadoModalCompra} cambiarEstadoCompra={setEstadoModalCompra} />
            <br></br>
        </div >

    )

}