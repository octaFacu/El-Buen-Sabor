import { FC } from "react";
import Pago from "../mercadoPago/Pago";
import { ProductoParaPedido, UserAuth0 } from "../../../context/interfaces/interfaces";
import Pedido from "../../../context/interfaces/Pedido";
import PedidoHasProductos from "../../../context/interfaces/PedidoHasProductos";
import "./ButtonsNextPrev.css"

interface ButtonsNextPrevProps {
    estadoCompra: number;
    setEstadoCompra: (valor: number) => void;
    generarPedido: () => void;
    pagoMercadoPago: boolean;

    usuarioMP: UserAuth0
    localStorageValues: ProductoParaPedido[]

    pedidoHasProductos: PedidoHasProductos[]
    pedido: Pedido
}

const ButtonsNextPrev: FC<ButtonsNextPrevProps> = (
    {
        estadoCompra,
        setEstadoCompra,
        generarPedido,
        pagoMercadoPago,
        usuarioMP,
        localStorageValues,
        pedidoHasProductos,
        pedido
    }) => {


    //SEGUIR ACA CON SI EL PAGO ES CON MERCADO PAGO REENDERIZO UN BOTON U OTRO
    return (
        <div className="btn-checkout-format d-flex justify-content-between align-items-start">
            {estadoCompra > 1 ? <button className=" btn-checkout-back ocultar-btn-checkout-back" onClick={() => setEstadoCompra(estadoCompra - 1)}>Paso Anterior</button> : <div className="ocultar-btn-checkout-back"></div>}
            {pagoMercadoPago && estadoCompra === 3
                ?
                <Pago
                    usuarioMP={usuarioMP}
                    localStorageValues={localStorageValues}
                    pedidoHasProductos={pedidoHasProductos}
                    pedido={pedido}
                />
                :
                <button className="btn-primary btn-checkout-forward" onClick={estadoCompra < 3 ? () => setEstadoCompra(estadoCompra + 1) : generarPedido}>{estadoCompra != 3 ? "Continuar" : "Realizar pedido!"}</button>
            }

        </div>
    );
}

export default ButtonsNextPrev;