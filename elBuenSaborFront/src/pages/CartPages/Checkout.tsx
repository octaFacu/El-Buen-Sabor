import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductoParaPedido } from "../../context/interfaces/interfaces";
import OrderInformation from "../../components/checkout/orderInformation/OrderInformation";
import PurchaseSteps from "../../components/checkout/purchaseSteps/PurchaseSteps";


interface CheckoutProps {

}

const Checkout: FC<CheckoutProps> = () => {

    //Informacion traida desde el carrito
    const location = useLocation();
    const valorTotal: number = location.state.valorTotal;
    const localStorageValues: ProductoParaPedido[] = location.state.localStorageValues;

    const [estadoCompra, setEstadoCompra] = useState<number>(1);

    return (
        <div className="container">
            <div className="row mt-5">

                {/* Contenido del espacio izquierdo */}
                <div className="col-md-8">

                    <PurchaseSteps
                        estadoCompra={estadoCompra}
                    />

                    <div className="container" style={{ background: "#f99132", borderRadius: "25px" }}>
                        <div className="m-auto my-5" style={{ width: "90%" }}>

                            <h1>SELECCION</h1>
                        </div>
                    </div >

                    {/* Lo hago componente???????? */}
                    <div className="d-flex justify-content-between">
                        <button onClick={() => setEstadoCompra(estadoCompra - 1)}>Paso Anterior</button>
                        <button onClick={() => setEstadoCompra(estadoCompra + 1)}>Continuar</button>
                    </div>

                </div>

                {/* Contenido del espacio derecho */}
                <div className="col-md-4">

                    <OrderInformation
                        valorTotal={valorTotal}
                        localStorageValues={localStorageValues}
                    />
                </div>

            </div>
        </div>
    );
}

export default Checkout;