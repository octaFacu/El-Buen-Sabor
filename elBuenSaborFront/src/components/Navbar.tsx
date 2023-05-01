import {useAuth0} from '@auth0/auth0-react'
import LogoutBtn from './LogoutBtn';
import LoginBtn from './LoginBtn';
import { NavLink } from 'react-router-dom';


const Navbar: React.FC = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();


  if(isLoading){
    return(

      <header className="headerLogo" style={{justifyContent: "space-around", flexDirection: "row"}}>
        <h1>Loading...</h1>
      </header>
    ) 
  }

console.log(isAuthenticated);

  if(isAuthenticated){
    return(
      <header className="headerLogo" style={{justifyContent: "space-around", flexDirection: "row", color:"white"}}>
        <div className="logo" style={{display: "inline-flex", alignItems: "center"}}>
          <i className="ml-3 mt-3 material-icons" style={{fontSize: "30px", color:"white", cursor:"pointer"}}> search</i>
          <input className="btnIngresoNav inputs" type="text" placeholder="Buscar producto" >
          </input>
        </div>
        {/*<div style={{flexDirection: "row", justifyContent: "flex-end"}}>*/}
         
            <div className='mt-3'>
              <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}> shopping_cart</i>
              <i className="material-icons" style={{fontSize: "30px", cursor:"pointer"}}> favorite</i>
            </div>
            
            <div>
              <h5 className="mt-3" >{user!.name}</h5>

            </div>
            <div>
              <><img style={{borderRadius: "50%", maxWidth: "60%", maxHeight:"60%", cursor:"pointer"}} src={user!.picture} alt="imagen de perfil" /></>
            </div>
          <div><LogoutBtn/></div>
        {/*</div>*/}


      </header>
    )
  }else{



    return(
      <header className="headerLogo">
        <div className="logo mx-3 mt-2" style={{display: "inline-flex", alignItems: "center"}}>
          <i className="material-icons" style={{fontSize: "30px", color:"white"}}> search</i>
          
          <input className="btnIngresoNav inputs" type="text" placeholder="Buscar producto" >
          </input>
        </div>
        <nav className="row mt-2">
          <i className="col-sm mt-3 material-icons" style={{fontSize: "30px", color:"white"}}> shopping_cart</i>
          
          <div className="col-sm mx-1">
            <LoginBtn/>
          </div>
          
          {/* <NavLink to="/" >HOME</NavLink>
          <NavLink to="/abm/rubroIngrediente" >ABM</NavLink> */}
          
        </nav>
      </header>
    )
  }
}

export default Navbar;