import { FC, useEffect, useState } from "react";
import { ProductoParaPedido } from "../../../context/interfaces/interfaces";
import "./CartCard.css"

interface CartCardProps {
    index: number
    product: ProductoParaPedido
    actualizarCantidad: (indice: number, nuevaCantidad: number) => void
}

const CartCard: FC<CartCardProps> = ({ product, actualizarCantidad, index }) => {

    // const [localStorageValue, setLocalStorageValue] = useState<ProductoParaPedido>();

    // useEffect(() => {
    //     const storedItems = localStorage.getItem('carritoArreglo');
    //     if (storedCartItems) {
    //       setCartItems(JSON.parse(storedCartItems));
    //     }
    //   }, []);

    //--------------



    return (
        <>
            <div className="card my-3 estilo-cart-card" >
                <div className="row g-0 d-flex align-items-center">

                    <div className="col-md-3">
                        <img src={product.producto.imagen} className="img-fluid rounded-start" alt={product.producto.denominacion} />
                    </div>

                    <div className="col-md-2">
                        <div className="m-1 text-center">
                            <span>{product.producto.denominacion}</span>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="text-center">
                            <span>${product.producto.precioTotal}</span>
                        </div>
                    </div>

                    <div className="col-md-4 d-flex justify-content-evenly">
                        <div>
                            <button className="btn bg-cant-btn" onClick={() => actualizarCantidad(index, product.cantidad - 1)} disabled={product.cantidad === 1}>-</button>
                            <span className="px-3">{product.cantidad}</span>
                            <button className="btn bg-cant-btn" onClick={() => actualizarCantidad(index, product.cantidad + 1)}>+</button>
                        </div>

                        <span className="mt-1">=</span>

                        <div className="total-product-price">
                            <span >${product.producto.precioTotal * product.cantidad}</span>
                        </div>
                    </div>

                    <div className="col-md-1">
                        <div>
                            <button className="btn bg-cant-btn">X</button>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
}

export default CartCard;