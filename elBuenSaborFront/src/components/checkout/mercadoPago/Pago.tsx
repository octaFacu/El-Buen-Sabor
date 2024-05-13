import { FC, useEffect, useRef, useState } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { ProductoParaPedido, RequestDataMP, RequestPedido, UserAuth0 } from "../../../context/interfaces/interfaces";
import listLoader from "../../../assets/listLoader.gif";
import "./Pago.css"
import PedidoHasProductos from "../../../context/interfaces/PedidoHasProductos";
import Pedido from "../../../context/interfaces/Pedido";
import { pedidoService } from "../../../services/PedidoService";
import { MercadoPagoService } from "../../../services/MercadoPagoService";
import { useUnidadContext } from "../../../context/GlobalContext";

interface PagoProps {
    usuarioMP: UserAuth0
    localStorageValues: ProductoParaPedido[]

    pedidoHasProductos: PedidoHasProductos[]
    pedido: Pedido
}

const Pago: FC<PagoProps> = ({ usuarioMP, localStorageValues, pedidoHasProductos, pedido }) => {

    //initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY! as string);

    initMercadoPago(import.meta.env.VITE_MP_PRODUCTION_TEST_PUBLIC_KEY! as string);
    //initMercadoPago(import.meta.env.VITE_MP_TEST_PUBLIC_KEY! as string);
    const pedidoSrv = new pedidoService();
    const mpSrv = new MercadoPagoService();
    const { rol } = useUnidadContext();

    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [esStockValido, setEsStockValido] = useState<boolean>(false);

    const requestData: RequestDataMP = {
        usuario: usuarioMP,
        productos: localStorageValues,
        esEnvio: pedido.esEnvio
    }

    const validarStock = async () => {
        const requestPedido: RequestPedido = {
            pedido: pedido,
            pedidoHasProducto: pedidoHasProductos
        };
        const validacion: boolean = await pedidoSrv.validoStockPedido(requestPedido, rol)
        setEsStockValido(validacion)
    }

    //Este metodo va a guardar el pedido en el localStorage, para que luego se genere despues del pego
    const generoPedidoMP = async () => {

        const requestPedido: RequestPedido = {
            pedido: pedido,
            pedidoHasProducto: pedidoHasProductos
        };

        requestPedido.pedido.activo = false;

        await pedidoSrv.createPedidoAndPedidoHasProducto(requestPedido, rol)

        localStorage.removeItem("carritoArreglo");

    }

    const fetchCheckout = async (requestData: RequestDataMP) => {

        mpSrv.getPreferenceId(requestData).then((data) => {
            setPreferenceId(data.preferenceId)
        })
        console.log("RESPUESTA DE MERCADO PAGO:");
        console.log(preferenceId);

    }

    useEffect(() => {
        validarStock()
        fetchCheckout(requestData)
    }, [])

    useEffect(() => {
        console.log("Es stock valido " + esStockValido);
    }, [esStockValido])

    const customization = {
        visual: {
            buttonBackground: 'black',
            borderRadius: '6px',
        },
    }

    if (preferenceId === "" || preferenceId === null || preferenceId === undefined || esStockValido === undefined) {
        return (
            <img style={{ height: "40px", margin: "30px 30px 0px 0px" }} src={listLoader} alt="Loading..." className="list-loader-gif" />
        );
    }

    if (esStockValido === false) {
        return (
            <div>

            </div>
        );
    }

    if (esStockValido === true) {
        return (
            <div className="btn-mp" onClick={generoPedidoMP}>
                <Wallet
                    initialization={{ preferenceId: preferenceId! }}
                />
            </div>
        );
    }


}

export default Pago;