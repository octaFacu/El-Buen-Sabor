import { FC } from "react";
import { Direccion, ProductoParaPedido, UserAuth0 } from "../../../context/interfaces/interfaces";
import "./OrderSelections.css"
import Pago from "../mercadoPago/Pago";
import mp_logo from "../../../assets/mp_logo.png";

interface OrderSelectionsProps {
    estadoCompra: number;
    direcciones: Direccion[]

    usuarioMP: UserAuth0
    localStorageValues: ProductoParaPedido[]
}

const OrderSelections: FC<OrderSelectionsProps> = ({ estadoCompra, direcciones, usuarioMP, localStorageValues }) => {

    // const handleChange = (opcion: Direccion | null) => {
    const handleChange = () => {
        console.log("logueando");

        // set.....(opcion);
    }

    const agregoNuevaDireccion = () => {
        console.log("Agrego nueva direccion");

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
                            id={`checkbox-${index}`}
                            value={index}
                            onChange={handleChange}
                        //   checked={dir === opcionSeleccionada}
                        />
                        <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                            {dir.calle} {dir.nroCasa} - {dir.pisoDpto}
                        </label>

                        <div className="separator-line-selections my-2" />

                    </div>

                    // <div key={index}>
                    //     <input
                    //         type="checkbox"
                    // value={dir}
                    // checked={dir === opcionSeleccionada}
                    // onChange={() => handleChange(opcion)}
                    //     />
                    //     <label htmlFor={dir.calle}>{dir.calle}</label>
                    // </div>
                ))}

                <button className="order-selection-btn p-2" onClick={agregoNuevaDireccion}>Agregar dirección</button>

                <h4 className="mt-4">Retiro</h4>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        // id={`checkbox-${index}`}
                        // value={index}
                        onChange={handleChange}
                    //   checked={dir === opcionSeleccionada}
                    />
                    <label className="form-check-label">
                        Retiro en el local
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
                        onChange={handleChange}
                    //   checked={dir === opcionSeleccionada}
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
                        value="mp"
                        onChange={handleChange}
                    //   checked={dir === opcionSeleccionada}
                    />
                    <label className="form-check-label">Efectivo</label>

                </div>

            </div>
        );
    } else {
        return (
            <div className="fomat-order-selection mt-4">

                <div>
                    <h4>Tipo de entrega </h4>
                    <label className="form-check-label">tipo de entrega...</label>
                </div>

                <div className="separator-line-selections my-2" />

                {/* Si es entrega reenderizo esto */}
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h4>Direccion</h4>
                        <label className="form-check-label">direccion....</label>
                    </div>
                    <button className="order-selection-btn p-2">Editar</button>
                </div>

                <div className="separator-line-selections my-2" />

                {/* ----------- */}
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h4>Forma de pago</h4>
                        <label className="form-check-label">forma de pago....</label>
                    </div>
                    <button className="order-selection-btn p-2">Editar</button>

                </div>

                <div className="separator-line-selections my-2" />


                <Pago
                    usuarioMP={usuarioMP}
                    localStorageValues={localStorageValues}
                />


            </div>
        );
    }

}

export default OrderSelections;