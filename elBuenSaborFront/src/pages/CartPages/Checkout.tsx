import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Direccion, ProductoParaPedido } from "../../context/interfaces/interfaces";
import OrderInformation from "../../components/checkout/orderInformation/OrderInformation";
import PurchaseSteps from "../../components/checkout/purchaseSteps/PurchaseSteps";
import ButtonsNextPrev from "../../components/checkout/buttonsNextPrev/ButtonsNextPrev";
import OrderSelections from "../../components/checkout/orderSelections/OrderSelections";
import { useAuth0 } from "@auth0/auth0-react";
import { DireccionService } from "../../services/DireccionService";


interface CheckoutProps {

}

const Checkout: FC<CheckoutProps> = () => {

    const direccionService = new DireccionService()

    //Informacion traida desde el carrito
    const location = useLocation();
    const valorTotal: number = location.state.valorTotal;
    const localStorageValues: ProductoParaPedido[] = location.state.localStorageValues;

    //Estado de los pasos de compra representados por numeros del 1 al 3
    const [estadoCompra, setEstadoCompra] = useState<number>(1);

    //Consigo el usuario para conseguir sus direcciones y metodos de pago
    const { user } = useAuth0();


    //Cargar las direcciones del usuario logueado
    const [direcciones, setDirecciones] = useState<Direccion[]>([]);

    const fetchDireccionesUsuario = async () => {
        const data = await direccionService.getDireccionesByusuarioId(user!.userId)
        await setDirecciones(data);
    }

    //Funcion para terminar de generar el pedido
    const generarPedido = () => {
        console.log("genero el pedido");

    }

    useEffect(() => {
        fetchDireccionesUsuario()
        console.log(direcciones);
        console.log(user!.userId);
        
    }, [])

    useEffect(() => {
        console.log(direcciones);
    }, [direcciones])

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
                                direcciones={direcciones}
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