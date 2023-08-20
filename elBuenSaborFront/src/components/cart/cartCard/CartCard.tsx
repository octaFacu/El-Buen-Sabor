import { FC, useEffect, useState } from "react";
import { ProductoParaPedido } from "../../../context/interfaces/interfaces";
import "./CartCard.css"

interface CartCardProps {
    index: number
    product: ProductoParaPedido
    actualizarCantidad: (indice: number, nuevaCantidad: number) => void
    eliminarProducto: (indice: number) => void
    handleValorTotalChange: (valor: number, esSuma: boolean) => void
}

const CartCard: FC<CartCardProps> = ({ product, actualizarCantidad, eliminarProducto, handleValorTotalChange, index }) => {

    //Para que carge el valor inicial (precio * cantidad) al valor total del pedido, solo se ejecuta la primera vez cuando carga el componenete
    useEffect(() => {
        handleValorTotalChange(product.producto.precioTotal * product.cantidad, true)
    }, [])


    return (
        <>
            <div className="card my-3 estilo-cart-card" >
                <div className="row g-0 d-flex align-items-center">

                    <div className="col-md-3">
                        <img src={product.producto.imagen} className="img-fluid rounded-start" alt={product.producto.denominacion} />
                    </div>

                    <div className="col-md-2">
                        <div className="m-1 text-center">
                            <span className="cart-denominacion">{product.producto.denominacion}</span>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="text-center">
                            <span className="cart-product-price">${product.producto.precioTotal}</span>
                        </div>
                    </div>

                    <div className="col-md-4 d-flex justify-content-evenly align-items-center">
                        <div className="bg-cart-cant d-flex align-items-center">
                            <button className="cant-btn-resta bg-cant-btn" onClick={() => {
                                actualizarCantidad(index, product.cantidad - 1)
                                handleValorTotalChange(product.producto.precioTotal, false)
                            }} disabled={product.cantidad === 1}>-</button>
                            <span className="px-5 fs-5">{product.cantidad}</span>   {/*PARA RESPONSIVIDAD PASAR DE "px-5" A "px-3"*/}
                            <button className="bg-cant-btn" onClick={() => {
                                actualizarCantidad(index, product.cantidad + 1)
                                handleValorTotalChange(product.producto.precioTotal, true)
                            }}>+</button>
                        </div>

                        <span className="mt-1 fs-4">=</span>

                        <div className="cart-total-product-price">
                            <span >${product.producto.precioTotal * product.cantidad}</span>
                        </div>
                    </div>

                    <div className="col-md-1 d-flex justify-content-center">
                        <div>
                            <button className="bg-cart-cancel-btn" onClick={() => {
                                eliminarProducto(index)
                                handleValorTotalChange(product.producto.precioTotal * product.cantidad, false)
                                }}>X</button>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
}

export default CartCard;