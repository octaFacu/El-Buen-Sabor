import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Factura, RequestPedido } from "../../../context/interfaces/interfaces";
import { pedidoService } from "../../../services/PedidoService";
import { FacturaService } from "../../../services/FacturaService";


const SuccessPage = () => {

    

    return (
        <>
            <h1>success</h1>
        </>
    );
}

export default SuccessPage;