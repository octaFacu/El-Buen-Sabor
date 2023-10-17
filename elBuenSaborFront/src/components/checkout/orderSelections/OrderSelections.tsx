import { FC, useEffect, useState } from "react";
import { Direccion, ProductoParaPedido, UserAuth0 } from "../../../context/interfaces/interfaces";
import "./OrderSelections.css"
import mp_logo from "../../../assets/mp_logo.png";
import Pedido from "../../../context/interfaces/Pedido";

interface OrderSelectionsProps {
    estadoCompra: number;
    setEstadoCompra: (valor: number) => void;
    direcciones: Direccion[]
    setPagoMercadoPago: (valor: boolean) => void;
    pagoMercadoPago: boolean

    pedido: Pedido;
    setPedido: (valor: any) => void;

    agregoNuevaDireccion: () => void;
}

const OrderSelections: FC<OrderSelectionsProps> = ({ estadoCompra, setEstadoCompra, pagoMercadoPago, setPagoMercadoPago, direcciones, setPedido, pedido, agregoNuevaDireccion }) => {

    //Asigna la direccion y el metodo de pago al pedido
    const handlePedidoDireccion = (opcion: Direccion | null) => {
        console.log("asigno direccion al pedido");

        if (opcion) {
            setPedido((prevPedid: Pedido) => ({
                ...prevPedid,
                direccion: opcion,
                esEnvio: true
            }));
        } else {
            setPedido((prevPedid: Pedido) => ({
                ...prevPedid,
                direccion: undefined,
                esEnvio: false
            }));
        }

    }

    if (estadoCompra === 1) {
        return (

            <div className="fomat-order-selection mt-4">
                <h4>Entrega</h4>
                {direcciones.map((dir, index) => (

                    <div key={index} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            // value={index}
                            onChange={() => handlePedidoDireccion(dir)}
                            checked={dir === pedido.direccion}
                        />
                        <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                            {dir.calle} {dir.nroCasa} - {dir.pisoDpto}
                        </label>

                        <div className="separator-line-selections my-2" />

                    </div>

                ))}

                <button className="order-selection-btn p-2" onClick={agregoNuevaDireccion}>Agregar dirección</button>

                <h4 className="mt-4">Retiro</h4>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => handlePedidoDireccion(null)}
                        checked={pedido.direccion === undefined}
                    />
                    <label className="form-check-label">
                        Retiro en el local - (10% desc)
                    </label>

                </div>

            </div>
        );
    } else if (estadoCompra === 2) {
        return (
            <div className="fomat-order-selection mt-4">

                <h4>Online</h4>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value="mp"
                        onChange={() => setPagoMercadoPago(true)}
                        checked={pagoMercadoPago === true}
                    />
                    <img style={{ width: "30px" }} src={mp_logo} alt="mp_logo" />
                    <label className="form-check-label">Mercado pago</label>

                    <div className="separator-line-selections my-2" />

                </div>


                <h4 className="mt-4">En la entrega</h4>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value="efectivo"
                        onChange={() => setPagoMercadoPago(false)}
                        checked={pagoMercadoPago === false}
                    />
                    <label className="form-check-label">Efectivo</label>

                </div>

            </div>
        );
    } else {
        return (
            <div className="fomat-order-selection mt-4 ">

                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h4>Tipo de entrega </h4>
                        <label className="form-check-label">{pedido.esEnvio ? "Delivery" : "Retiro en el local"}</label>
                    </div>
                    <button className="order-selection-btn p-2" onClick={() => setEstadoCompra(1)}>Editar</button>
                </div>

                <div className="separator-line-selections my-2" />

                {/* Si no es envio reenderizo esto */}
                {pedido.esEnvio &&
                    <>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h4>Direccion</h4>
                                <label className="form-check-label">{pedido.direccion?.calle} {pedido.direccion?.nroCasa} - {pedido.direccion?.pisoDpto}</label>
                            </div>
                            <button className="order-selection-btn p-2" onClick={() => setEstadoCompra(1)}>Editar</button>
                        </div>

                        <div className="separator-line-selections my-2" />
                    </>
                }
                {/* ----------- */}

                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h4>Forma de pago</h4>
                        <label className="form-check-label">{pagoMercadoPago ? "Merado pago" : "Efectivo"}</label>
                    </div>
                    <button className="order-selection-btn p-2" onClick={() => setEstadoCompra(2)}>Editar</button>

                </div>

                <div className="separator-line-selections my-2" />

            </div>
        );
    }

}

export default OrderSelections;