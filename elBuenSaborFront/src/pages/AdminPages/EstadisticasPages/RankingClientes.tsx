import { useEffect, useState } from 'react'
import { PageProyeccionHistorialPedido, ProyeccionHistorialPedido } from '../../../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente';
import { ClienteService } from '../../../services/ClienteService';
import ClientesCardComponent from '../../../components/ComponentesRanking/ComponenteRankingCliente/ClientesCardComponent';
import '../../../css/estilosEstadistias.css'
import Paginacion from '../../../components/genericos/Paginacion';
import OrdenamientosClienteComponent from '../../../components/ComponentesRanking/ComponenteRankingCliente/OrdenamientosClienteComponent';
import BotonExcelYAtrasComponent from '../../../components/ComponentesRanking/BotonExcelYAtrasComponent';


export default function RankingClientes() {

    const [page, setPage] = useState<number>(0);
    const [rankingCliente, setRankingCliente] = useState<PageProyeccionHistorialPedido<ProyeccionHistorialPedido>>();
    const servicioCliente = new ClienteService();
    const [orderBy, setOrderBy] = useState<string>("id_cliente");
    const [direccion, setDireccion] = useState<string>("DESC");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null); // 

    const traerClientesConOrden = async (pageNumber: number) => {
        try {
            const clientes = await servicioCliente.getRankingClientess(pageNumber, 3, orderBy, direccion, startDate, endDate);
            setRankingCliente(clientes);
        } catch (error) {
            console.error(error);
        }
    };
    const actualizarPagina = (pageNumber: number) => {
        setPage(pageNumber);
    };


    useEffect(() => {
        traerClientesConOrden(page);
    }, [page, orderBy, direccion, startDate, endDate]);


    const actualizarCriteriosOrdenamiento = (nuevoOrderBy: string, nuevaDireccion: string, nuevaFechaInicio: Date | null, nuevaFechaFin: Date | null) => {
        setOrderBy(nuevoOrderBy);
        setDireccion(nuevaDireccion);
        setStartDate(nuevaFechaInicio); 
        setEndDate(nuevaFechaFin);     
        traerClientesConOrden(0);  // Traer clientes de la página 0 con los nuevos criterios y fechas
    };

    if (rankingCliente === undefined) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="card card-generica ancho-card">
                <div className="contenedor-tituloEstadistica text-white">
                    <h3 className="card-title text-center">Ranking de Clientes</h3>
                </div>
                <OrdenamientosClienteComponent actualizarCriteriosOrdenamiento={actualizarCriteriosOrdenamiento} />
                <div className="card-body d-flex flex-column">
                    <div className="d-flex flex-column mb-3">
                        {rankingCliente.content.map((cliente) => (
                            <div key={cliente.id_cliente}>
                                <ClientesCardComponent cliente={cliente} startDate={startDate} endDate={endDate}/>
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
                <BotonExcelYAtrasComponent informe={1} nombre='InformeClientes'/>
            </div>
        </div>
    );
}