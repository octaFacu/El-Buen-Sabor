import { FC } from "react";
import "./PurchaseSteps.css"
import verifIcon from "../../../assets/verification-icon.png"

interface PurchaseStepsProps {

    estadoCompra: number;
}

const PurchaseSteps: FC<PurchaseStepsProps> = ({ estadoCompra }) => {



    return (
        <div className="">
            <div className="d-flex justify-content-between align-items-center my-4">

                {/* Usando una expresión condicional */}
                <div className={estadoCompra === 1 ? 'purchase-step purchase-step-2' : 'purchase-step purchase-step-3'} >
                    {estadoCompra >= 2 && <img className="verif-icon mr-5" src={verifIcon} alt="verif" />}
                    <span>Entrega</span>
                </div>

                <div className="separator-line-steps" />

                <div className={estadoCompra === 1 ? 'purchase-step purchase-step-1' : estadoCompra === 2 ? 'purchase-step purchase-step-2' : 'purchase-step purchase-step-3'}>
                    {estadoCompra >= 3 && <img className="verif-icon mr-1" src={verifIcon} alt="verif" />}
                    <span>Forma de pago</span>
                </div>

                <div className="separator-line-steps" />

                <div className={estadoCompra === 1 ? 'purchase-step purchase-step-1' : estadoCompra === 2 ? 'purchase-step purchase-step-1' : 'purchase-step purchase-step-2'}>
                    ¡Último paso!
                </div>

            </div>
        </div>

    );
}

export default PurchaseSteps;