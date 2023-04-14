import {useAuth0} from '@auth0/auth0-react'
import LogoutBtn from './LogoutBtn';
import LoginBtn from './LoginBtn';


const Navbar: React.FC = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();


  if(isLoading){
    return <h1>Loading...</h1>
  }

console.log(isAuthenticated);

  if(isAuthenticated){
    return(
      <header className="headerLogo">
        <div className="logo" style={{display: "inline-flex", alignItems: "center"}}>
          
          {/*<input className="btnIngresoNav inputs" type="text" placeholder="Buscar producto" ><i className="material-icons" style={{color:"white"}} > search</i>*/}
          {/*</input>*/}
        </div>
        <nav>
          <i className="material-icons" style={{fontSize: "30px", marginTop: "5%", color:"white"}}> shopping_cart</i>
          
          
          <><img src={user!.picture} alt="imagen de perfil" /><h3>{user!.name}</h3><LogoutBtn/></>

          <LogoutBtn/>
          
        </nav>
      </header>
    )
  }else{



    return(
      <header className="headerLogo">
        <div className="logo" style={{display: "inline-flex", alignItems: "center"}}>
          
          {/*<input className="btnIngresoNav inputs" type="text" placeholder="Buscar producto" ><i className="material-icons" style={{color:"white"}} > search</i>*/}
          {/*</input>*/}
        </div>
        <nav>
          <i className="material-icons" style={{fontSize: "30px", marginTop: "5%", color:"white"}}> shopping_cart</i>
          
          
          <LoginBtn/>
          
          
        </nav>
      </header>
    )
  }
}

export default Navbar;