import { FC } from "react";
import "./OrderInformation.css"
import { ProductoParaPedido } from "../../../context/interfaces/interfaces";

interface OrderInformationProps {
    valorTotal: number
    localStorageValues: ProductoParaPedido[]
}

const OrderInformation: FC<OrderInformationProps> = ({ valorTotal, localStorageValues }) => {



    return (
        <div className="order-information-div">
            <div>
                <h3>Tu pedido</h3>
            </div>

            <div className="separator-line my-2" />

            <div>
                {localStorageValues.map((el, index) => {
                    return (
                        <div className="d-flex justify-content-between" key={index}>
                            <span>{el.producto.denominacion} x{el.cantidad}</span>
                            <span>${el.producto.precioTotal * el.cantidad}</span>
                        </div>
                    )
                })}
            </div>

            <div className="separator-line my-2" />

            <div className="d-flex justify-content-between">
                <span>Total:</span>
                <span>${valorTotal}</span>
            </div>
        </div>
    );
}

export default OrderInformation;