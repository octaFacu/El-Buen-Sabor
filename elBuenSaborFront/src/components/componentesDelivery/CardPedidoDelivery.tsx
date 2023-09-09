import { useEffect, useState } from "react"
import Pedido, { EstadoPedido } from "../../context/interfaces/Pedido"
import '../componentesCajero/CardPedidoCaj.css'
import PedidoHasProductos from "../../context/interfaces/PedidoHasProductos"
import { PedidoService } from "../../services/PedidoService"
import ProductoDeliveryCard from "./ProductoDeliveryCard"
import MapLocation from "./MapLocation"

interface ProdFormProps {

    pedido: Pedido,

}

const CardPedidoDelivery: React.FC<ProdFormProps> = ({ pedido }) => {

    const servicePedido = new PedidoService();
    const [productos, setProductos] = useState<PedidoHasProductos[]>([]);

    const handleChangeEstado = () => {
        pedido.estado = EstadoPedido["Listo"];
        servicePedido.updateEntity(pedido);
        window.location.reload();
    };

    const getProductos = async () => {
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
            <hr className="separator-white"></hr>
            <div className="mx-2 mb-3">
                <div className="btn btn-success" onClick={()=> handleChangeEstado()}><i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}>check</i></div>
            </div>
        </div>
    )
}
export default CardPedidoDelivery;