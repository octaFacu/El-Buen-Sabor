import { useEffect, useState } from "react";
import { CategoriaProducto} from "../../context/interfaces/interfaces";
import { ProductoService } from "../../services/ProductoService";
import { CategoriaProductoService } from "../../services/CategoriaProductoService";
import ProductoCard from "../../components/componentesProducto/ProductoCard";
import { ListaCartasABM } from "../../components/genericos/ListaCartasABM";
import { Producto } from "../../context/interfaces/Producto";
import ModalVistaDetalleProd from "../../components/componentesProducto/ModalVistaDetalleProd";
import ModalCreacionProd from "../../components/componentesProducto/ModalCreacionProd";

export const ProductosABM = () => {

    //AGREGAR ESTO A FORM
    //const { unidadesDeMedida, ingredientes } = useUnidadContext();
    const categoriaProductoService = new CategoriaProductoService();
    const productoService = new ProductoService();


    //Para la ventana modal del formulario
    const [estadoModal, setEstadoModal] = useState(false);
    const [estadoModalVista, setEstadoModalVista] = useState(false);
    const [categorias, setCategorias] = useState<CategoriaProducto[]>([]);
    const [productos, setProductos] = useState<Producto[]>([new Producto()]);
    const [datos, setDatos] = useState<Producto>(new Producto());

    useEffect(() => {
       
        categoriaProductoService.getAllBasic()
            .then(data => {
                console.log("CARGANDO CATEGORIAS "+ data);
                setCategorias(data)
            })

            productoService.getAllBasic()
            .then(data => {
                console.log("CARGANDO PRODUCTOS "+ data);
                setProductos(data)
            })
        
    }, [])



    function resetDatos() {
        setDatos(new Producto())//resetear los datos
    }

    function sendDatos(producto: Producto){
        setDatos(producto);
    }
    

    if(productos.length === 0){
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
        titulo="Productos"
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
                            {productos.map(prd => (
                                
                                <ProductoCard
                                    key={Math.random() * 100}
                                    producto={prd}

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
            <ModalCreacionProd
                estado={estadoModal}
                cambiarEstado={setEstadoModal}

                /*datos={datos}
                setDatos={setDatos}*/

                categorias={categorias}
            />
            <ModalVistaDetalleProd producto= {datos} estadoVista={estadoModalVista} cambiarEstadoVista={setEstadoModalVista}/> 
            <br></br>
            </div >
        
    )
}