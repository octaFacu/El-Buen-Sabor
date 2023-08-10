import { FC } from "react";
import { Link } from "react-router-dom";

interface NavegationModalProps{
  setMostrarNavegacion: (modal: boolean) => void;
}


const NavegationModal: FC<NavegationModalProps> = ({setMostrarNavegacion}) => {


return(
  <div className="overlay" onClick={() => setMostrarNavegacion(false)}>
    <div className="container my-5 contenedorModal" style={{borderRadius: "25px", backgroundColor: "#f99132", border: '4px dashed #864e1b', color: "white", maxWidth: "70%"}}>
      <div className="container mx-4 my-4 d-flex text-center" style={{display: "flex",alignItems: "flex-start"}}>
        <div className="mx-4">
          <h3>- Landing -</h3>
          <button className="btn btn-outline-light">
            <Link to="/" style={{ color: 'white' }}>Principal</Link>
          </button>
        </div>
        <div className="mx-4">
          <h3>- Usuario -</h3>
          <button className="btn btn-outline-light">
            <Link to="/usuarios/" style={{ color: 'white' }}>Información del Usuario</Link>
          </button>
        </div>
        <div className="mx-4">
          <h3>- ABMs -</h3>
          <button className="btn btn-outline-light mb-1">
            <Link to="/abm/productos/" style={{ color: 'white' }}>Productos</Link>
          </button>
          <button className="btn btn-outline-light mb-1">
            <Link to="/abm/categoriaProductos/" style={{ color: 'white' }}>Categorias de Productos</Link>
          </button>
          <button className="btn btn-outline-light mb-1">
            <Link to="/abm/ingredientes/" style={{ color: 'white' }}>Ingredientes</Link>
          </button>
          <button className="btn btn-outline-light">
            <Link to="/abm/categoriaIngredientes/" style={{ color: 'white' }}>Categorias de Ingredientes</Link>
          </button>
        </div>
      </div>
      
    </div>
  </div>)
}

export default NavegationModal;