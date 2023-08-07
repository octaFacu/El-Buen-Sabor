import { useState, useEffect } from "react";
import { Usuario } from "../../context/interfaces/interfaces";
import { ProyeccionPedidoUsuario } from "../../context/interfaces/Proyecciones/ProyeccionPedidoUsuario";
import { ClienteService } from "../../services/ClienteService";
import CardHistorialPedidos from "./CardHistorialPedidos";
import { PageProyeccionHistorialPedido } from "../../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente";


interface Props {
  usuario: Usuario;
}

export default function MisPedidosComponent({ usuario }: Props) {
  const [pedidos, setPedidos] = useState<PageProyeccionHistorialPedido<ProyeccionPedidoUsuario>>();


  const servicioCliente = new ClienteService();

  const traerPedidos = async () => {
    try {
      const pedido = await servicioCliente.getPedidosUsuario(
        await servicioCliente.getIdCliente(usuario.id)
      );
      setPedidos(pedido);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    traerPedidos();
  }, []);

  return (
    <div className="text-center" style={{ marginTop: "6rem" }}>
      <h2 className="bold">Pedidos Anteriores</h2>
      <div className="card-container espacio-pedidos" > 
        {pedidos?.content.map((pedido) => (
          <CardHistorialPedidos historial={pedido} key={pedido.pedido_id}/>
        ))}
      </div>
    </div>
  );
}
