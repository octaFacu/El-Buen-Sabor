import {  ProyeccionHistorialPedido } from '../../../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente';
import { useNavigate } from 'react-router-dom';
import '../../../css/estilosEstadistias.css'



interface Props {
  cliente: ProyeccionHistorialPedido;
  startDate: Date | null;
  endDate: Date | null;
}

export default function ClientesCardComponent({ cliente,startDate,endDate }: Props) {
  const navigate = useNavigate();

  const traerHistorialPedido = async () => {
    try {
      navigate(`/admin/estadisticas/rankingCliente/HistorialCliente/${cliente.id_cliente}`, {state: {startDate, endDate}});
    } catch (err) {
      console.log(err);
    }
  };

  const verHistorial = async () => {
    await traerHistorialPedido();
  };

  return (
    <div className="card card-cliente">
      <div className="card-body d-inline-flex justify-content-between">
        <p className="card-text">Nombre: {cliente.nombre}</p>
        <p className="card-text">Cantidad de pedidos: {cliente.cantidad_pedidos}</p>
        <p className="card-text">Importe total: {cliente.importe_total}</p>
        <button className=" btn-historial text-center" onClick={verHistorial}>
          Ver Historial
        </button>
      </div>
    </div>
  );
}