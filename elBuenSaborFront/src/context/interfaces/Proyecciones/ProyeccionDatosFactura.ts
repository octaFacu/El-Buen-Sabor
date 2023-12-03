export interface ProyeccionDatosFactura{
    id: number,
    numero_factura: number,
    es_envio: boolean,
    numero_pedido_dia: number,
    precio_total: number,
    fecha_pedido: string,
    nombre: string,
    apellido: string
    tipo: string;
}