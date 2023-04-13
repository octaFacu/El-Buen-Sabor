

const Navbar = () => {


    return(
      <header className="headerLogo">
        <div className="logo" style={{display: "inline-flex", alignItems: "center"}}>
          
          <input className="btnIngresoNav inputs" type="text" placeholder="Buscar producto" ><i className="material-icons" style={{color:"white"}} > search</i>
        </input>
        </div>
        <nav>
          <i className="material-icons" style={{fontSize: "30px", marginTop: "5%", color:"white"}}> shopping_cart</i>
          <button className="btnIngresoNav">Ingresar</button>
        </nav>
      </header>
    )
}

export default Navbar;