import { useEffect, useState } from "react";
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
import { useUnidadContext } from "../../context/GlobalContext";


export const CocineroPedidosPage = () => {

    (window as any).global = window
    const [estadoModal, setEstadoModal] = useState(false);
    const [productoModal, setProductoModal] = useState<Producto>(new Producto()); 
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const servicePedido = new pedidoService();
    const [notificacion, setNotificacion] = useState(false);
    const { rol } = useUnidadContext();


    const getPedidos = async() => {
        //servicePedido.getByEstado(EstadoPedido[estadoDePedidos])
        servicePedido.getByEstado("EnCocina", rol)
        .then(data => {
            setPedidos(data)
        }) 
    } 

    useEffect(() => {
        console.log(productoModal.denominacion)
    }, [productoModal]);

    
    useEffect(() => {
        getPedidos();
        const socket = new SockJS('http://localhost:8080/ws-endpoint');
        //const socket = Socket.io('/ws-endpoint');
        const stompClient = Stomp.over(socket);

        const handleNotification = async(attributeValue: string) => {

            console.log('Received attribute value:', attributeValue);
            if(attributeValue === "EnCocina"){
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




    return(
        <div>
            { notificacion && <div>
                <div className="notification">
          <p>Tienes un Pedido a Preparar Nuevo.</p>
          <button onClick={() => setNotificacion(false)}>x</button>
        </div>
            </div>}
        <div>
             <div className="container my-5 pb-1 mb-3 " style={{ background: "#f99132", borderRadius: "25px" }}>

       
            <div className="titleAndAddButton pb-3">
                <div className="text-center pt-4 px-3 d-flex">
                    <h1 style={{ margin: "auto", color: "white" }}>A Preparar</h1>
                </div>
                
            </div>
            
            

           


            {pedidos.length > 0 ? (
                <div /*className="card-containerPed"*/ className="row">
                    {pedidos.map(ped => (
                         <div className="col-sm-6 col-md-4">
                            <CardPedidoCocina setProducto={setProductoModal} pedido={ped} estado={estadoModal} changeEstado={setEstadoModal} ></CardPedidoCocina>
                            </div>
                    ))} 
                    
                </div>
            ) : (
                <div className="container">
                    <h2 style={{color: "white"}} className="no-pedidos-text mt-5 mb-5">No hay Pedidos para Preparar!</h2>
                </div>
            )
            
                
            }
                
            <div>


            </div>

        </div >
        </div>
        <br></br>
        <DetalleProdCocina producto={productoModal} estado={estadoModal} changeEstado={setEstadoModal}></DetalleProdCocina>
        </div>
    )
}
export default CocineroPedidosPage