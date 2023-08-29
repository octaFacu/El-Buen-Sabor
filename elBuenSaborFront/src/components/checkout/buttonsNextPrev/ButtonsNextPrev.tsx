import { FC } from "react";

interface ButtonsNextPrevProps {
    estadoCompra: number;
    setEstadoCompra: (valor: number) => void;
    generarPedido: () => void;
}

const ButtonsNextPrev: FC<ButtonsNextPrevProps> = ({estadoCompra, setEstadoCompra, generarPedido}) => {
    return (
        <div className="d-flex justify-content-between">
            {estadoCompra > 1 ? <button onClick={() => setEstadoCompra(estadoCompra - 1)}>Paso Anterior</button> : <div></div>}
            <button onClick={estadoCompra < 3 ? () => setEstadoCompra(estadoCompra + 1) : generarPedido}>Continuar</button>
        </div>
    );
}

export default ButtonsNextPrev;