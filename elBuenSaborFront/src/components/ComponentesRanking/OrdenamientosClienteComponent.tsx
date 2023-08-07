import {useState} from 'react'

interface Props{
    ordenarPorImporteTotal: (estado: boolean)=>void
    ordenarPorCantidadPedidos : (estado: boolean)=>void
}

export default function OrdenamientosClienteComponent({ordenarPorImporteTotal,ordenarPorCantidadPedidos }: Props) {
    const [tituloDrop, setTituloDrop] = useState<string>("Ordenar Por");
    const [switchActivo, setSwitchActivo] = useState<boolean>(true);
    const [desabilitado, setDesabilitado] = useState<boolean>(true)

    const handleOrdenarImporte = () => {
        setTituloDrop("Importe total")
        setDesabilitado(false)
    }

    const handleOrdenarCantidadPedidos = () => {
        setTituloDrop("Cantidad pedidos")
        setDesabilitado(false)
    }

    const handleSwitch = () => {
        setSwitchActivo((estadoAnterior) => {
            // invertimos el estado
            const nuevoEstado = !estadoAnterior;
            // Actualizamos el orden dependiendo el titulo que tenemos
            if (tituloDrop === "Importe total") {
                ordenarPorImporteTotal(nuevoEstado);
            } else if (tituloDrop === "Cantidad pedidos") {
                ordenarPorCantidadPedidos(nuevoEstado);
            }
            // Devolvemos el nuevo estado para actualizarlo en el componente
            return nuevoEstado;
        });
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <p>fecha inicio - fin</p>
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
                    <input className="form-check-input custom-switch" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled={desabilitado} onChange={() => handleSwitch()} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{switchActivo ? "Mayor - Menor" : "Menor - Mayor"}</label>
                </div>
            </div>
        </>
    )
}
