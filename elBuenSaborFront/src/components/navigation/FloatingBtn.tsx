import { useState } from "react";
import NavegationModal from "./NavegationModal";



const FloatingBtn: React.FC = () => {

    const [mostrarNavegacion, setMostrarNavegacion] = useState<boolean>(false);

return(
    <>
        <button
        className="btn mb-3 me-3"
        onClick={() => {setMostrarNavegacion(!mostrarNavegacion)}}
        style={{
        background: "#f99132",
        position: "fixed",
        width: "65px",
        height: "65px",
        bottom: "0",
        borderRadius: "50%",
        cursor: "pointer",
        left: "auto", // Set left to "auto"
        right: "0", // Set right to "0"
        padding: "5px 20px",
        color: "white",
        lineHeight: "65px",
        textAlign: "center",
        fontSize: "23px",
        zIndex: "100"
        }}
    >
        <i className="material-icons">dehaze</i>
    </button>


    {   mostrarNavegacion &&
        <NavegationModal></NavegationModal>
    }
</>
  )
}

export default FloatingBtn;