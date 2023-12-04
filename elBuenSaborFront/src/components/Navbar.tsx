import { useAuth0 } from '@auth0/auth0-react'
import LoginBtn from './LoginBtn';
import { NavLink } from 'react-router-dom';
import logoSimple from "../assets/logoSimple.png";
import { useUnidadContext } from '../context/GlobalContext';
import { useEffect, useState } from 'react';
import DropdownMenu from './navbar/dropdownMenu/DropdownMenu';
import MenuHamburguesa from './navbar/menuHamburguesa/MenuHamburguesa';


const Navbar: React.FC = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();

  const { setBusquedaXNombre } = useUnidadContext();
  const [filterText, setFilterText] = useState<string>("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const filterHandler = () => {
    setBusquedaXNombre(filterText);
    // setFilterText("");
  }

  if (isLoading) {
    return (

      <header className="headerLogo" style={{ justifyContent: "space-around", flexDirection: "row" }}>
        <h1>Loading...</h1>
      </header>
    )
  }

  console.log(isAuthenticated);
  console.log(user);

  if (isAuthenticated) {
    return (
      <header className="headerLogo" style={{ flexDirection: "row", color: "white" }}>
        <div className="logo" style={{ display: "inline-flex", alignItems: "center" }}>

          <NavLink to="/" >
            <img src={logoSimple} alt="logo" />
          </NavLink>

          {!isMobile
            &&
            <form onSubmit={(e) => { e.preventDefault() }}>
              <div className='searchBar'>
                <button onClick={filterHandler} className='mt-2'>
                  <i className="material-icons" style={{ fontSize: "30px", color: "white" }}> search</i>
                </button>
                <input className="inputSearchBar" type="text" placeholder="Buscar producto" value={filterText} onChange={e => setFilterText(e.target.value)}></input>
              </div>
            </form>}
        </div>

        <div className='d-flex'>
          {isMobile ?
            <MenuHamburguesa
              isDropdownOpen={isDropdownOpen}
              toggleDropdown={toggleDropdown}

              filterHandler={filterHandler}
              filterText={filterText}
              setFilterText={setFilterText}
            />
            :
            <DropdownMenu
              user={user}
              isDropdownOpen={isDropdownOpen}
              toggleDropdown={toggleDropdown}
              filterHandler={filterHandler}
              filterText={filterText}
              setFilterText={setFilterText}
            />
          }

        </div>

      </header>
    )
  } else {
    return (
      <header className="headerLogo">
        <div className="logo mx-3 mt-2" style={{ display: "inline-flex", alignItems: "center" }}>

          <NavLink to="/" >
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
          <div className="col-sm d-flex align-items-center">
            <NavLink to="/carrito">
              <i className="material-icons" style={{ fontSize: "30px", color: "white" }}>shopping_cart</i>
            </NavLink>
          </div>

          <div className="col-sm mx-1">
            <LoginBtn />
          </div>
        </nav>
      </header>
    )
  }
}

export default Navbar;