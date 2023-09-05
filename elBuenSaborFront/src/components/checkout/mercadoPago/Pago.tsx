import { FC, useEffect, useState } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { ProductoParaPedido, UserAuth0 } from "../../../context/interfaces/interfaces";

interface PagoProps {
    publicToken: string

    usuarioMP: UserAuth0
    localStorageValues: ProductoParaPedido[]
}

const Pago: FC<PagoProps> = ({ publicToken, usuarioMP, localStorageValues }) => {

    initMercadoPago(publicToken);

    const [preferenceId, setPreferenceId] = useState<string>();

    const productos: ProductoParaPedido[] = localStorageValues;
    const usuario: UserAuth0 = usuarioMP;

    const fetchCheckout = async () => {

        console.log("Inicio peticion MP");
        console.log(productos);

        const res = await fetch("http://localhost:8080/mp/checkout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //usuario,
                //productos
            })
        })

        const data = await res.json()
        //setPreferenceId(data)
        console.log("RESPUESTA DE MERCADO PAGO:");
        console.log(data);
        

        // if (data.global) {
        //     const mp = new window.MercadoPago(import.meta.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
        //         locale: "es-AR"
        //     })
        //     const bricksBuilder = mp.bricks();   

        //     mp.checkout({
        //         preference: {
        //             id: data.global
        //         },
        //         render: {
        //             container: ".cho-container",
        //             label: "Pagar"
        //         }
        //     })
        // }
    }

    useEffect(() => {

        fetchCheckout()

    }, [])

    return (
        <>
            {/* <div id="cho-container"></div> */}
            <Wallet initialization={{ preferenceId: preferenceId! }} />
        </>
    );
}

export default Pago;