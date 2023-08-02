import { FC } from "react";
import "./ProductCard.css";
import Producto from "../../../context/interfaces/Producto";

interface ProductCardProps {

    key: number
    producto: Producto

    setProductoSeleccionado: (producto: Producto) => void;
    setModalDetalleProducto: (modal: boolean) => void;
}

const ProductCard: FC<ProductCardProps> = ({ producto, setProductoSeleccionado, setModalDetalleProducto}) => {

    return (

        <div className="col-sm-6 col-md-4 responsiveCard" >
                <div className="card cardEdit mb-3" onClick={() => {
                    setModalDetalleProducto(true);
                    setProductoSeleccionado(producto);
                }}>
                    {/* <div className="card-body"> */}
                    <div>

                        <img className="imgCard" src={producto.imagen} alt="Hamburguesa simple"></img>
                        <div className="cardTextContent margin-text">
                            <div style={{ marginLeft: "2%" }}>
                                <div>
                                    <span>{producto.denominacion}</span>
                                </div>
                                <div className="secondary-text">
                                    <span>${producto.precioTotal}</span>
                                </div>
                            </div>
                            <div className="shopping">
                                <i className="material-icons cart-icon"> add_shopping_cart</i>
                            </div>
                        </div>

                    </div>
                </div>
        </div>

    );
}

export default ProductCard;