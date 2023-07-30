import { FC } from "react";
import Producto from '../../../context/interfaces/Producto';
import "./DetalleProducto.css";

interface DetalleProductoProps {
    modalDetalleProducto: boolean
    setModalDetalleProducto: (modal: boolean) => void;

    producto: Producto | undefined;
}

const DetalleProducto: FC<DetalleProductoProps> = ({ producto, modalDetalleProducto, setModalDetalleProducto }) => {

    //AGREGAR FUNCION PARA AÑADIR AL CARRITO
    const handleAddToCart = () => {
        console.log("Agrego al carrito");

    }

    //AGREGAR FUNCION PARA AGREGAR A FAVORITOS
    const handleAddToFavorites = () => {
        console.log("Agrego a favoritos");

    }


    if (producto === undefined) {
        return (
            <div>
                <h1>CARGANDO...</h1>
            </div>
        );
    }

    return (
        <>
            {/* Ventana modal */}
            {modalDetalleProducto && (
                <div className="overlayModalProduct">
                    <div className="contenedorModalProduct">
                        {/* <span className="close" onClick={handleClose}>&times;</span> */}
                        <h2>{producto.denominacion}</h2>
                        <div className="d-flex align-items-center justify-content-center">
                            <img src={producto.imagen} alt={producto.denominacion} className="img-fluid mb-3 imgModalProduct" />
                        </div>
                        <p>{producto.descripcion}</p>
                        {/* <p>Ingredientes: {producto.ingredientes.join(", ")}</p> */}
                        <p>Ingredientes:</p>
                        <p>Precio: ${producto.precioTotal}</p>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setModalDetalleProducto(!modalDetalleProducto)}>
                                Cerrar
                            </button>
                            <button className="btn btn-primary" onClick={handleAddToCart}>
                                Agregar al Carrito
                            </button>
                            <button className="btn btn-danger" onClick={handleAddToFavorites}>
                                Agregar a Favoritos
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DetalleProducto;