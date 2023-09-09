import PedidoHasProductos from "../../context/interfaces/PedidoHasProductos";

interface PedidoProps {

    prod: PedidoHasProductos;
}

const ProductoDeliveryCard: React.FC<PedidoProps> = ({ prod }) => {

    return(
        <div className="product-container cocina-card pt-2 pb-2 me-3 ms-3 mt-2">
            <img className="imagen-pedido border border-white rounded border-4 me-2 ms-4" src={prod.producto.imagen}></img>
            <p className="text-pedido me-1">X {prod.cantidad}</p>
            <p className="text-pedido"><strong>{prod.producto.denominacion}</strong></p>
        </div>
    )
    
};

export default ProductoDeliveryCard