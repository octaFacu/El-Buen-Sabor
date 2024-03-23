import { useState, useEffect } from "react";
import { Usuario } from "../../context/interfaces/interfaces";
import { ProyeccionPedidoUsuario } from "../../context/interfaces/Proyecciones/ProyeccionPedidoUsuario";
import { ClienteService } from "../../services/ClienteService";
import CardHistorialPedidos from "./CardHistorialPedidos";
import { PageProyeccionHistorialPedido } from "../../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente";
import Paginacion from "../genericos/Paginacion";
import "../../css/favoritos.css";
import { useUnidadContext } from "../../context/GlobalContext";

interface Props {
  usuario: Usuario;
}

export default function MisPedidosComponent({ usuario }: Props) {
  const [pedidos, setPedidos] = useState<PageProyeccionHistorialPedido<ProyeccionPedidoUsuario>>();

  const { rol } = useUnidadContext();

  const servicioCliente = new ClienteService();

  const [page, setPage] = useState<number>(0);

  const traerPedidos = async (pageNumber: number) => {
    try {
      const idCliente = await servicioCliente.getIdCliente(usuario.id, rol)
      const pedido = await servicioCliente.getPedidosUsuario(
        rol,idCliente, pageNumber
      );
      setPedidos(pedido);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    traerPedidos(page);
  }, [page]);

  const actualizarPagina = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (pedidos === undefined) {
    return <div>cargando...</div>
  }

  return (
    <div className="container mx-auto">
      <div className="card card-favoritos mt-6">
        <div className="contenedor-titulo text-white">
          <h3 className="card-title text-center">Historial de pedidos</h3>
        </div>
        <div className="card-body d-flex flex-column scrollable-container">
          <div className="d-flex flex-column mb-3">
            {
              pedidos.content.length === 0 ? (
                <h4 className='text-center'>Todavia no ah realizado ningun pedido</h4>
              ) : (
                pedidos.content.map((historial: ProyeccionPedidoUsuario) => (
                  <div key={historial.pedido_id}>
                    <CardHistorialPedidos historial={historial} />
                  </div>
                ))
              )
            }
          </div>
          <Paginacion page={pedidos.pageable.pageNumber}
            setPage={actualizarPagina}
            totalPages={pedidos.totalPages}
            size={pedidos.size} />
        </div>
      </div>
    </div>
  );
}
