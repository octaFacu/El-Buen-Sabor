import { useEffect, useState } from "react";
import { CategoriaProducto } from "../../context/interfaces/interfaces";
import { CategoriaProductoService } from "../../services/CategoriaProductoService";

const MenuCat: React.FC = () => {

//   const categoriaProductoService = new CategoriaProductoService();
//   const [categorias, setCategorias] = useState<CategoriaProducto[]>([]);

//   useEffect(() => {
//     // categoriaIngredienteService.getAll()
//     categoriaProductoService.getAllBasic()
//         .then(data => {
//             // console.log(data);
//             setCategorias(data)
//         })

// }, []);

    return(
        <div>


        {/* <div className="menuCat">
            <div><button className="btnPag"><i className="material-icons" style={{fontSize: "30px"}}> keyboard_arrow_left</i></button></div>

            {
              categorias.map(cat => 
                <div style={{fontSize: "24px"}}><a><i className="material-icons" > local_dining</i> {cat.denominacion}</a></div>
                )
            }
            
            
            <div style={{fontSize: "24px"}}><button className="btnPag"><i className="material-icons" style={{fontSize: "30px"}}> keyboard_arrow_right</i></button></div>
        </div> */}





    <div className="containerMain">
      <div style={{textAlign: "center"}}><h2 style={{ color: "#864e1b"}}>¡MÁS VENDIDOS!</h2></div>

      <div className="containerCards">
        <div className="cardNew">
          <img className="imgCard" src="../src/assets/hamburguesa-simple.jpg" alt="Hamburguesa simple" style={{width: "100%"}}></img>
          <div className="bottom-left">Hamburguesa Simple <i className="material-icons" style={{fontSize: "30px", marginTop: "5%;"}}> add_shopping_cart</i></div>
        </div>
        <div className="cardNew">
          <img className="imgCard" src="../src/assets/hamburguesa-simple.jpg" alt="Hamburguesa americana" style={{width: "100%"}}></img>
          <div className="bottom-left">Hamburguesa Americana <i className="material-icons" style={{fontSize: "30px", marginTop: "5%;"}}> add_shopping_cart</i></div>
        
        </div>
        <div className="cardNew">
          <img className="imgCard" src="../src/assets/hamburguesa-simple.jpg" alt="Hamburguesa doble" style={{width: "100%"}}></img>
          <div className="bottom-left">Hamburguesa Doble <i className="material-icons" style={{fontSize: "30px", marginTop: "5%;"}}> add_shopping_cart</i></div>
        
        </div>
      </div>
      <hr></hr>
      
      <div className="login-wrapper">
        <div className="container-cat" style={{marginTop: "3%"}}>
          <div className="centerTitle">
            
            <hr style={{marginRight: "2%", marginLeft: "2%"}}></hr>
            <div className="mt-3" style={{textAlign: "center"}}><h3 style={{color: "#864e1b"}}>HAMBURGUESAS</h3></div>
            <hr style={{marginRight: "2%", marginLeft: "2%"}}></hr>
          </div>
          

          <div className="containerCards">
            <div className="cardNew colorMain">
              <img className="imgCard" src="../src/assets/hamburguesa-simple.jpg" alt="Hamburguesa simple" style={{width:"100%"}}></img>

              <div className="centerTitle margin-text">
                <div style={{marginLeft: "2%"}}>Hamburguesa #1 </div>
                <div className="secondary-text">$700</div>
                <div className="shopping"> <i className="material-icons" style={{fontSize: "30px", marginTop:"5%"}}> add_shopping_cart</i></div>
              </div>
            
            </div>
            <div className="cardNew colorMain">
              <img className="imgCard" src="../src/assets/hamburguesa-simple.jpg" alt="Hamburguesa americana" style={{width:"100%"}}></img>
  
              <div className="centerTitle margin-text">
                <div style={{marginLeft: "2%"}}>Hamburguesa #2 </div>
                <div className="secondary-text">$700</div>
                <div className="shopping"> <i className="material-icons" style={{fontSize: "30px", marginTop:"5%"}}> add_shopping_cart</i></div>
              </div>

            </div>
            <div className="cardNew colorMain">
              <img className="imgCard" src="../src/assets/hamburguesa-simple.jpg" alt="Hamburguesa doble" style={{width:"100%"}}></img>
              <div className="centerTitle margin-text">
                <div style={{marginLeft: "2%"}}>Hamburguesa #3</div>
                <div className="secondary-text">$700</div>
                <div className="shopping"> <i className="material-icons" style={{fontSize: "30px", marginTop:"5%"}}> add_shopping_cart</i></div>
              </div>
                   
            </div>
          </div>

        </div>
      </div>
    </div>
    <br></br>
    </div>
    )
}

export default MenuCat;