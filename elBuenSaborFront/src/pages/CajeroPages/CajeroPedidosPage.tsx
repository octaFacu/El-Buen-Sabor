import { useEffect, useState } from "react";
import { ListaCartasABM } from "../../components/genericos/ListaCartasABM"
import Pedido, { EstadoPedido } from "../../context/models/Pedido";
import { PedidoService } from "../../services/PedidoService";
import CardPedidoCaja from "../../components/componentesCajero/CardPedidoCaj";
import './CajeroPagesStyle.css';


export const CajeroPedidosPage = () => {

    const [estadoModal, setEstadoModal] = useState(false);
    const [allPedidos, setAllPedidos] = useState<Pedido[]>([]);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [estadoDePedidos, setEstadoDePedidos] = useState<EstadoPedido>(EstadoPedido.AConfirmar);
    const [pedidoSelected, setPedidoSelected] = useState<Pedido>();
    const servicePedido = new PedidoService();

    const getPedidos = async() => {
        //servicePedido.getByEstado(EstadoPedido[estadoDePedidos])
        servicePedido.getAllBasic()
        .then(data => {
            setAllPedidos(data)
        })
    }

    const getPedidosEstado = async() => {
        const estadoString = EstadoPedido[estadoDePedidos];
        const filteredPedidos = allPedidos.filter(pedido => pedido.estado.toString() === estadoString);
        await setPedidos(filteredPedidos);
    }

    useEffect(() => {
        getPedidos();

    }, [])

    useEffect(() => {
        getPedidosEstado();
    }, [estadoDePedidos]);

    const handleChangeEstado = (estadoDePedido: EstadoPedido, pedidoChanged: Pedido) => {
        pedidoChanged.estado = estadoDePedido;
        servicePedido.updateEntity(pedidoChanged);
        window.location.reload();
    }

    return(
        <div>
             <div className="container my-5 pb-1 mb-3 " style={{ background: "#f99132", borderRadius: "25px" }}>

       
            <div className="titleAndAddButton">
                <div className="text-center py-4 px-3 d-flex">
                    <h1 style={{ margin: "auto", color: "white" }}> Pedidos</h1>
                </div>
            </div>

            <div className="parent">

                <div className="child">
                    <input style={{display: "none"}}></input>
                </div>
                <div className="child">
                    <select className="dropdown-estado form-select mb-3 mr-3 " id="categoria" name="categoria" onChange={e => {setEstadoDePedidos(EstadoPedido[e.target.value as keyof typeof EstadoPedido]) }}>
                                     <option selected value={estadoDePedidos}>{estadoDePedidos}</option>
                                    {Object.values(EstadoPedido)
                                    .filter(state => typeof state === "string")
                                    .map((state, index) => (
                                        estadoDePedidos !== state && (
                                            <option key={index} value={state}>
                                                {state}
                                            </option>
                                        )
                                    ))}



                                    </select>
                </div>
                
             
            </div>


            {pedidos.length > 0 ? (
                <div className="card-container">
                    {pedidos.map(ped => (
                            <CardPedidoCaja changeEstadoPedido={handleChangeEstado} pedido={ped} estado={estadoModal}
                            cambiarEstado={setEstadoModal}></CardPedidoCaja>
                    ))}
                    
                </div>
            ) : (
                <div className="container">
                    <h2 style={{color: "white"}} className="no-pedidos-text mt-5 mb-5">No hay Pedidos de esta Categoria!</h2>
                </div>
            )
            
                
            }
                
            <div>

            </div>

        </div >
        </div>
    )
}