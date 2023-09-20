import Pedido from "./Pedido";
import Producto from "./Producto";

export class PedidoHasProductos{
    id?: number = 0;
    cantidad: number = 0;
    pedido?: Pedido = new Pedido();
    producto: Producto = new Producto();
}

export default PedidoHasProductos;