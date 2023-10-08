import { Landing } from '../pages/LandingPages/Landing';
import InformacionUsuario from '../pages/UsuariosPages/InformacionUsuario';
import CategoriaIngrABM from '../pages/ABMPages/CategoriaIngredienteABM';
import { IngredientesABM } from '../pages/ABMPages/IngredientesABM';
import CategoriaProductosABM from '../pages/ABMPages/CategoriaProductosABM';
import { ProductosABM } from '../pages/ABMPages/ProductosAMB';
import { NotFound } from '../components/NotFound';
import InformacionAdicionalPostRegistro from '../pages/UsuariosPages/InformacionAdicionalPostRegistro';
import { Cart } from '../pages/CartPages/Cart';
import Checkout from '../pages/CartPages/Checkout';
import PaginaPrincipalAdministrador from '../pages/AdminPages/PaginaPrincipalAdministrador';
import RankingClientes from '../pages/AdminPages/EstadisticasPages/RankingClientes';
import HistorialClienteAdmin from '../pages/AdminPages/EstadisticasPages/ClientesRanking/HistorialClienteAdmin';
import RankingProductos from '../pages/AdminPages/EstadisticasPages/RankingProductos';
import InformeGanancias from '../pages/AdminPages/EstadisticasPages/InformeGanancias';
import { CajeroPedidosPage } from '../pages/CajeroPages/CajeroPedidosPage';
import CocineroPedidosPage from '../pages/CocineroPages/CocineroPedidosPage';
import DeliveryPedidosPage from '../pages/DeliveryPages/DeliveryPedidosPage';
import SuccessPage from '../pages/CartPages/MercadoPagoBackURLS/SuccessPage';
import PendingPage from '../pages/CartPages/MercadoPagoBackURLS/PendingPage';
import FailurePage from '../pages/CartPages/MercadoPagoBackURLS/FailurePage';


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
        path: '/carrito',
        component: Cart,
    },
    {
        path: '/checkout',
        component: Checkout,
    },
    {
        path: '/success',
        component: SuccessPage,
    },
    {
        path: '/pending',
        component: PendingPage,
    },
    {
        path: '/failure',
        component: FailurePage,
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
        path: '/admin',
        component: PaginaPrincipalAdministrador,
    },
    {
        path: '/admin/estadisticas/rankingCliente',
        component: RankingClientes,
    },
    {
        path: '/admin/estadisticas/rankingCliente/HistorialCliente/:clienteId',
        component: HistorialClienteAdmin,
    },
    {
        path: '/admin/estadisticas/RankingProducto',
        component: RankingProductos,
    },
    {
        path: '/admin/estadisticas/InformeGanancias',
        component: InformeGanancias,
    },
    {
        path: '*',
        component: NotFound,
    },
];