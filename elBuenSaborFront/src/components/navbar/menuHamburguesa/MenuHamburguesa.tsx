import { FC } from "react";
import LogoutBtn from "../../LogoutBtn";
import { NavLink } from "react-router-dom";
import "./menuHamburguesa.css"

interface MenuHamburguesaProps {
  isDropdownOpen: boolean
  toggleDropdown: () => void;

  filterHandler: () => void;
  filterText: string;
  setFilterText: (value: string) => void;
}

const MenuHamburguesa: FC<MenuHamburguesaProps> = ({ isDropdownOpen, toggleDropdown, filterHandler, filterText, setFilterText }) => {
  return (
    <div className='d-flex'>

      {isDropdownOpen && <div onClick={toggleDropdown} className="mh-overlay"></div>}

      <div className='mx-4 mt-2'>
        <NavLink to="/carrito" className={"m-1"}>
          <i className="material-icons" style={{ fontSize: "30px", color: "white" }}> shopping_cart</i>
        </NavLink>
      </div>

      <button className="mh-btn" onClick={toggleDropdown}>
        <i className="material-icons">menu</i>
      </button>
      {isDropdownOpen && (
        <div className={"menu-hamburguesa-items " + (isDropdownOpen ? "mh-visible" : "")}>

          <div className="mh-searchbar">
            <form onSubmit={(e) => { 
              e.preventDefault() 
              toggleDropdown()
              }}>
              <div className='searchBar'>
                <button onClick={filterHandler} className='mt-2'>
                  <i className="material-icons" style={{ fontSize: "30px", color: "white" }}> search
                  </i>
                </button>
                <input
                  className="inputSearchBar"
                  type="text"
                  placeholder="Buscar producto"
                  value={filterText}
                  onChange={e => setFilterText(e.target.value)}></input>
              </div>
            </form>

            <button className="mh-cancelbtn" onClick={toggleDropdown}>
            <i className="material-icons" style={{ fontSize: "30px"}}> cancel_icon</i>
            </button>

          </div>

          <div className="mh-separator"></div>

          <NavLink onClick={toggleDropdown} className="mh-item" to="/usuarios/MiCuenta">
            <span>Mi perfil</span>
          </NavLink>
          <NavLink onClick={toggleDropdown} className="mh-item" to="/usuarios/MisFavoritos">
            <span>Direcciones</span>
          </NavLink>
          <NavLink onClick={toggleDropdown} className="mh-item" to="/usuarios/MisPedidos">
            <span>Pedidos</span>
          </NavLink>
          <NavLink onClick={toggleDropdown} className="mh-item" to="/usuarios/MisDirecciones">
            <span>Favoritos</span>
          </NavLink>

          <div className="mh-separator"></div>
          
          <div className="mh-item">
            <LogoutBtn />
          </div>

        </div>
      )}


      <div style={{ width: "50px" }}></div>

    </div>

  );
}

export default MenuHamburguesa;