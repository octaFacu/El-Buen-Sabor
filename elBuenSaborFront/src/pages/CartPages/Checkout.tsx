import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductoParaPedido } from "../../context/interfaces/interfaces";
import OrderInformation from "../../components/checkout/orderInformation/OrderInformation";
import PurchaseSteps from "../../components/checkout/purchaseSteps/PurchaseSteps";
import ButtonsNextPrev from "../../components/checkout/buttonsNextPrev/ButtonsNextPrev";
import OrderSelections from "../../components/checkout/orderSelections/OrderSelections";


interface CheckoutProps {

}

const Checkout: FC<CheckoutProps> = () => {

    //Informacion traida desde el carrito
    const location = useLocation();
    const valorTotal: number = location.state.valorTotal;
    const localStorageValues: ProductoParaPedido[] = location.state.localStorageValues;

    const [estadoCompra, setEstadoCompra] = useState<number>(1);

    //Funcion para terminar de generar el pedido
    const generarPedido = () =>{
        console.log("genero el pedido");
        
    }

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

                            <OrderSelections 
                                estadoCompra={estadoCompra}
                            
                            />

                        </div>
                    </div >

                    <ButtonsNextPrev 
                        estadoCompra={estadoCompra}
                        setEstadoCompra={setEstadoCompra}
                        generarPedido={generarPedido}
                    />

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