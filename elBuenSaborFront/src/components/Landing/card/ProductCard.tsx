import { FC } from "react";
import "./ProductCard.css";

interface ProductCardProps {

}

const ProductCard: FC<ProductCardProps> = () => {

    

    return (

        // <div className="cardNew colorMain">
        //     <img className="imgCard" src="../src/assets/hamburguesa-simple.jpg" alt="Hamburguesa simple" style={{ width: "100%" }}></img>

        //     <div className="centerTitle margin-text">
        //         <div style={{ marginLeft: "2%" }}>Hamburguesa #1 </div>
        //         <div className="secondary-text">$700</div>
        //         <div className="shopping"> <i className="material-icons" style={{ fontSize: "30px", marginTop: "5%" }}> add_shopping_cart</i></div>
        //     </div>

        // </div>


        <div className="col-sm-6 col-md-4" >
            <div className="card mb-3">
                <div className="card-body">

                    <img className="imgCard" src="../src/assets/hamburguesa-simple.jpg" alt="Hamburguesa simple" style={{ width: "100%" }}></img>
                    <div className="centerTitle margin-text">
                        <div style={{ marginLeft: "2%" }}>Hamburguesa #1 </div>
                        <div className="secondary-text">$700</div>
                        <div className="shopping"> <i className="material-icons" style={{ fontSize: "30px", marginTop: "5%" }}> add_shopping_cart</i></div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default ProductCard;