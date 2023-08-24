import { Landing } from '../pages/LandingPages/Landing';
import InformacionUsuario from '../pages/UsuariosPages/InformacionUsuario';
import CategoriaIngrABM from '../pages/ABMPages/CategoriaIngredienteABM';
import { IngredientesABM } from '../pages/ABMPages/IngredientesABM';
import CategoriaProductosABM from '../pages/ABMPages/CategoriaProductosABM';
import { ProductosABM } from '../pages/ABMPages/ProductosAMB';
import { NotFound } from '../components/NotFound';
import InformacionAdicionalPostRegistro from '../pages/UsuariosPages/InformacionAdicionalPostRegistro';
import { Component } from 'react';
import PaginaPrincipalAdministrador from '../pages/AdminPages/PaginaPrincipalAdministrador';
import RankingClientes from '../pages/AdminPages/EstadisticasPages/RankingClientes';
import HistorialClienteAdmin from '../pages/AdminPages/EstadisticasPages/ClientesRanking/HistorialClienteAdmin';
import RankingProductos from '../pages/AdminPages/EstadisticasPages/RankingProductos';


export const routesConfig = [
    {
        path: '/',
        component: Landing,
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
        component: RankingProductos,
    },
    {
        path: '*',
        component: NotFound,
    },
];