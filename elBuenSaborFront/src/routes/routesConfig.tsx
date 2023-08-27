import { Landing } from '../pages/LandingPages/Landing';
import InformacionUsuario from '../pages/UsuariosPages/InformacionUsuario';
import CategoriaIngrABM from '../pages/ABMPages/CategoriaIngredienteABM';
import { IngredientesABM } from '../pages/ABMPages/IngredientesABM';
import CategoriaProductosABM from '../pages/ABMPages/CategoriaProductosABM';
import { ProductosABM } from '../pages/ABMPages/ProductosAMB';
import { NotFound } from '../components/NotFound';
import InformacionAdicionalPostRegistro from '../pages/UsuariosPages/InformacionAdicionalPostRegistro';
import DetalleProducto from '../components/Landing/detalleProducto/DetalleProducto';
import { Cart } from '../pages/CartPages/Cart';
import Checkout from '../pages/CartPages/Checkout';

export const routesConfig = [
    {
        path: '/',
        component: Landing,
    },
    {
        path: '/carrito',
        component: Cart,
    },
    {
        path: '/checkout',
        component: Checkout,
    },
    {
        path: '/usuarios',
        component: InformacionUsuario,
    },
    {
        path: '/informacionAdicional',
        component: InformacionAdicionalPostRegistro,
    },
    {
        path: '/abm/categoriaIngredientes',
        component: CategoriaIngrABM,
    },
    {
        path: '/abm/ingredientes',
        component: IngredientesABM,
    },
    {
        path: '/abm/categoriaProductos',
        component: CategoriaProductosABM,
    },
    {
        path: '/abm/productos',
        component: ProductosABM,
    },
    {
        path: '*',
        component: NotFound,
    },
];