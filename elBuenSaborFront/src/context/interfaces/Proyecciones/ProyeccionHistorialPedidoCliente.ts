export interface ProyeccionHistorialPedido{
   id_cliente: number;
   nombre: string;
   cantidad_pedidos: number;
   importe_total: number;
}

export interface PageProyeccionHistorialPedido<T> {
   content: T[];
   totalPages: number;
   totalElements: number;
   size: number;
   number: number;
   pageable: {
     sort: {
       empty: boolean;
       sorted: boolean;
       unsorted: boolean;
     };
     offset: number;
     pageSize: number;
     pageNumber: number;
     unpaged: boolean;
     paged: boolean;
   };
   last: boolean;
   sort: {
     empty: boolean;
     sorted: boolean;
     unsorted: boolean;
   };
   first: boolean;
   numberOfElements: number;
   empty: boolean;
 }