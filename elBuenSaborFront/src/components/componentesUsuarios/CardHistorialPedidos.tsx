import { useState } from 'react'
import { ProyeccionPedidoUsuario } from '../../context/interfaces/Proyecciones/ProyeccionPedidoUsuario'
import { format } from 'date-fns';
import { es } from "date-fns/locale";
import ModalPedido from './modales/ModalPedido';
import "../../css/favoritos.css";

interface Props {
  historial: ProyeccionPedidoUsuario

  setShow: (val: boolean) => void
}

export default function CardHistorialPedidos({ historial, setShow }: Props) {

  const [abrirModal, setAbrirModal] = useState<boolean>(false)
  const [idPedido, setIdPedido] = useState<number>(0)

  const abrirModall = (id: number) => {
    setIdPedido(id)
    setAbrirModal(true)
  }

  const cerrarModal = () => {
    setAbrirModal(false)
  }

  return (
    <>
      <div className="card card-cliente" onClick={() => abrirModall(historial.pedido_id)} >
        <div className="card-body d-md-block d-md-inline-flex justify-content-between text-white">
          <p className="card-text text-pantallaPequeña">{historial.es_envio ? "Envio" : "Retiro local (10% desc)"}</p>
          <p className="card-text text-pantallaPequeña">Cantidad de productos: {historial.total_pedidos}</p>
          <p className="card-text text-pantallaPequeña">Total: ${historial.precio_total}</p>
          <p className="card-text text-pantallaPequeña fecha-text">{format(new Date(historial.fecha_pedido), 'dd MMMM yyyy', { locale: es })}</p>
        </div>
      </div>
      {abrirModal && (
        <ModalPedido mostrarModal={abrirModal} cerrarModal={cerrarModal} idPedido={idPedido} esEnvio={historial.es_envio} setShow={setShow}/>
      )}
    </>
  )
}
