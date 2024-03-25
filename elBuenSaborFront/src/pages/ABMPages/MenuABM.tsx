import { Link } from "react-router-dom";
import MenuComponent from "../../components/MenusComponents/MenuComponent";
import "../pagesStyles/menuAbm.css"

export const MenuABM = () => {

    return (
        <div>
        <div className="container mx-auto">
            <div className="card card-admin">
                <div className='justify-content-around mt-2 mb-2 container-adminlinks py-2 row'>
                    <Link className='mx-4 col-md-6 my-2' to="/abm/productos/" style={{ color: 'white' }}>
                        <button className="btn btn-outline-light btnhover w-100">
                            <p>Productos</p>
                        </button>
                    </Link>
                    <Link className='mx-4 col-md-6 my-2' to="/abm/categoriaProductos/" style={{ color: 'white' }}>
                        <button className="btn btn-outline-light btnhover w-100">
                            <p>Categorias de Productos</p>
                        </button>
                    </Link>
                    <Link className='mx-4 col-md-6 my-2' to="/abm/ingredientes/" style={{ color: 'white' }}>
                        <button className="btn btn-outline-light btnhover w-100">
                            <p>Ingredientes</p>
                        </button>
                    </Link>
                    <Link className='mx-4 col-md-6 my-2' to="/abm/categoriaIngredientes/" style={{ color: 'white' }}>
                        <button className="btn btn-outline-light btnhover w-100">
                            <p>Categorias de Ingredientes</p>
                        </button>
                    </Link>

                </div>
            </div>
        </div>
            <div className="mt-5 mx-5">
            <MenuComponent></MenuComponent>
          </div>
          </div>

    );
}

