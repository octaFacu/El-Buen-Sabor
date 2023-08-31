import { useState, useEffect } from 'react';
import { ProductoService } from '../../../services/ProductoService';
import { proyeccionInformeGananciasGrafico } from '../../../context/interfaces/Proyecciones/ProyeccionInformeGananciasGrafico';
import { Pie } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import OrdenamientoFechas from './OrdenamientoFechas';

Chart.register(CategoryScale);
export default function InformeGananciaComponent() {
    const servicioProducto = new ProductoService();
    const [informacionGrafico, setInforimacionGrafico] = useState<proyeccionInformeGananciasGrafico[]>();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null); // 



    const getInformacionGrafico = async () => {
        try {
            const traerInfo = await servicioProducto.getInformeGananciasGrafico(startDate,endDate);
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

    const generarColores = (contador: number) => {
        const colors = [];
        for (let i = 0; i < contador; i++) {
            const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            colors.push(color);
        }
        return colors;
    };

    const data = {
        labels: informacionGrafico.map(item => item.denominacion),
        datasets: [
            {
                data: informacionGrafico.map(item => item.porcentaje),
                backgroundColor: generarColores(informacionGrafico.length), // Colores al azar
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        aspectRatio: 'auto'
    };
    
    return (
        <div style={{ maxWidth: '10000px' }}>
            <h2 className='text-center'>histórico de ventas</h2>
            <OrdenamientoFechas criteriosOrdenamiento={actualizarCriteriosDeOrdenamiento}/>
            <Pie data={data} options={options} />
        </div>
    );
}