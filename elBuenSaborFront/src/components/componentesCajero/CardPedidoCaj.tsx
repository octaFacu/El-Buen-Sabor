import { useEffect, useState } from "react"
import Pedido, { EstadoPedido } from "../../context/models/Pedido"
import './CardPedidoCaj.css'
import PedidoHasProductos from "../../context/models/PedidoHasProductos"
import { PedidoService } from "../../services/PedidoService"
import ProductoPedidoCard from "./ProductoPedidoCard"
interface ProdFormProps {

    pedido: Pedido,
    changeEstadoPedido: any

}

const CardPedidoCaja: React.FC<ProdFormProps> = ({ pedido, changeEstadoPedido}) => {

    const servicePedido = new PedidoService();
    const [productos, setProductos] = useState<PedidoHasProductos[]>([]);

    const getProductos = async() => {
        //servicePedido.getByEstado(EstadoPedido[estadoDePedidos])
        await setProductos([]);
        await servicePedido.getProductosByPedido(pedido.id!)
        
        .then(data => {
            setProductos(data)
        })
    }

    useEffect(() => {
        
        getProductos();
    }, [pedido]);

    return( //mx-5 me-3
        <div className="container my-3 card-pedidos px-2 pt-2 pb-2" style={{maxWidth: "93%"}}>
            <div className="">
                <h4 className="text-pedido mt-2">Pedido n{pedido.numeroPedidoDia}</h4>
            </div>
            <hr className="separator-white"></hr>
            <div>
             {productos.map(prod => (
                <div>
                    
                    <ProductoPedidoCard prod={prod}></ProductoPedidoCard>
                </div>
            ))}
                    
                    
            </div>
            <hr className="separator-white"></hr>
            <p className="text-pedido">Total: ${pedido.precioTotal}</p>
            <hr className="separator-white"></hr>
            <div className="mx-2 mb-3">
            <select className="dropdown-estado form-select mb-3 me-2" id="categoria" name="categoria" onChange={e => {changeEstadoPedido(e.target.value, pedido) }}>
                                     <option selected value={JSON.stringify(pedido.estado)}>{pedido.estado}</option>
                                    {Object.values(EstadoPedido)
                                    .filter(state => typeof state === "string")
                                    .map((state, index) => (
                                        pedido.estado !== state && (
                                            <option key={index} value={state} disabled={"Listo" === state || "AConfirmar" === state || (!pedido.esEnvio && state === "EnDelivery")}>
                                                {state} 
                                            </option>
                                        )
                                    ))}
            </select>
              </div>                  
        </div>
    )
}
export default CardPedidoCaja;