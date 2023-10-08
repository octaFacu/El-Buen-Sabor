import { FC } from "react";
import Pago from "../mercadoPago/Pago";
import { ProductoParaPedido, UserAuth0 } from "../../../context/interfaces/interfaces";
import Pedido from "../../../context/interfaces/Pedido";
import PedidoHasProductos from "../../../context/interfaces/PedidoHasProductos";

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
        <div className="d-flex justify-content-between">
            {estadoCompra > 1 ? <button onClick={() => setEstadoCompra(estadoCompra - 1)}>Paso Anterior</button> : <div></div>}
            {pagoMercadoPago && estadoCompra === 3
                ?
                <Pago
                    usuarioMP={usuarioMP}
                    localStorageValues={localStorageValues}
                    pedidoHasProductos={pedidoHasProductos}
                    pedido={pedido}
                />
                :
                <button onClick={estadoCompra < 3 ? () => setEstadoCompra(estadoCompra + 1) : generarPedido}>Continuar</button>
            }

        </div>
    );
}

export default ButtonsNextPrev;