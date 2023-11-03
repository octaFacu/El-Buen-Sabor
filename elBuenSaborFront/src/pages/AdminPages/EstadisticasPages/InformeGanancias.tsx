import BotonExcelYAtrasComponent from '../../../components/ComponentesRanking/BotonExcelYAtrasComponent';
import InformeGananciaComponent from '../../../components/ComponentesRanking/ComponentesInformeGanancias/InformeGananciaComponent';
import InformeGananciaMesComponent from '../../../components/ComponentesRanking/ComponentesInformeGanancias/InformeGananciaMesComponent';
import InformeRentabiliadadComponent from '../../../components/ComponentesRanking/ComponentesInformeGanancias/InformeRentabiliadadComponent';
import { useState } from 'react';

export default function InformeGanancias() {
    const [componenteActual, setComponenteActual] = useState(0);
    const componentes = [
      <InformeGananciaComponent />,
      <InformeRentabiliadadComponent />,
      <InformeGananciaMesComponent />,
    ];
  
    const mostrarComponenteAnterior = () => {
      if (componenteActual > 0) {
        setComponenteActual(componenteActual - 1);
      }
    };
  
    const mostrarComponenteSiguiente = () => {
      if (componenteActual < componentes.length - 1) {
        setComponenteActual(componenteActual + 1);
      }
    };
  
    return (
      <div className="container mx-auto">
        <div className="card-ranking mt-4">
          <div className="contenedor-tituloEstadistica text-white">
            <h3 className="card-title text-center">Informe de ganancias</h3>
          </div><BotonExcelYAtrasComponent nombre='informe-ganancias' informe={3} />
          {componentes[componenteActual]}
          <div className='d-flex justify-content-between'>
            <button className='btn btn-ranking' onClick={mostrarComponenteAnterior} disabled={componenteActual === 0}>
              Atrás
            </button>
            <button className='btn btn-ranking'
              onClick={mostrarComponenteSiguiente}
              disabled={componenteActual === componentes.length - 1}
            >
              Adelante
            </button>
          </div>
        </div>
      </div>
    );
  }