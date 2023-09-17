import { FC, useEffect, useState } from "react";
import { ProductoParaPedido } from "../../../context/interfaces/interfaces";
import CartCard from "../cartCard/CartCard";
import "./CartListCard.css"

interface CartListCardProps {
    localStorageValues: ProductoParaPedido[]
    actualizarCantidad: (indice: number, nuevaCantidad: number) => void
    eliminarProducto: (indice: number) => void
    handleValorTotalChange: (valor: number, esSuma: boolean) => void
}

const CartListCard: FC<CartListCardProps> = ({ localStorageValues, actualizarCantidad, eliminarProducto, handleValorTotalChange }) => {



    if (localStorageValues.length === 0) {
        return (
            <div className="py-5 my-5 d-flex justify-content-center ">
                <span className="cart-no-content fs-1">Tu carrito está vacío</span>
            </div>
        );
    }

    return (
        <div className="mx-4">
            {localStorageValues.map((producto, index) => (
                <CartCard
                    key={index}
                    index={index}
                    product={producto}
                    actualizarCantidad={actualizarCantidad}
                    eliminarProducto={eliminarProducto}
                    handleValorTotalChange={handleValorTotalChange}
                />
            ))}

        </div>
    );
}

export default CartListCard;