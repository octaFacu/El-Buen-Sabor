import { FC } from "react";
import { Direccion } from "../../../context/interfaces/interfaces";

interface OrderSelectionsProps {
    estadoCompra: number;
    direcciones: Direccion[]
}

const OrderSelections: FC<OrderSelectionsProps> = ({ estadoCompra, direcciones }) => {


    if (estadoCompra === 1) {
        return (
            <h1>pag 1</h1>
        );
    } else if (estadoCompra === 2) {
        return (
            <h1>pag 2</h1>
        );
    } else {
        return (
            <h1>pag 3</h1>
        );
    }

}

export default OrderSelections;