import { useEffect, useState } from 'react'
import { PageProyeccionHistorialPedido } from '../../../context/interfaces/Proyecciones/ProyeccionHistorialPedidoCliente';
import { ClienteService } from '../../../services/ClienteService';
import ClientesCardComponent from '../../../components/ComponentesRanking/ClientesCardComponent';

export default function RankingClientes() {

    const [rankingCliente, getRankingCliente] = useState<PageProyeccionHistorialPedido>();
    const traerClientes = async () => {
        const servicioCliente = new ClienteService();
        try {
            const clientes = await servicioCliente.getRankingClientes();
            getRankingCliente(clientes);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        traerClientes();
    }, [])

    return (
        <div className="container mx-auto">
            <div className="card card-generica ancho-card">
                <div className="contenedor-tituloEstadistica text-white">
                    <h3 className="card-title text-center">Ranking de Clientes</h3>
                </div>
                <div className="card-body d-flex flex-column">
                    <div className="d-flex flex-column mb-3 btn-separador">
                        {
                            rankingCliente?.content.map((cliente) => (
                                <ClientesCardComponent cliente={cliente} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
