import { FC } from "react";
import "./ProductCard.css";
import Producto from "../../../context/interfaces/Producto";
import { ProductoParaPedido } from "../../../context/interfaces/interfaces";

interface ProductCardProps {

    key: number
    producto: Producto

    setProductoSeleccionado: (producto: Producto) => void;
    setModalDetalleProducto: (modal: boolean) => void;

    handleAddToCart: (value: ProductoParaPedido) => void;

}

const ProductCard: FC<ProductCardProps> = ({ producto, setProductoSeleccionado, setModalDetalleProducto, handleAddToCart }) => {

    const abrirModal = () => {
        setModalDetalleProducto(true);
        setProductoSeleccionado(producto);
        console.log(producto);
    }

    const addProductFromCard = () => {
        console.log("Añado producto desde la carta");
        
    }

    return (


        <div className="col-sm-6 col-md-4 responsiveCard" >
            <div className="card product-card cardEdit mb-3">
                {/* <div className="card-body"> */}
                <div>

                    <img className="imgCard" src={producto.imagen} alt={producto.denominacion} onClick={abrirModal}></img>
                    <div className="cardTextContent margin-text">
                        <div style={{ marginLeft: "2%" }}>
                            <div className="cursor-pointer" onClick={abrirModal}>
                                <span>{producto.denominacion}</span>
                            </div>
                            <div className="secondary-text">
                                <span>${producto.precioTotal}</span>
                            </div>
                        </div>
                        <div className="shopping">
                            <button onClick={() => handleAddToCart({ producto: producto, cantidad: 1 })}>
                                <i className="material-icons cart-icon"> add_shopping_cart</i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default ProductCard;