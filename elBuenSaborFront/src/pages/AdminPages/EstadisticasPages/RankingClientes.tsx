import { useEffect, useState } from 'react'
import { PageProyeccionHistorialPedido, ProyeccionHistorialPedido } from '../../../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente';
import { ClienteService } from '../../../services/ClienteService';
import ClientesCardComponent from '../../../components/ComponentesRanking/ClientesCardComponent';
import '../../../css/estilosEstadistias.css'
import { useNavigate } from 'react-router-dom';
import Paginacion from '../../../components/genericos/Paginacion';
import OrdenamientosClienteComponent from '../../../components/ComponentesRanking/OrdenamientosClienteComponent';


export default function RankingClientes() {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(0);
    const [rankingCliente, setRankingCliente] = useState<PageProyeccionHistorialPedido<ProyeccionHistorialPedido>>();


    const traerClientes = async (pageNumber: number) => {
        const servicioCliente = new ClienteService();
        try {
            const clientes = await servicioCliente.getRankingClientes(pageNumber);
            setRankingCliente(clientes);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAtras = () => {
        navigate(-1);
    };

    const actualizarPagina = (pageNumber: number) => {
        setPage(pageNumber);
    };


    useEffect(() => {
        traerClientes(page);
    }, [page]);
    

    const ordenarPorImporteTotal = (estado: boolean) => {
        if (rankingCliente) {
            if (estado) {
                const nuevoOrden = rankingCliente.content.slice().sort((a, b) => b.importe_total - a.importe_total);
                setRankingCliente({ ...rankingCliente, content: nuevoOrden });
            } else {
                const nuevoOrden = rankingCliente.content.slice().sort((a, b) => a.importe_total - b.importe_total);
                setRankingCliente({ ...rankingCliente, content: nuevoOrden });
            }
        }
    };

    const ordenarPorCantidadPedidos = (estado: boolean) => {
        if (rankingCliente) {
            if (estado) {
                const nuevoOrden = rankingCliente.content.slice().sort((a, b) => b.cantidad_pedidos - a.cantidad_pedidos);
                setRankingCliente({ ...rankingCliente, content: nuevoOrden });
            } else {
                const nuevoOrden = rankingCliente.content.slice().sort((a, b) => a.cantidad_pedidos - b.cantidad_pedidos);
                setRankingCliente({ ...rankingCliente, content: nuevoOrden });
            }
        }
    }

    if (rankingCliente === undefined) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="card card-generica ancho-card">
                <div className="contenedor-tituloEstadistica text-white">
                    <h3 className="card-title text-center">Ranking de Clientes</h3>
                </div>
                <OrdenamientosClienteComponent ordenarPorImporteTotal={ordenarPorImporteTotal} ordenarPorCantidadPedidos={ordenarPorCantidadPedidos}/>
                <div className="card-body d-flex flex-column">
                    <div className="d-flex flex-column mb-3">
                        {rankingCliente.content.map((cliente) => (
                            <div key={cliente.id_cliente}>
                                <ClientesCardComponent cliente={cliente} />
                            </div>
                        ))}
                    </div>
                </div>
                <Paginacion
                    page={rankingCliente.pageable.pageNumber}
                    setPage={actualizarPagina}
                    totalPages={rankingCliente.totalPages}
                    size={rankingCliente.size}
                />
                <div className="d-flex justify-content-between">
                    <button className="btn btn-atras text-white" onClick={handleAtras}>
                        Atrás
                    </button>
                    <button className="btn btn-excel text-white">Excel</button>
                </div>
            </div>
        </div>
    );
}