import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FailurePage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('pedidoMP');
        //localStorage.setItem('carritoArreglo', "");

        // Establece un temporizador para redireccionar después de 6 segundos 
        const temporizador = setTimeout(() => {
            // Redirige a la página deseada
            navigate("/")

        }, 6000); // 6 segundos

        // Limpia el temporizador si el componente se desmonta antes de que ocurra la redirección
        return () => clearTimeout(temporizador);

    }, [navigate])

    return (
        <>
            <h1>failure</h1>
        </>
    );
}

export default FailurePage;