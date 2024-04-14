import { useEffect, useRef, useState } from "react";
import { ListaCartasABM } from "../../components/genericos/ListaCartasABM"
import Pedido, { EstadoPedido } from "../../context/interfaces/Pedido";
import { pedidoService } from "../../services/PedidoService";
import CardPedidoCaja from "../../components/componentesCajero/CardPedidoCaj";
import './CajeroPagesStyle.css';
import { Stomp } from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import * as Socket from 'socket.io-client';
import SortListComponent from "./SortListComponent";
import { useUnidadContext } from "../../context/GlobalContext";
import { FacturaService } from "../../services/FacturaService";


export const CajeroPedidosPage = () => {
    const { rol } = useUnidadContext();

    (window as any).global = window
    const [estadoModal, setEstadoModal] = useState(false);
    const [allPedidos, setAllPedidos] = useState<Pedido[]>([]);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [estadoDePedidos, setEstadoDePedidos] = useState<EstadoPedido>(EstadoPedido.AConfirmar);
    const servicePedido = new pedidoService();
    const serviceFactura = new FacturaService();
    const [listaPendientes, setListaPendientes] = useState<number[]>([]);

    const getPedidos = async () => {
        //servicePedido.getByEstado(EstadoPedido[estadoDePedidos])
        servicePedido.getAllBasic(rol)
            .then(data => {
                setAllPedidos(data)
            })
    }

    const getPedidosEstado = async () => {
        const estadoString = EstadoPedido[estadoDePedidos];


        const filteredPedidos = allPedidos.filter(pedido => pedido.estado.toString() === estadoString);
        await setPedidos(filteredPedidos);
    }

    async function handleSetListaPendientes(estado: string) {
        //console.log("Estoy entrando al setter de lista de pendientes");
        switch (estado) {
            case "AConfirmar": {
                if (!listaPendientes.includes(0)) {
                    await setListaPendientes([...listaPendientes, 0]);
                }
                break;
            }
            case "EnCocina": {
                if (!listaPendientes.includes(1)) {
                    await setListaPendientes([...listaPendientes, 1]);
                }
                break;
            }
            case "Listo": {
                if (!listaPendientes.includes(2)) {
                    await setListaPendientes([...listaPendientes, 2]);
                }
                break;
            }
            case "EnDelivery": {
                if (!listaPendientes.includes(3)) {
                    await setListaPendientes([...listaPendientes, 3]);
                }
                break;
            }
            case "Entregado": {
                if (!listaPendientes.includes(4)) {
                    await setListaPendientes([...listaPendientes, 4]);
                }
                break;
            }
            default: {
                break;
            };
        }
        listaPendientes.forEach(num => {
            //console.log("PEDIDOS RECIBIDOS:" + num);
        });
    }

    async function handleDeSetListaPendientes(estado: EstadoPedido) {
        console.log(estado);
        const updatedNumbers = listaPendientes.filter((number) => number == estado);
        await setListaPendientes(updatedNumbers);
    }

    useEffect(() => {
        getPedidos();
        const socket = new SockJS('http://localhost:8080/ws-endpoint');
        //const socket = Socket.io('/ws-endpoint');
        const stompClient = Stomp.over(socket);0

        //console.log("Entering Web Socket handler")
        const handleNotification = async (attributeValue: string) => {

            //console.log('Received attribute value:', attributeValue);
            await handleSetListaPendientes(attributeValue);


            setTimeout(() => {

                handleDeSetListaPendientes(estadoDePedidos);
            }, 30000);

            await getPedidos();
        };

        stompClient.connect({}, () => {
            // Connected
            //console.log("conectado al web socket");
            const subscription = stompClient.subscribe('/topic/pedidos', async (notification) => {
                //console.log("entro a la notificacion");
                await handleNotification(notification.body); // Pass the message body to the handler
                await getPedidos();
            });

            return () => {
                // Unsubscribe when the component is unmounted
                subscription.unsubscribe();
                stompClient.disconnect();
            };

        });

    }, [])

    useEffect(() => {
        getPedidosEstado();
    }, [estadoDePedidos]);

    useEffect(() => {
        //console.log("PEDIDOS HAN CAMBIADO");
        //HERE I NEED TO RE RENDER WITH WHAT THE CURRENT LIST HAS, NO CHANGES -- que significa esto T-T ¿? ya me olvidé lol
    }, [pedidos]);

    const handleChangeEstado = (estadoDePedido: EstadoPedido, pedidoChanged: Pedido) => {
        pedidoChanged.estado = estadoDePedido.toString();
        servicePedido.updateEntity(pedidoChanged, rol);
        if(estadoDePedido.toString() == "Entregado"){
            //console.log("Entrando a creacion de factura")
            serviceFactura.createFactura(pedidoChanged, rol);
            //console.log("Creacion de factura hecha");

        }
        window.location.reload();
    }

    const dropdownRef = useRef<HTMLSelectElement>(null);
    const handleEstadoChange = (newEstado: EstadoPedido) => {
        
        if (dropdownRef.current) {
            dropdownRef.current.selectedIndex = newEstado;
          }

        setEstadoDePedidos(newEstado);
    };

    const ConvertEstadoPedido = (num: number) => {
        switch (num) {
            case 0: {
                return "AConfirmar";
            }
            case 1: {
                return "EnCocina";
            }
            case 2: {
                return "Listo";
            }
            case 3: {
                return "EnDelivery";
            }
            case 4: {
                return "Entregado";
            }
            default: {
                return "AConfirmar";
            }
        }
    };

    

    return (
        <div>
            <div>
                <div className="container my-5 pb-1 mb-3 " style={{ background: "#f99132", borderRadius: "25px" }}>


                    <div className="titleAndAddButton">
                        <div className="text-center pt-4 px-3 d-flex">
                            <h1 style={{ margin: "auto", color: "white" }}> Pedidos</h1>
                        </div>
                        <SortListComponent key={pedidos.length} list={pedidos} setList={setPedidos}></SortListComponent>
                        <div className="circleButtons py-1 px-1">
                            {listaPendientes.map((num) => (
                                <div key={num} className="circleButton">
                                    <span className="circleButtonText" onClick={() => handleEstadoChange(EstadoPedido[ConvertEstadoPedido(num)])}>{num}</span>
                                </div>
                            ))}


                        </div>
                    </div>



                    <div className="parentPed">

                        <div className="childPed">
                            <input style={{ display: "none" }}></input>
                        </div>
                        <div className="childPed">
                            <select className="dropdown-estado form-select mb-3 mr-3" ref={dropdownRef} id="categoria" name="categoria" onChange={(e) => { handleEstadoChange(EstadoPedido[e.target.value as keyof typeof EstadoPedido]) }}>
                                {/* <option selected value={estadoDePedidos.valueOf()}>{estadoDePedidos.valueOf()}</option> */}
                                {Object.values(EstadoPedido)
                                    .filter(state => typeof state === "string")
                                    .map((state, index) => (
                                        // estadoDePedidos !== state && (
                                        (<option key={index} value={state}>
                                            {index}- {state}
                                        </option>
                                        )
                                    ))}



                            </select>
                        </div>


                    </div>


                    {pedidos.length > 0 ? (
                        <div /*className="card-containerPed"*/ className="row">
                            {pedidos.map(ped => (
                                <div className="col-sm-6 col-md-4">
                                    <CardPedidoCaja changeEstadoPedido={handleChangeEstado} pedido={ped} ></CardPedidoCaja>
                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className="container">
                            <h2 style={{ color: "white" }} className="no-pedidos-text mt-5 mb-5">No hay Pedidos de esta Categoria!</h2>
                        </div>
                    )


                    }

                    <div>
                        {/*notifications[estadoDePedidos]notificacion && (
                <div>
                    Pedido {EstadoPedido[estadoDePedidos]} pendiente.
                </div>
            )*/}

                    </div>

                </div >
            </div>
            <br></br>
        </div>
    )
}