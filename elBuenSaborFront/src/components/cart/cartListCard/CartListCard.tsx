import { FC, useEffect, useState } from "react";
import { ProductoParaPedido } from "../../../context/interfaces/interfaces";
import CartCard from "../cartCard/CartCard";

interface CartListCardProps {
    localStorageValues: ProductoParaPedido[]
    actualizarCantidad: (indice: number, nuevaCantidad: number) => void
}

const CartListCard: FC<CartListCardProps> = ({ localStorageValues, actualizarCantidad }) => {



    if (localStorageValues.length === 0) {
        return (
            <div className="py-5 d-flex justify-content-center ">
                <span className="cart-no-content">Tu carrito está vacío</span>
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
                />
            ))}

        </div>
    );
}

export default CartListCard;