import { FC } from "react";
import "./ListCard.css"
import ProductCard from "../card/ProductCard";

interface ListCardProps {

}

const ListCard: FC<ListCardProps> = () => {
    return (


        //     <div style={{ textAlign: "center" }}><h2 style={{ color: "#864e1b" }}>¡MÁS VENDIDOS!</h2></div>

        //     <div className="containerCards">
        //         <div className="cardNew">
        //             <img className="imgCard" src="../src/assets/hamburguesa-simple.jpg" alt="Hamburguesa simple" style={{ width: "100%" }}></img>
        //             <div className="bottom-left">Hamburguesa Simple <i className="material-icons" style={{ fontSize: "30px", marginTop: "5%;" }}> add_shopping_cart</i></div>
        //         </div>
        //         <div className="cardNew">
        //             <img className="imgCard" src="../src/assets/hamburguesa-simple.jpg" alt="Hamburguesa americana" style={{ width: "100%" }}></img>
        //             <div className="bottom-left">Hamburguesa Americana <i className="material-icons" style={{ fontSize: "30px", marginTop: "5%;" }}> add_shopping_cart</i></div>

        //         </div>
        //         <div className="cardNew">
        //             <img className="imgCard" src="../src/assets/hamburguesa-simple.jpg" alt="Hamburguesa doble" style={{ width: "100%" }}></img>
        //             <div className="bottom-left">Hamburguesa Doble <i className="material-icons" style={{ fontSize: "30px", marginTop: "5%;" }}> add_shopping_cart</i></div>

        //         </div>
        //     </div>


        // <hr></hr>


        // <div className="container containerMain">


            <div className="container-cat" style={{ marginTop: "3%" }}>
                <div className="centerTitle">

                    <hr style={{ marginRight: "2%", marginLeft: "2%" }}></hr>
                    <div className="mt-3" style={{ textAlign: "center" }}><h3 style={{ color: "#864e1b" }}>HAMBURGUESAS</h3></div>
                    <hr style={{ marginRight: "2%", marginLeft: "2%" }}></hr>
                </div>


                {/* <div className="containerCards"> */}

                <div className="row">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    
                </div>
                {/* </div> */}

            </div>
        // </div>


    );
}

export default ListCard;