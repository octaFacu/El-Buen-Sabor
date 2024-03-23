import React, { useEffect, useState } from "react";
import { proyeccionGananciaMes } from "../../../context/interfaces/Proyecciones/ProyeccionInformeGananciasGrafico";
import { ProductoService } from "../../../services/ProductoService";
import { Scatter } from 'react-chartjs-2';
import { format } from 'date-fns';
import 'chartjs-adapter-date-fns';
import { useUnidadContext } from "../../../context/GlobalContext";


export default function InformeGananciaMesComponent() {
    const servicioProducto = new ProductoService();
    const [informacionGrafico, setInformacionGrafico] = useState<proyeccionGananciaMes[]>();
    const { rol } = useUnidadContext();

    const getInformacionGrafico = async () => {
        try {
            const traerInfo = await servicioProducto.getInformeGananciasMes(rol);
            setInformacionGrafico(traerInfo);
        } catch (err: any) {
            console.error(err);
        }
    }

    useEffect(() => {
        getInformacionGrafico();
    }, []);

    if (!informacionGrafico) {
        return <div>Cargando...</div>;
    }
    

   // Datos para el gráfico de puntos (scatter plot)
   const data = {
    datasets: [
        {
            label: 'Ganancia por Mes',
            data: informacionGrafico.map(item => ({
                x: item.fecha,
                y: item.ganancia,
            })),
            backgroundColor: 'rgba(134, 78, 27, 0.8)', 
            pointRadius: 5, // Tamaño de los puntos
            cubicInterpolationMode: 'monotone', // Líneas curvadas
            fill: true, // Relleno debajo de la línea
            showLine: true
        },
    ],
};

const options = {
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'month',
            },
            title: {
                display: true,
                text: 'Mes y Año',
            },
        },
        y: {
            title: {
                display: true,
                text: 'Ganancia',
            },
        },
    },
};

return (
    <div className="text-center">
        <h2>Ganancias por mes</h2>
        <Scatter data={data} options={options} />
    </div>
);
}