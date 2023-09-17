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
import Pedido from "../../context/interfaces/Pedido";
import { Cliente } from "../../context/interfaces/Cliente";
import PedidoHasProductos from "../../context/interfaces/PedidoHasProductos";
import { ClienteService } from "../../services/ClienteService";
import { pedidoService } from "../../services/PedidoService";


interface CheckoutProps {

}

const Checkout: FC<CheckoutProps> = () => {

    const pedidoSrv = new pedidoService();
    const direccionSrv = new DireccionService();
    const clienteSrv = new ClienteService();

    //Consigo el usuario para conseguir sus direcciones y metodos de pago
    const { user } = useAuth0();

    //Informacion traida desde el carrito
    const location = useLocation();
    //const [valorTotal, setValorTotal] = useState<number>(location.state.valorTotal);
    const valorTotal: number = location.state.valorTotal;
    const localStorageValues: ProductoParaPedido[] = location.state.localStorageValues;

    //Estado de los pasos de compra representados por numeros del 1 al 3
    const [estadoCompra, setEstadoCompra] = useState<number>(1);
    //Estado para usuario de Mercado Pago
    const [usuarioMP, setUsuarioMP] = useState<UserAuth0>({});

    //---------------------------------------------------------------------------------

    //Estado para generar el pedido
    const [pedido, setPedido] = useState<Pedido>({
        precioTotal: 0,
        //String que diga AConfirmar
        estado: 0,
        activo: true,
        numeroPedidoDia: 0,
        esEnvio: false,
        horaEstimada: "",
        fechaPedido: "",
        cliente: new Cliente(),
        direccion: undefined
    })

    const [pedidoHasProductos, setPedidoHasProductos] = useState<PedidoHasProductos[]>([])

    //-----------------------------------------------------------------------------------

    //Cargar las direcciones del usuario logueado
    const [direcciones, setDirecciones] = useState<Direccion[]>([]);
    const fetchDireccionesUsuario = async (userId: string) => {
        const data = await direccionSrv.getDireccionesByusuarioId(userId)
        await setDirecciones(data);
    }

    //Trae el cliente y lo asigna al pedido
    const fetchCliente = async (userId: string) => {
        const data: Cliente = await clienteSrv.getClienteByUsuarioId(userId)

        if(data){
            setPedido((prevPedid: Pedido) => ({
                ...prevPedid,
                cliente: data,
            }))

            //Asigno los datos del usuario para mercado pago
            setUsuarioMP({
                nombre: data.usuario.nombre || user?.name || "Nombre",
                apellido: data.usuario.nombre || user?.middle_name || "Apellido",
                email: user?.email || "email"
            })

        }
    }

    //Funcion para terminar de generar el pedido
    const generarPedido = async () => {
        console.log("genero el pedido: ");

        const data = await pedidoSrv.createEntity(pedido)
        //SEGUIR ACA, CREAR PEDIDO HAS PRODUCTO
    }

    //Se reenderiza cuando cambia "user" porque al recargar la pagina, se necesita al usuario para cargar sus direcciones
    useEffect(() => {
        if (user) {

            fetchDireccionesUsuario(user.userId)

            fetchCliente(user.userId)

        }

        if (localStorageValues) {
            //Para sacar la fecha del pedido
            let hp = new Date();
            //Para sacar la hora estimada
            let he = new Date();
            //Timepo que sumo para calcular la hora estimada final
            let hSuma: string = "00"
            let mSuma: string = "00"

            localStorageValues.map((val) => {

                let tiempoCocina = val.producto.tiempoCocina!

                if (tiempoCocina) {
                    if (parseInt(hSuma) < parseInt(tiempoCocina.substring(0, 2))) {
                        hSuma = tiempoCocina.substring(0, 2);
                        he.setHours(he.getHours() + parseInt(tiempoCocina.substring(0, 2)))
                        return;

                    } else if (parseInt(mSuma) < parseInt(tiempoCocina.substring(3, 5))) {
                        mSuma = tiempoCocina.substring(3, 5);
                        he.setMinutes(he.getMinutes() + parseInt(tiempoCocina.substring(3, 5)))
                    }
                }
            })

            setPedido((prevPedid: Pedido) => ({
                ...prevPedid,
                horaEstimada: `${he.getHours()}:${he.getMinutes()}:${he.getSeconds()}`,
                fechaPedido: `${hp.getFullYear()}-${hp.getMonth() + 1}-${hp.getDay()} ${hp.getHours()}:${hp.getMinutes()}:${hp.getSeconds()}`

            }))

            //Creo pedidos has productos para el pedido

            

        }

    }, [user])

    //Asigna el descuento al pedido si es envio o no
    useEffect(() => {
        //console.log("Es envio: " + pedido.esEnvio);
        if (!pedido.esEnvio) {
            setPedido((prevPedid: Pedido) => ({
                ...prevPedid,
                precioTotal: valorTotal * 0.9,
            }))
        } else {
            setPedido((prevPedid: Pedido) => ({
                ...prevPedid,
                precioTotal: valorTotal,
            }))
        }

    }, [pedido.esEnvio])


    // useEffect(() => {
    //     console.log(direcciones);
    // }, [direcciones])

    // useEffect(() => {
    //     console.log(usuarioMP);
    // }, [usuarioMP])

    // useEffect(() => {
    //     console.log(pedido);
    // }, [pedido])

    if (!user) {
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

                                pedido={pedido}
                                setPedido={setPedido}

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
                        esEnvio={pedido.esEnvio}
                    />
                </div>

            </div>
        </div>
    );
}

export default Checkout;