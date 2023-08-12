import { FC } from "react";
import "./ReturnButton.css"
import { useNavigate } from "react-router-dom";
import leftArrow from "../../../assets/left-arrow.png";

interface ReturnButtonProps {

}

const ReturnButton: FC<ReturnButtonProps> = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Esta función devuelve a la página anterior
    };

    return (
        <button className="btn rounded-circle btn-return" onClick={handleGoBack}>
            <img src={leftArrow} alt="Flecha" width="20" height="30" />
        </button>
    );
}

export default ReturnButton;