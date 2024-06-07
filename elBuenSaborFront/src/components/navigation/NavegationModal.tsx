import { FC } from "react";
import { Link } from "react-router-dom";

interface NavegationModalProps{
  setMostrarNavegacion: (modal: boolean) => void;
}


const NavegationModal: FC<NavegationModalProps> = ({setMostrarNavegacion}) => {


return(
  <div className="overlay" onClick={() => setMostrarNavegacion(false)}>
    <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", border: '4px dashed #864e1b', color: "white", maxWidth: "70%"}}>
      <div className="container mx-4 my-4 d-flex text-center" style={{display: "flex", alignItems: "center"}}>
        <div className="mx-4">
          <h3>- Landing -</h3>
          <button className="btn btn-outline-light">
            <Link to="/" style={{ color: 'white' }}>Principal</Link>
          </button>
        </div>
        <div className="mx-2">
          <h3>- Empleados -</h3>
          <button className="btn btn-outline-light mb-1 mx-2">
            <Link to="/admin/" style={{ color: 'white' }}>Admin</Link>
          </button>
          <button className="btn btn-outline-light mb-1 mx-2">
            <Link to="/dashboard-cocina/" style={{ color: 'white' }}>Administrador Cocina</Link>
          </button>
          <button className="btn btn-outline-light mb-1 mx-2">
            <Link to="/dashboard-delivery/" style={{ color: 'white' }}>Administrador Delivery</Link>
          </button>
          <button className="btn btn-outline-light mx-2">
            <Link to="/dashboard-pedidos/" style={{ color: 'white' }}>Administrador Cajero</Link>
          </button>
        </div>
      </div>
      
    </div>
  </div>)
}

export default NavegationModal;