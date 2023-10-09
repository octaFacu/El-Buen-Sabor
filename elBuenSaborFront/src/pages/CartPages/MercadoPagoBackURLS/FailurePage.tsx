import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FailurePage = () => {

    const [countdown, setCountdown] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            } else {
                // Redirigir después de 5 segundos
                clearInterval(timer);
                navigate('/');
            }
        }, 1000);
        // Limpia el intervalo cuando el componente se desmonta.
        return () => clearInterval(timer);
    }, [countdown, navigate]);

    return (
        <div className="container-post-mp py-5 mb-5" style={{ background: "#f99132", borderRadius: "25px" }}>

            <div className="text-center py-4 px-3">

                <h2 className="title-cart">Hubo un error al realizar el pago, intente de nuevo mas tarde</h2>
                <h5 className="mt-4 title-cart">Será redireccionado en: {countdown}</h5>
                <button
                    className="btn-volver-post-mp px-4 py-2 mt-4"
                    onClick={() => navigate('/')}
                >
                    Volver al inicio
                </button>

            </div>

        </div >

    );
}

export default FailurePage;