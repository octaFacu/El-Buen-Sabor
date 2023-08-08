import { useAuth0 } from '@auth0/auth0-react'
import LogoutBtn from './LogoutBtn';
import LoginBtn from './LoginBtn';
import { NavLink, useNavigate } from 'react-router-dom';
import logoSimple from "../assets/logoSimple.png";
import { useUnidadContext } from '../context/GlobalContext';
import { useState } from 'react';


const Navbar: React.FC = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const { setBusquedaXNombre } = useUnidadContext();
  const [filterText, setFilterText] = useState<string>("");

  const filterHandler = () => {
    setBusquedaXNombre(filterText);
    setFilterText("");
  }

  if (isLoading) {
    return (

      <header className="headerLogo" style={{ justifyContent: "space-around", flexDirection: "row" }}>
        <h1>Loading...</h1>
      </header>
    )
  }

  console.log(isAuthenticated);

  if (isAuthenticated) {
    return (
      <header className="headerLogo" style={{ justifyContent: "space-around", flexDirection: "row", color: "white" }}>
        <div className="logo" style={{ display: "inline-flex", alignItems: "center" }}>

          <NavLink to="/" >
            <img src={logoSimple} alt="logo" />
          </NavLink>

          <form onSubmit={(e) => { e.preventDefault() }}>
            <div className='searchBar'>
              <button onClick={filterHandler} className='mt-2'>
                <i className="material-icons" style={{ fontSize: "30px", color: "white" }}> search</i>
              </button>
              <input className="inputSearchBar" type="text" placeholder="Buscar producto" value={filterText} onChange={e => setFilterText(e.target.value)}></input>
            </div>
          </form>

        </div>
        {/*<div style={{flexDirection: "row", justifyContent: "flex-end"}}>*/}

        <div className='mt-3'>
          <i className="material-icons" style={{ fontSize: "30px", cursor: "pointer" }}> shopping_cart</i>
          <i className="material-icons" style={{ fontSize: "30px", cursor: "pointer" }}> favorite</i>
        </div>

        <div>
          <h5 className="mt-3" >{user!.name}</h5>

        </div>
        <div>
          <><img onClick={() => {
            navigate("/usuarios/");
          }} style={{ borderRadius: "50%", maxWidth: "60%", maxHeight: "60%", cursor: "pointer" }} src={user!.picture} alt="imagen de perfil" /></>
        </div>
        <div><LogoutBtn /></div>
        {/*</div>*/}


      </header>
    )
  } else {



    return (
      <header className="headerLogo">
        <div className="logo mx-3 mt-2" style={{ display: "inline-flex", alignItems: "center" }}>

          <NavLink to="/" onClick={() => window.location.reload()}>
            <img src={logoSimple} alt="logo" />
          </NavLink>

          <form onSubmit={(e) => { e.preventDefault() }}>
            <div className='searchBar'>
              <button onClick={filterHandler} className='mt-2'>
                <i className="material-icons" style={{ fontSize: "30px", color: "white" }}> search</i>
              </button>
              <input required className="inputSearchBar" type="text" placeholder="Buscar producto" value={filterText} onChange={e => setFilterText(e.target.value)}></input>
            </div>
          </form>

        </div>

        <nav className="row mt-2">
          <i className="col-sm mt-3 material-icons" style={{ fontSize: "30px", color: "white" }}> shopping_cart</i>

          <div className="col-sm mx-1">
            <LoginBtn />
          </div>

        </nav>
      </header>
    )
  }
}

export default Navbar;