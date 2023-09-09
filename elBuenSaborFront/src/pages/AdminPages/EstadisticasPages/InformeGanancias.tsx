import BotonExcelYAtrasComponent from '../../../components/ComponentesRanking/BotonExcelYAtrasComponent';
import InformeGananciaComponent from '../../../components/ComponentesRanking/ComponentesInformeGanancias/InformeGananciaComponent';
import InformeGananciaMesComponent from '../../../components/ComponentesRanking/ComponentesInformeGanancias/InformeGananciaMesComponent';
import InformeRentabiliadadComponent from '../../../components/ComponentesRanking/ComponentesInformeGanancias/InformeRentabiliadadComponent';
import '../../../css/estilosEstadistias.css'

export default function InformeGanancias() {


    return (
        <div className="container mx-auto">
            <div className="card-generica ">
                <div className="contenedor-tituloEstadistica text-white">
                    <h3 className="card-title text-center">Informe de ganancias</h3>
                </div>
                <InformeGananciaComponent />
                <InformeRentabiliadadComponent/>
                <InformeGananciaMesComponent/>
                <BotonExcelYAtrasComponent nombre='informe-ganancias' informe={3} />
            </div>
        </div>
    );

}
