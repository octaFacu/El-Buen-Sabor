import { FC } from "react";
import { useParams } from "react-router-dom";

interface ModalDescripcionProps {
    
}
 
const ModalDescripcion: FC<ModalDescripcionProps> = () => {

    const { id } = useParams<{ id: string }>();
    const idnum = Number(id) - 1;

    // Contexto
    // const instrumentos = useContext(ProductosContext) as Instrumento[];
    // const inst = instrumentos[idnum];

    // if (!inst) {
    //     console.log(inst);
        
    //     return (
    //         <div className="container py-5">
    //             <h3>Cargando...</h3>
    //         </div>
    //     );
    // }
    
{/* <Link to={`detalleProducto/${object.id}`} className="card-title">{object.instrumento}</Link> */}

    return (

        <div className="container py-5 mediaDetalleProducto">
            {/* <div className="row">
                <div className="col-md-6">
                {!(inst.imagen).includes("http") 
                    ? <img src={`http://localhost:5173/src/assets/img/${inst.imagen}`} className="img-fluid rounded-start w-100 mb-4" alt={inst.instrumento} />
                    : <img src={inst.imagen} className="img-fluid rounded-start w-100 mb-4" alt={inst.instrumento} />
                    }
                </div>
                <div className="col-md-6">
                    <h2>{inst.instrumento}</h2>
                    <p>{inst.descripcion}</p>
                    <p>Modelo: {inst.modelo}</p>
                    <p>Marca: {inst.marca}</p>
                    <p className="text-muted">{inst.cantidadVendida} vendidos</p>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                            <h3 className="text-primary">{`$ ${inst.precio}`}</h3>
                        </div>
                        <div className="col-6">{addGratuito(inst.costoEnvio)}</div>
                    </div>
                    <hr />
                    <button className="btn btn-primary">Añadir al carrito</button>
                </div>
            </div> */}
        </div>

     );
}
 
export default ModalDescripcion;