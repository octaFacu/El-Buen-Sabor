import {useState, useEffect} from 'react'
import { ProductoService } from '../../../services/ProductoService';
import { proyeccionInformeRentabilidad } from '../../../context/interfaces/Proyecciones/ProyeccionInformeGananciasGrafico';
import { Bar } from 'react-chartjs-2';
import OrdenamientoFechas from './OrdenamientoFechas';
import { useUnidadContext } from '../../../context/GlobalContext';

export default function InformeRentabiliadadComponent() {
    const servicioProducto = new ProductoService();
    const [informacionGrafico, setInforimacionGrafico] = useState<proyeccionInformeRentabilidad[]>();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null); 
    const { rol } = useUnidadContext();

    const getInformacionGrafico = async () => {
        try {
            const traerInfo = await servicioProducto.getInformeRentabilidad(startDate, endDate,rol);
            setInforimacionGrafico(traerInfo);
        } catch (err: any) {
            console.error(err);
        }
    }

    const actualizarCriteriosDeOrdenamiento = (nuevaFechaInicio: Date | null, nuevaFechaFin: Date | null) => {
        setStartDate(nuevaFechaInicio);
        setEndDate(nuevaFechaFin);
        getInformacionGrafico()
    }

    useEffect(() => {
        getInformacionGrafico();
    }, [startDate, endDate]);
     
   


    if (!informacionGrafico) {
        return <div>Cargando...</div>;
    }

 // Datos para el gráfico de barras
 const data = {
    labels: informacionGrafico.map(item => item.denominacion),
    datasets: [
        {
            label: 'Ganancia',
            data: informacionGrafico.map(item => item.ganancia),
            backgroundColor: 'rgba(134, 78, 27)', // Color de las barras
        },
    ],
};

return (
    <div className='estilos_barras'>
        <h2 className='text-center'>Rentabilidad Total</h2>
        <OrdenamientoFechas criteriosOrdenamiento={actualizarCriteriosDeOrdenamiento}/>
        <Bar data={data} />
    </div>
);
}
