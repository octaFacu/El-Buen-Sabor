import React from 'react'
import { ProyeccionHistorialPedido } from '../../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente';
interface Props {
    cliente: ProyeccionHistorialPedido;
}
export default function ClientesCardComponent({ cliente }: Props) {
    return (
        <div className="card card-cliente">
          <div className="card-body d-inline-flex justify-content-between">
            <p className='card-text'>Nombre: {cliente.nombre}</p>
            <p className='card-text'>Cantidad de pedidos: {cliente.cantidad_pedidos}</p>
            <p className='card-text'>Importe total: {cliente.importe_total}</p>
            <button className=" btn-historial">Ver Historial</button>
          </div>
        </div>
    );
}