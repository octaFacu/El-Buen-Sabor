import {useState} from 'react'
import { ProyeccionPedidoUsuario } from '../../context/interfaces/Proyecciones/ProyeccionPedidoUsuario'
import { format } from 'date-fns'; 
import { es } from "date-fns/locale";
import ModalPedido from './modales/ModalPedido';


interface Props {
  historial: ProyeccionPedidoUsuario
}

export default function CardHistorialPedidos({historial}: Props) {

  const [abrirModal, setAbrirModal] = useState<boolean>(false)
  const [idPedido, setIdPedido] = useState<number>(0)

  const abrirModall = (id: number)=>{
    setIdPedido(id)
    setAbrirModal(true)
  }

  const cerrarModal = () => {
    setAbrirModal(false)
  }

  return (
    <>
    <div className="card card-cliente" onClick={()=>abrirModall(historial.pedido_id)}>
      <div className="card-body d-inline-flex justify-content-between text-white">
        <p className="card-text">{historial.es_envio ? "Envio" : "Retiro local"}</p>
        <p className="card-text">Cantidad de pedidos: {historial.total_pedidos}</p>
        <p className="card-text">Total Gastado: {historial.precio_total}</p>
        <p className="card-text">{format(new Date(historial.fecha_pedido), 'dd MMMM yyyy', { locale: es })}</p>
      </div>
    </div>
    { abrirModal && (
        <ModalPedido mostrarModal={abrirModal} cerrarModal={cerrarModal} idPedido={idPedido}/>
      )}
    </>
    
  )
}
