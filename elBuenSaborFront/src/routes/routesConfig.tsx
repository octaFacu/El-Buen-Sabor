import { Landing } from '../pages/LandingPages/Landing';
import InformacionUsuario from '../pages/UsuariosPages/InformacionUsuario';
import CategoriaIngrABM from '../pages/ABMPages/CategoriaIngredienteABM';
import { IngredientesABM } from '../pages/ABMPages/IngredientesABM';
import CategoriaProductosABM from '../pages/ABMPages/CategoriaProductosABM';
import { ProductosABM } from '../pages/ABMPages/ProductosAMB';
import { NotFound } from '../components/NotFound';
import InformacionAdicionalPostRegistro from '../pages/UsuariosPages/InformacionAdicionalPostRegistro';
import { CajeroPedidosPage } from '../pages/CajeroPages/CajeroPedidosPage';
import CocineroPedidosPage from '../pages/CocineroPages/CocineroPedidosPage';
import DeliveryPedidosPage from '../pages/DeliveryPages/DeliveryPedidosPage';

export const routesConfig = [
    {
        path: '/',
        component: Landing,
    },
    {
        path: '/dashboard-pedidos',
        component: CajeroPedidosPage,
    },
    {
        path: '/dashboard-cocina',
        component: CocineroPedidosPage,
    },
    {
        path: '/dashboard-delivery',
        component: DeliveryPedidosPage,
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