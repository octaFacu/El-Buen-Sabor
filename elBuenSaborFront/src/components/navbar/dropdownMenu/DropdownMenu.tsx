import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutBtn from "../../LogoutBtn";
import "./dropdownMenu.css"

interface PropsDropdownMenu {
  user: any;
  isDropdownOpen: boolean
  toggleDropdown: () => void;
  filterHandler: () => void;
  filterText: string;
  setFilterText: (value: string) => void;
}

const DropdownMenu: FC<PropsDropdownMenu> = ({ user, toggleDropdown, isDropdownOpen }) => {



  return (

    <div className='d-flex'>

      <div className='mt-2 mx-3'>
        <NavLink to="/carrito" className={"m-1"}>
          <i className="material-icons" style={{ fontSize: "30px", color: "white" }}> shopping_cart</i>
        </NavLink>
      </div>

      <div className="dropdown">
        <button className="btn dropdown-toggle-style dropdown-toggle" type="button" onClick={toggleDropdown}>
          <img style={{ borderRadius: "50%", maxWidth: "30px", maxHeight: "30px", cursor: "pointer" }} src={user!.picture} alt="imagen de perfil" /> {user && user!.given_name ? user.given_name : "Usuario"}
        </button>
        <div className={`dropdown-menu dropdown-menu-style ${isDropdownOpen ? 'show' : ''}`}>

          {/* <div className="dropdown-divider"></div> */}

          <NavLink onClick={toggleDropdown} className="dropdown-item ddi-margin" to="/usuarios/">
            <span>Mi perfil</span>
          </NavLink>
          <NavLink onClick={toggleDropdown} className="dropdown-item" to="/favoritos">
            <span>Favoritos</span>
          </NavLink>

          <div className="dropdown-divider"></div>

          <div className="dropdown-item cursor-pointer">
            <LogoutBtn />
          </div>

        </div>
      </div>

      <div style={{ width: "70px" }}></div>

    </div>
  );
}

export default DropdownMenu;