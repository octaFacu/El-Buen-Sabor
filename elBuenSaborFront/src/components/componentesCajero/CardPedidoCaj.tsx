import { useEffect, useState } from "react"
import Pedido, { EstadoPedido } from "../../context/interfaces/Pedido"
import './CardPedidoCaj.css'
import PedidoHasProductos from "../../context/interfaces/PedidoHasProductos"
import { pedidoService } from "../../services/PedidoService"
import ProductoPedidoCard from "./ProductoPedidoCard"
import { useUnidadContext } from "../../context/GlobalContext"
import { FacturaService } from "../../services/FacturaService"
interface ProdFormProps {

    pedido: Pedido,
    changeEstadoPedido: any

}

const CardPedidoCaja: React.FC<ProdFormProps> = ({ pedido, changeEstadoPedido}) => {

    const servicePedido = new pedidoService();
    const facturaService = new FacturaService();
    const [productos, setProductos] = useState<PedidoHasProductos[]>([]);
    const { rol } = useUnidadContext();

    const getProductos = async() => {
        //servicePedido.getByEstado(EstadoPedido[estadoDePedidos])
        await setProductos([]);
        await servicePedido.getProductosByPedido(pedido.id!, rol)
        
        .then(data => {
            setProductos(data)
        })
    }

    const generarNC = async() => {
        let factura = await servicePedido.getDatosFacturas(pedido.id!, rol);
        facturaService.generarNCPDF(factura.id!, rol);
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
            <p className="text-pedido">Hora estimada: {pedido.horaEstimada}hs</p>
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
            {pedido.estado === "Entregado" && 
            <div className="d-flex justify-content-end">
                <div className="btn btn-danger" onClick={generarNC}>Gen NC</div>
            </div>
            }
              </div>                  
        </div>
    )
}
export default CardPedidoCaja;