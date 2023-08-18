import { useState, useEffect } from 'react'
import { useNavigate, useParams  } from 'react-router-dom';
import { ProyeccionPedidoUsuario } from '../../../../context/interfaces/Proyecciones/ProyeccionPedidoUsuario';
import CardHistorialPedidos from '../../../../components/componentesUsuarios/CardHistorialPedidos';
import { PageProyeccionHistorialPedido } from '../../../../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente';
import Paginacion from '../../../../components/genericos/Paginacion';
import { ClienteService } from '../../../../services/ClienteService';



export default function HistorialClienteAdmin() {
  const navigate = useNavigate();

  const { clienteId } = useParams();
  const [historial, setHistorial] = useState<PageProyeccionHistorialPedido<ProyeccionPedidoUsuario>>();
  const [page, setPage] = useState<number>(0);

  const traerHistorialPedidos = async (pageNumber: number) => {
    try {
      console.log(clienteId)
      const servicioPedido = new ClienteService();
      const historial = await servicioPedido.getPedidosUsuario(parseInt(clienteId ?? '0'), pageNumber);
      setHistorial(historial);
      
    } catch (err) {
      console.error(err);
    }
  }

  const handleAtras = () => {
    navigate(-1)
  };

  const actualizarPagina = (pageNumber: number) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    traerHistorialPedidos(page);
  
  }, [page]);

  if (historial === undefined) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="card card-generica ancho-card">
        <div className="contenedor-tituloEstadistica text-white">
          <h3 className="card-title text-center">Historial del cliente</h3>
        </div>
        <div className="card-body d-flex flex-column">
          <div className="d-flex flex-column mb-3">
            {
              historial.content.length === 0 ? (
                <h4 className='text-center'>Este usuario todavia no ah realizado ningun pedido</h4>
              ) : (
                historial.content.map((historial: ProyeccionPedidoUsuario) => (
                  <div key={historial.pedido_id}>
                    <CardHistorialPedidos historial={historial} />
                  </div>
                ))
              )
            }
          </div>
          <Paginacion page={historial.pageable.pageNumber}
            setPage={actualizarPagina}
            totalPages={historial.totalPages}
            size={historial.size} />
          <div className="d-flex justify-content-center">
            <button className="btn btn-atras text-white" onClick={handleAtras}>
              Atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}