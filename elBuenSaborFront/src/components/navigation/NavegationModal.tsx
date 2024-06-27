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
          <Link to="/admin/" style={{ color: 'white' }}>
          <button className="btn btn-outline-light mb-1 mx-2">
            Admin
          </button>
          </Link>
          <Link to="/dashboard-cocina/" style={{ color: 'white' }}>
          <button className="btn btn-outline-light mb-1 mx-2">
            Administrador Cocina
          </button>
          </Link>
          <Link to="/dashboard-delivery/" style={{ color: 'white' }}>
          <button className="btn btn-outline-light mb-1 mx-2">
            Administrador Delivery
          </button>
          </Link>
          <Link to="/dashboard-pedidos/" style={{ color: 'white' }}>
          <button className="btn btn-outline-light mx-2">
            Administrador Cajero
          </button>
          </Link>
        </div>
      </div>
      
    </div>
  </div>)
}

export default NavegationModal;