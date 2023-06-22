import { useState } from "react";



const FloatingBtn: React.FC = () => {

    const [mostrarNavegacion, setMostrarNavegacion] = useState<boolean>(false);

return(
            <button className="btn" onClick={()=> {setMostrarNavegacion(!mostrarNavegacion)}} style={{
                                                        background: "#f99132",
                                                        position: "absolute",
                                                        width: "65px",
                                                        height: "65px",
                                                        bottom: "0",
                                                        borderRadius: "50%",
                                                        cursor: "pointer",
                                                        left: "0",
                                                        right: "0",
                                                        margin: "auto",
                                                        color: "white",
                                                        lineHeight: "65px",
                                                        textAlign: "center",
                                                        fontSize: "23px",
                                                        zIndex: "100"}}>
                <i className="material-icons">dehaze</i>
            </button>)
}

export default FloatingBtn;