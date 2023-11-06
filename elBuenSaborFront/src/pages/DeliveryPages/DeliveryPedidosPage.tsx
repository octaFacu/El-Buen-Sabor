import { SetStateAction, useEffect, useState } from "react";
import { ListaCartasABM } from "../../components/genericos/ListaCartasABM"
import Pedido, { EstadoPedido } from "../../context/interfaces/Pedido";
import { pedidoService } from "../../services/PedidoService";
import '../CajeroPages/CajeroPagesStyle.css';
import { Stomp } from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
import * as Socket from 'socket.io-client';
import CardPedidoCocina from "../../components/componentesCocina/CardPedidoCocina";
import DetalleProdCocina from "../../components/componentesCocina/DetalleProdCocina";
import Producto from "../../context/interfaces/Producto";
import CardPedidoDelivery from "../../components/componentesDelivery/CardPedidoDelivery";
import { useUnidadContext } from "../../context/GlobalContext";
import CardPedidoDeliveryPropio from "../../components/componentesDelivery/CardPedidoDeliveryPropio";
import { useAuth0 } from "@auth0/auth0-react";


export const DeliveryPedidosPage = () => {

    (window as any).global = window
    const {user, isLoading} = useAuth0();
    const { rol } = useUnidadContext();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const servicePedido = new pedidoService();
    const [notificacion, setNotificacion] = useState(false);
    const [esDeliveryPropio, setEsDeliveryPropio] = useState(false);

    const handleOptionChange = (estado: boolean) => {
      setEsDeliveryPropio(estado);
    };


    const getPedidos = async () => {

        if(!esDeliveryPropio){
            servicePedido.getByEstado("Listo", rol)
            .then(data => {
                // Filter the data where esEnvio is true
                const filteredPedidos: Pedido[] = data.filter((pedido: Pedido) => pedido.esEnvio === true);
                setPedidos(filteredPedidos);
            });
        }else{
            if(!isLoading){
                servicePedido.getByDelivery(user!["id"].toString(), rol)
            .then(data => {
                // Filter the data where esEnvio is true
                const filteredPedidos: Pedido[] = data.filter((pedido: Pedido) => pedido.esEnvio === true);
                setPedidos(filteredPedidos);
            });
            }
            
        }
        
    };
    
    

    
    useEffect(() => {
        getPedidos();
        const socket = new SockJS('http://localhost:8080/ws-endpoint');
        //const socket = Socket.io('/ws-endpoint');
        const stompClient = Stomp.over(socket);

        const handleNotification = async(attributeValue: string) => {

            console.log('Received attribute value:', attributeValue);
            if(attributeValue === "Listo"){
                setNotificacion(true);
            }
            
            
            setTimeout(() => {

                setNotificacion(false);
            }, 30000);

            await getPedidos();
        };

        stompClient.connect({}, () => {
            // Connected
            console.log("conectado al web socket");
            const subscription = stompClient.subscribe('/topic/pedidos', async (notification) => {
                console.log("entro a la notificacion");
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
        getPedidos();
    }, []); 



    return (
        <div>
          {notificacion && (
            <div>
              <div className="notification">
                <p>Hay un nuevo envío a realizar.</p>
                <button onClick={() => setNotificacion(false)}>x</button>
              </div>
            </div>
          )}
          <div>
            <div className="container my-5 pb-1 mb-3 " style={{ background: "#f99132", borderRadius: "25px" }}>
              {!esDeliveryPropio ? (
                <div>
                  <div className="titleAndAddButton pb-3">
                    <div className="text-center pt-4 px-3 d-flex">
                      <h1 style={{ margin: "auto", color: "white" }}>Envíos Pendientes</h1>
                    </div>
                  </div>
                  {pedidos.length > 0 ? (
                    <div className="row">
                      {pedidos.map(ped => (
                        <div className="col-sm-6 col-md-4">
                          <CardPedidoDelivery pedido={ped}></CardPedidoDelivery>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="container">
                      <h2 style={{ color: "white" }} className="no-pedidos-text mt-5 mb-5">No hay Envíos Pendientes!</h2>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="titleAndAddButton pb-3">
                    <div className="text-center pt-4 px-3 d-flex">
                      <h1 style={{ margin: "auto", color: "white" }}>Envíos Asignados Pendientes</h1>
                    </div>
                  </div>
                  {pedidos.length > 0 ? (
                    <div className="row">
                      {pedidos.map(ped => (
                        <div className="col-sm-6 col-md-4">
                          <CardPedidoDeliveryPropio pedido={ped}></CardPedidoDeliveryPropio>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="container">
                      <h2 style={{ color: "white" }} className="no-pedidos-text mt-5 mb-5">No hay Envíos Pendientes!</h2>
                    </div>
                  )}
                </div>
              )}
              <div></div>
            </div>
          </div>
          <br></br>
        </div>
      );
      
}
export default DeliveryPedidosPage