import { FC, useEffect, useState } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { ProductoParaPedido, RequestDataMP, UserAuth0 } from "../../../context/interfaces/interfaces";
import ListLoader from "../../Landing/listLoader/ListLoader";
import "./Pago.css"

interface PagoProps {
    usuarioMP: UserAuth0
    localStorageValues: ProductoParaPedido[]
}

const Pago: FC<PagoProps> = ({ usuarioMP, localStorageValues }) => {

    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY! as string);
    //initMercadoPago(import.meta.env.VITE_MP_TEST_PUBLIC_KEY! as string);

    const [preferenceId, setPreferenceId] = useState<string>("");

    const requestData: RequestDataMP = {
        usuario: usuarioMP,
        productos: localStorageValues
    }

    const fetchCheckout = async () => {

        const res = await fetch("http://localhost:8080/mp/checkout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                requestData
            )
        })

        const data = await res.json()
        setPreferenceId(data.preferenceId)
        console.log("RESPUESTA DE MERCADO PAGO:");
        console.log(data);

    }

    useEffect(() => {

        fetchCheckout()

    }, [])

    if (preferenceId != "") {
        return (
            <div className="btn-mp">
                <Wallet initialization={{ preferenceId: preferenceId! }} />
            </div>
        );
    }

    return (
        <ListLoader />
    );

}

export default Pago;