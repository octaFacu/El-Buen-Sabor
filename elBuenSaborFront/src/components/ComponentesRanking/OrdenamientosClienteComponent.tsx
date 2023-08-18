import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    actualizarCriteriosOrdenamiento: (orderBy: string, direccion: string, fechaInicio: Date | null, fechaFin: Date | null) => void;

}

export default function OrdenamientosClienteComponent({ actualizarCriteriosOrdenamiento }: Props) {
    const [tituloDrop, setTituloDrop] = useState<string>("Ordenar Por");
    const [switchActivo, setSwitchActivo] = useState<boolean>(true);
    const [desabilitado, setDesabilitado] = useState<boolean>(true)
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);


    const handleOrdenarImporte = () => {
        setTituloDrop("Importe total");
        setDesabilitado(false);
        actualizarCriteriosOrdenamiento("importe_total", "DESC", startDate, endDate);
    };

    const handleOrdenarCantidadPedidos = () => {
        setTituloDrop("Cantidad pedidos");
        setDesabilitado(false);
        actualizarCriteriosOrdenamiento("cantidad_pedidos", "DESC", startDate, endDate); 
    };

    const handleSwitch = () => {
        setSwitchActivo((estadoAnterior) => {
            const nuevoEstado = !estadoAnterior;
            if (tituloDrop === "Importe total") {
                actualizarCriteriosOrdenamiento("importe_total", nuevoEstado ? "DESC" : "ASC", startDate, endDate); 
            } else if (tituloDrop === "Cantidad pedidos") {
                actualizarCriteriosOrdenamiento("cantidad_pedidos", nuevoEstado ? "DESC" : "ASC", startDate, endDate); 
            }
            return nuevoEstado;
        });
    };

    const handleFechaInicio = (date: Date) => {
        setStartDate(date);
    };

    const handleFechaFin = (date: Date | null) => {
        setEndDate(date);
    }


    const validarFechas = () => {
        if (startDate && !endDate) {
            alert("Por favor, selecciona la fecha de fin.");
        } else if (!startDate && endDate) {
            alert("Por favor, selecciona la fecha de inicio.");
        } else if (startDate && endDate && startDate > endDate) {
            alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
        } else {
            handleSwitch();
        }
    }
    const handleResetFechas = () => {
        setStartDate(null);
        setEndDate(null);
        handleSwitch();
    }

    const handleBuscarConFechas = () => {
        if (startDate && endDate) {
            actualizarCriteriosOrdenamiento("cantidad_pedidos", "DESC", startDate, endDate)
            setTituloDrop("Ordenar Por")
            setDesabilitado(true)
        }
        else if (startDate && endDate && startDate > endDate) {
            alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
        } else {
            alert("Por favor, selecciona ambas fechas antes de realizar la búsqueda.");
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                <div>
                    <DatePicker selected={startDate} onChange={handleFechaInicio} placeholderText='fecha Inicio' dateFormat="yyyy-MM-dd" />
                    <DatePicker selected={endDate} onChange={handleFechaFin} placeholderText='fecha Fin' dateFormat="yyyy-MM-dd" />
                    <button className="btn btn-outline-secondary btn-sm ml-2" onClick={handleResetFechas}>Reset Fechas</button>
                    <button className="btn btn-primary btn-sm ml-2" onClick={handleBuscarConFechas}>Buscar</button>
                </div>
                <div className="dropdown cliente-drop">
                    <button className="btn btn-dropCliente text-white dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {tituloDrop}
                    </button>
                    <ul className="dropdown-menu drop-menu-cliente" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item item-drop-cliente" onClick={handleOrdenarImporte}>Importe Total</a></li>
                        <li><a className="dropdown-item item-drop-cliente" onClick={handleOrdenarCantidadPedidos}>Cantidad pedidos</a></li>
                    </ul>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end cliente-check">
                <div className="form-check form-switch">
                    <input className="form-check-input custom-switch" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled={desabilitado} onClick={validarFechas} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{switchActivo ? "Mayor - Menor" : "Menor - Mayor"}</label>
                </div>
            </div>
        </>
    )
}
