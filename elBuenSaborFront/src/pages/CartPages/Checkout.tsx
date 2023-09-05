import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Direccion, ProductoParaPedido, UserAuth0 } from "../../context/interfaces/interfaces";
import OrderInformation from "../../components/checkout/orderInformation/OrderInformation";
import PurchaseSteps from "../../components/checkout/purchaseSteps/PurchaseSteps";
import ButtonsNextPrev from "../../components/checkout/buttonsNextPrev/ButtonsNextPrev";
import OrderSelections from "../../components/checkout/orderSelections/OrderSelections";
import { useAuth0 } from "@auth0/auth0-react";
import { DireccionService } from "../../services/DireccionService";
import PageLoader from "../../components/pageLoader/PageLoader";


interface CheckoutProps {

}

const Checkout: FC<CheckoutProps> = () => {

    const direccionService = new DireccionService()

    //Consigo el usuario para conseguir sus direcciones y metodos de pago
    const { user } = useAuth0();

    //Informacion traida desde el carrito
    const location = useLocation();
    const valorTotal: number = location.state.valorTotal;
    const localStorageValues: ProductoParaPedido[] = location.state.localStorageValues;

    //Estado de los pasos de compra representados por numeros del 1 al 3
    const [estadoCompra, setEstadoCompra] = useState<number>(1);
    //Estado para usuario de Mercado Pago
    const [usuarioMP, setUsuarioMP] = useState<UserAuth0>({});

    //---------------------------------------------------------------------------------


    
    //MAS TARDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    //Estado para generar el pedido
    // const [Pedido, setPedido] = useState<QUE SE YO>({

    // })
    
    //-----------------------------------------------------------------------------------

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

    //Se reenderiza cuando cambia "user" porque al recargar la pagina, se necesita al usuario para cargar sus direcciones
    useEffect(() => {
        if(user){
            fetchDireccionesUsuario()
            //console.log(direcciones);
        }
        
        //Asigno los datos del usuario para mercado pago
        setUsuarioMP({
            nombre: user?.name || "Nombre",
            apellido: user?.middle_name || "Apellido",
            email: user?.email || "email"
        })
        
    }, [user])


    useEffect(() => {
        console.log(direcciones);
    }, [direcciones])

    useEffect(() => {
        console.log(usuarioMP);
    }, [usuarioMP])

    if(!user){
        return <PageLoader />
    }

    return (
        <div className="container">
            <div className="row mt-5">

                {/* Contenido del espacio izquierdo */}
                <div className="col-md-8">

                    <PurchaseSteps
                        estadoCompra={estadoCompra}
                    />

                    <div className="container mt-5" style={{ minHeight: "400px", background: "#f99132", borderRadius: "25px" }}>
                        <div className="m-auto pt-1" style={{ width: "90%" }}>

                            <OrderSelections
                                estadoCompra={estadoCompra}
                                direcciones={direcciones}


                                // setPedido={setPedido}

                                usuarioMP={usuarioMP}
                                localStorageValues={localStorageValues}

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