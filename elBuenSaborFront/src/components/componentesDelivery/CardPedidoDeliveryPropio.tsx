import { useEffect, useState } from "react"
import Pedido, { EstadoPedido } from "../../context/interfaces/Pedido"
import '../componentesCajero/CardPedidoCaj.css'
import PedidoHasProductos from "../../context/interfaces/PedidoHasProductos"
import { pedidoService } from "../../services/PedidoService"
import ProductoDeliveryCard from "./ProductoDeliveryCard"
import MapLocation from "./MapLocation"
import { useUnidadContext } from "../../context/GlobalContext"
import { useAuth0 } from "@auth0/auth0-react"
import { FacturaService } from "../../services/FacturaService"

interface ProdFormProps {

    pedido: Pedido,

}

const CardPedidoDeliveryPropio: React.FC<ProdFormProps> = ({ pedido }) => {

    const { user } = useAuth0();
    const { rol } = useUnidadContext();
    const servicePedido = new pedidoService();
    const serviceFactura = new FacturaService();
    const [productos, setProductos] = useState<PedidoHasProductos[]>([]);

    const handleChangeEstado = () => {
        pedido.estado = "Entregado";
        servicePedido.updateEntity(pedido, rol);
        serviceFactura.createFactura(pedido, rol);
        window.location.reload();
    };

    const getProductos = async () => {
        //servicePedido.getByEstado(EstadoPedido[estadoDePedidos])
        await setProductos([]);
        await servicePedido.getProductosByPedido(pedido.id!, rol)

            .then(data => {
                setProductos(data)
            })
    }

    useEffect(() => {

        getProductos();
    }, [pedido]);

    return ( //mx-5 me-3
        <div className="container my-3 card-pedidos px-2 pt-2 pb-2" style={{ maxWidth: "93%" }}>
            <div className="">
                <h4 className="text-pedido mt-2">Pedido n{pedido.numeroPedidoDia}</h4>
            </div>
            <hr className="separator-white"></hr>
            <MapLocation direccion={pedido.direccion!} id={pedido.id!}></MapLocation>
            <p className="text-pedido" >{pedido.cliente.usuario.nombre} {pedido.cliente.usuario.apellido}</p>
            <hr className="separator-white"></hr>
            <div>
                {productos.map(prod => (
                    <div>

                        <ProductoDeliveryCard prod={prod}></ProductoDeliveryCard>
                    </div>
                ))}


            </div>
            <div className="text-pedido">{pedido.horaEstimada}hs</div>
            <hr className="separator-white"></hr>
            <div className="mx-2 mb-3">
                <div className="btn btn-success" onClick={()=> handleChangeEstado()}>Entregado <i className="material-icons" style={{fontSize: "14px", cursor:"pointer"}}>check</i></div>
            </div>
        </div>
    )
}
export default CardPedidoDeliveryPropio;