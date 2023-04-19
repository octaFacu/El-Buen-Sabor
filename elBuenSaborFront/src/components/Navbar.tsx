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
      <header className="headerLogo" style={{justifyContent: "space-around", flexDirection: "row"}}>
        <div className="logo" style={{display: "inline-flex", alignItems: "center"}}>
          
          <input className="btnIngresoNav inputs" type="text" placeholder="Buscar producto" >
          </input>
        </div>
        {/*<div style={{flexDirection: "row", justifyContent: "flex-end"}}>*/}
         
            <div >
              <i className="material-icons" style={{fontSize: "30px", marginTop: "5%", color:"white"}}> shopping_cart</i>
            </div>
            <div>
              <><img style={{borderRadius: "50%", maxWidth: "50%", maxHeight:"50%"}} src={user!.picture} alt="imagen de perfil" /></>
            </div>
            <div>
              <h3>{user!.name}</h3>
            </div>
          <div><LogoutBtn/></div>
        {/*</div>*/}


      </header>
    )
  }else{



    return(
      <header className="headerLogo">
        <div className="logo" style={{display: "inline-flex", alignItems: "center"}}>
          
        <input className="btnIngresoNav inputs" type="text" placeholder="Buscar producto" >
          </input>
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