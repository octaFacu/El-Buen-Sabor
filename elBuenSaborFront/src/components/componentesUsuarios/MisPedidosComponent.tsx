import { useState, useEffect } from "react";
import { Usuario } from "../../context/interfaces/interfaces";
import { ProyeccionPedidoUsuario } from "../../context/interfaces/Proyecciones/ProyeccionPedidoUsuario";
import { pedidoService } from "../../services/PedidoService";
import { ClienteService } from "../../services/ClienteService";
import { format } from 'date-fns'; 
import { es } from "date-fns/locale";
import ModalPedido from "./modales/ModalPedido";


interface Props {
  usuario: Usuario;
}

export default function MisPedidosComponent({ usuario }: Props) {
  const [pedidos, setPedidos] = useState<ProyeccionPedidoUsuario[]>();
  const [abrirModal, setAbrirModal] = useState<boolean>(false)
  const [idPedido, setIdPedido] = useState<number>(0)

  const servicioPedido = new pedidoService();
  const servicioCliente = new ClienteService();

  const traerPedidos = async () => {
    try {
      const pedido = await servicioPedido.getPedidosUsuario(
        await servicioCliente.getIdCliente(usuario.id)
      );
      setPedidos(pedido);
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModall = (id: number)=>{
    setIdPedido(id)
    setAbrirModal(true)
  }

  const cerrarModal = ()=>{
    setAbrirModal(false)
  }

  useEffect(() => {
    traerPedidos();
  }, []);

  return (
    <div className="text-center" style={{ marginTop: "6rem" }}>
      <h2 className="bold">Pedidos Anteriores</h2>
      <div className="card-container espacio-pedidos card-generica "> 
        {pedidos?.map((pedido) => (
          <div className="card" key={pedido.pedido_id} onClick={()=>(abrirModall(pedido.pedido_id))}> {/* Pasamos el pedido_id al abrir el modal */}
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>Entregado: {pedido.total_pedidos} productos</div>
                <div>{format(new Date(pedido.fecha_pedido), 'dd MMMM yyyy', { locale: es })}</div>
                <div>${pedido.precio_total}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      { abrirModal && (
        <ModalPedido mostrarModal={abrirModal} cerrarModal={cerrarModal} idPedido={idPedido}/>
      )}
    </div>
  );
}
