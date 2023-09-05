import { FC } from "react";
import { Direccion, ProductoParaPedido, UserAuth0 } from "../../../context/interfaces/interfaces";
import "./OrderSelections.css"
import Pago from "../mercadoPago/Pago";

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
                <h5>Entrega:</h5>
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

                <button className="add-direction-btn p-2" onClick={agregoNuevaDireccion}>Agregar dirección</button>

                <h5 className="mt-4">Retiro:</h5>
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
            <h1>pag 2</h1>
        );
    } else {
        return (
            <>
                <h1>pag 3</h1>
                <Pago
                    publicToken={import.meta.env.VITE_MP_PUBLIC_KEY! as string}
                    usuarioMP={usuarioMP}
                    localStorageValues={localStorageValues}
                />
            </>
        );
    }

}

export default OrderSelections;