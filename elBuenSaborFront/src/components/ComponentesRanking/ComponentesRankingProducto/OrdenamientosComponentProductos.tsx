import { useState } from 'react'
import "../../../css/estilosOrdenamientos.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


interface Props {
    criteriosOrdenamiento: (nuevaDireccion: string, fechaInicio: Date | null, fechaFin: Date | null) => void
}

export default function OrdenamientosComponentProductos({ criteriosOrdenamiento }: Props) {

    const [switchActivo, setSwitchActivo] = useState<boolean>(true)
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleOrdenamiento = () => {
        setSwitchActivo((estadoAnterior) => {
            const nuevoEstado = !estadoAnterior;
            if (nuevoEstado) {
                criteriosOrdenamiento("DESC", startDate, endDate);
            } else {
                criteriosOrdenamiento("ASC", startDate, endDate);
            }
            return nuevoEstado;
        });
    }

    const handleResetFiltro = () => {
        setStartDate(null);
        setEndDate(null);
        criteriosOrdenamiento("DESC", null, null);
    }
    
    const handleFechaInicio = (date: Date) => {
        setStartDate(date);
    };

    const handleFechaFin = (date: Date | null) => {
        setEndDate(date);
    }

    const handleBuscarConFechas = () => {
        if (startDate && endDate) {
            criteriosOrdenamiento(switchActivo ? "DESC" : "ASC", startDate, endDate);
        }
        else if (startDate && endDate && startDate > endDate) {
            alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
        } else {
            alert("Por favor, selecciona ambas fechas antes de realizar la búsqueda.");
        }
    }

    return (
        <div className="d-flex justify-content-between">
            <div className="align-items-start">
                <DatePicker
                    selected={startDate}
                    onChange={handleFechaInicio}
                    placeholderText="fecha Inicio"
                    dateFormat="yyyy-MM-dd"
                    className="custom-datepicker"
                />
                <DatePicker
                    selected={endDate}
                    onChange={handleFechaFin}
                    placeholderText="fecha Fin"
                    dateFormat="yyyy-MM-dd"
                    className="custom-datepicker"
                />
                <button className="btn btn-busqueda-fechas btn-sm ml-2" onClick={handleBuscarConFechas}>Busqueda por fechas</button>
                <button className="btn btn-reseteo-fechas btn-sm ml-2" onClick={handleResetFiltro}>Resetear Filtros</button>
            </div>
            <div className="d-flex align-items-center">
                <div className="form-check form-switch">
                    <input
                        className="form-check-input custom-switch"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onClick={handleOrdenamiento}
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                        {switchActivo ? "Mayor - Menor" : "Menor - Mayor"}
                    </label>
                </div>
            </div>
        </div>

    )
}
