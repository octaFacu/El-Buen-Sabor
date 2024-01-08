import { useEffect, useState } from 'react'
import BotonExcelYAtrasComponent from '../../../components/ComponentesRanking/BotonExcelYAtrasComponent';
import RankingProductoComponent from '../../../components/ComponentesRanking/ComponentesRankingProducto/RankingProductoComponent';
import { PageProyeccionHistorialPedido } from '../../../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente';
import { rankingProductos } from '../../../context/interfaces/Proyecciones/ProyeccionProductoRanking';
import { ProductoService } from '../../../services/ProductoService';
import Paginacion from '../../../components/genericos/Paginacion';
import '../../../css/estilosEstadistias.css'
import "../../../css/estilosOrdenamientos.css"
import OrdenamientosComponentProductos from '../../../components/ComponentesRanking/ComponentesRankingProducto/OrdenamientosComponentProductos';
import { useUnidadContext } from '../../../context/GlobalContext';

export default function RankingProductos() {

    const { rol } = useUnidadContext();
    const [page, setPage] = useState<number>(0);
    const [bebidas, setBebidas] = useState<PageProyeccionHistorialPedido<rankingProductos>>();
    const [comidas, setComidas] = useState<PageProyeccionHistorialPedido<rankingProductos>>();
    const [direccion, setDireccion] = useState<string>("DESC");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null); // 

    const servicioProducto = new ProductoService;

    const traerProductosRanking = async (pageNumber: number) => {
        try {
            const comidas = await servicioProducto.getRankingProductosComida(startDate, endDate, direccion, 3, pageNumber, rol);
            const bebidas = await servicioProducto.getRankingProductosBebida(startDate, endDate, direccion, 3, pageNumber, rol);
            setComidas(comidas)
            setBebidas(bebidas);

        } catch (error: any) {
            throw error;
        }
    }

    const actualizarPagina = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const actualizarCriteriosDeOrdenamiento = (nuevaDireccion: string, nuevaFechaInicio: Date | null, nuevaFechaFin: Date | null) => {
        setDireccion(nuevaDireccion);
        setStartDate(nuevaFechaInicio);
        setEndDate(nuevaFechaFin);
        traerProductosRanking(0)
    }

    useEffect(() => {
        traerProductosRanking(page);
    }, [page, direccion, startDate, endDate]);

    if (comidas === undefined || bebidas === undefined) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="card card-generica ancho-card">
                <div className="contenedor-tituloEstadistica text-white">
                    <h3 className="card-title text-center">Ranking de Comidas</h3>
                </div>
                <div className="d-flex flex-column cliente-check">
                    <OrdenamientosComponentProductos criteriosOrdenamiento={actualizarCriteriosDeOrdenamiento} />
                </div>
                <div className="card-body d-flex flex-column">
                    <div className="d-flex flex-row mb-3">
                        <div className="flex-grow-1 d-flex flex-column align-items-center">
                            <h4 className="mb-3">Comidas</h4>
                            {comidas.content !== undefined && comidas.content.length > 0 ? (
                                comidas.content.map(comida => (
                                    <div key={comida.id}>
                                        <RankingProductoComponent productos={comida} />
                                    </div>
                                ))
                            ) : (
                                <h5>No hay más comidas disponibles</h5>
                            )}
                        </div>
                        <div className="flex-grow-1 d-flex flex-column align-items-center">
                            <h4 className="mb-3">Bebidas</h4>
                            {bebidas.content !== undefined && bebidas.content.length > 0 ? (
                                bebidas.content.map(bebida => (
                                    <div key={bebida.id}>
                                        <RankingProductoComponent productos={bebida} />
                                    </div>
                                ))
                            ) : (
                                <h5>No hay más bebidas disponibles</h5>
                            )}
                        </div>
                    </div>
                </div>
                <Paginacion
                    page={comidas.pageable.pageNumber}
                    setPage={actualizarPagina}
                    totalPages={comidas.totalPages}
                    size={comidas.size}
                />
                <BotonExcelYAtrasComponent informe={2} nombre='Informe Productos' />
            </div>
        </div>
    );
}