export interface ProyeccionHistorialPedido{
   id_cliente: number;
   nombre: string;
   cantidad_pedidos: number;
   importe_total: number;
}
export interface PageProyeccionHistorialPedido {
   content: ProyeccionHistorialPedido[];
   totalPages: number;
   totalElements: number;
   size: number;
   number: number;
 }