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
import RegistroEmpleado from '../pages/AdminPages/ABMEmpleados/RegistroEmpleado';
import SuccessPage from '../pages/CartPages/MercadoPagoBackURLS/SuccessPage';
import PendingPage from '../pages/CartPages/MercadoPagoBackURLS/PendingPage';
import FailurePage from '../pages/CartPages/MercadoPagoBackURLS/FailurePage';


export const routesConfig = [
    {
        path: '/',
        component: Landing,
        roles: [],
    },
    {
        path: '/dashboard-pedidos/*',
        component: CajeroPedidosPage,
        roles: ['admin', 'cajero'],
    },
    {
        path: '/dashboard-cocina/*',
        component: CocineroPedidosPage,
        roles: ['admin', 'cocinero'],
    },
    {
        path: '/dashboard-delivery/*',
        component: DeliveryPedidosPage,
        roles: ['admin', 'delivery'],
    },
    {
        path: '/carrito/*',
        component: Cart,
        roles: [],
    },
    {
        path: '/checkout',
        component: Checkout,
        roles: [],
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
        roles: [],
    },
    {
        path: '/informacionAdicional',
        component: InformacionAdicionalPostRegistro,
        roles: [],
    },
    {
        path: '/abm/categoriaIngredientes',
        component: CategoriaIngrABM,
        roles: ['admin', 'cocinero'],
    },
    {
        path: '/abm/ingredientes',
        component: IngredientesABM,
        roles: ['admin', 'cocinero'],
    },
    {
        path: '/abm/categoriaProductos',
        component: CategoriaProductosABM,
        roles: ['admin', 'cocinero'],
    },
    {
        path: '/abm/productos',
        component: ProductosABM,
        roles: ['admin', 'cocinero'],
    },
    {
        path: '/admin',
        component: PaginaPrincipalAdministrador,
        roles: ['admin'],
    },
    {
        path: '/admin/estadisticas/rankingCliente',
        component: RankingClientes,
        roles: ['admin'],
    },
    {
        path: '/admin/estadisticas/rankingCliente/HistorialCliente/:clienteId',
        component: HistorialClienteAdmin,
        roles: ['admin'],
    },
    {
        path: '/admin/estadisticas/RankingProducto',
        component: RankingProductos,
        roles: ['admin'],
    },
    {
        path: '/admin/estadisticas/InformeGanancias',
        component: InformeGanancias,
        roles: ['admin'],
    },
    {
        path: '/Admin/Administrar/Empleados',
        component: RegistroEmpleado,
    },
    {
        path: '/Admin/Administrar/Empleados',
        component: RegistroEmpleado,
    },
    {
        path: '*',
        component: NotFound,
    },
];