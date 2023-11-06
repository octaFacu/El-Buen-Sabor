import React, { useEffect, useState } from 'react'
import { CategoriaProducto } from '../../context/interfaces/interfaces';
import CategProductoCard from '../../components/componentesCatProductos/CategProductoCard';
import CategProductoForm from '../../components/componentesCatProductos/CategProductoForm';
import { ListaCartasABM } from '../../components/genericos/ListaCartasABM';
import { CategoriaProductoService } from '../../services/CategoriaProductoService';
import { useUnidadContext } from '../../context/GlobalContext';


export const CategoriaProductosABM = () => {

    
    // const { unidadesDeMedida } = useUnidadContext();
    const { rol } = useUnidadContext();

    const categoriaProductoService = new CategoriaProductoService();

    //Para la ventana modal del formulario
    const [estadoModal, setEstadoModal] = useState(false);

    const [rubros, setRubros] = useState<CategoriaProducto[]>([]);
    const [datos, setDatos] = useState<CategoriaProducto>({
        id: undefined,
        denominacion: '',
        activo: true
    })

    useEffect(() => {
        // categoriaIngredienteService.getAll()
        categoriaProductoService.getAllBasic(rol)
            .then(data => {
                // console.log(data);
                setRubros(data)
            })

    }, []);

    function recetDatos() {
        setDatos({ id: undefined, denominacion: "", activo: true })
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
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rubros.map(rub => (

                                <CategProductoCard
                                    key={Math.random() * 100}
                                    id={rub.id}
                                    denominacion={rub.denominacion}
                                    activo={rub.activo}

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

            <CategProductoForm 
                estado={estadoModal}
                cambiarEstado={setEstadoModal}
                datos={datos}
                setDatos={setDatos}
            />

        </ListaCartasABM>

    );
}

export default CategoriaProductosABM;

