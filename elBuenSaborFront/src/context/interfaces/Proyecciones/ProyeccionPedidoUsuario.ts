export interface ProyeccionPedidoUsuario{
    pedido_id: number;
    total_pedidos: number;
    fecha_pedido: Date;
    precio_total: number;
    es_envio: boolean;
}

export interface ProyeccionProductosPedido{
    pedido_id: number;
    producto_id: number;
    denominacion: string;
    cantidad: number;
    precio_total: number;
    imagen: string;
}