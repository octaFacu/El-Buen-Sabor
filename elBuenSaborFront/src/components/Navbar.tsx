import {useAuth0} from '@auth0/auth0-react'
import LogoutBtn from './LogoutBtn';
import LoginBtn from './LoginBtn';


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
      <header className="headerLogo" style={{justifyContent: "space-around", flexDirection: "row"}}>
        <div className="logo" style={{display: "inline-flex", alignItems: "center"}}>
        <i className="material-icons" style={{fontSize: "30px", marginTop: "5%", color:"white", marginLeft: "3%"}}> search</i>
          <input className="btnIngresoNav inputs" type="text" placeholder="Buscar producto" >
          </input>
        </div>
        {/*<div style={{flexDirection: "row", justifyContent: "flex-end"}}>*/}
         
            <div >
              <i className="material-icons" style={{fontSize: "30px", marginTop: "5%", color:"white"}}> shopping_cart</i>
              <i className="material-icons" style={{fontSize: "30px", marginTop: "5%", color:"white"}}> favorite</i>
            </div>
            <div>
              <><img style={{borderRadius: "50%", maxWidth: "50%", maxHeight:"50%"}} src={user!.picture} alt="imagen de perfil" /></>
            </div>
            <div>
              <h3>{user!.name}</h3>
              <h3>{user!.id}</h3>
            </div>
          <div><LogoutBtn/></div>
        {/*</div>*/}


      </header>
    )
  }else{



    return(
      <header className="headerLogo">
        <div className="logo" style={{display: "inline-flex", alignItems: "center"}}>
        <i className="material-icons" style={{fontSize: "30px", marginTop: "5%", color:"white", marginLeft: "3%"}}> search</i>
          
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