import { useEffect, useState } from "react"
import Pedido, { EstadoPedido } from "../../context/models/Pedido"
import '../componentesCajero/CardPedidoCaj.css'
import PedidoHasProductos from "../../context/models/PedidoHasProductos"
import { PedidoService } from "../../services/PedidoService"
import ProductoCocinaCard from "./ProductoCocinaCard"
interface ProdFormProps {

    pedido: Pedido,
    estado: boolean, 
    changeEstado: any,
    setProducto: any

}

const CardPedidoCocina: React.FC<ProdFormProps> = ({ pedido, estado, changeEstado, setProducto }) => {

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
            <div>
                {productos.map(prod => (
                    <div>

                        <ProductoCocinaCard setProducto={setProducto} estado={estado} changeEstado={changeEstado} prod={prod}></ProductoCocinaCard>
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
export default CardPedidoCocina;