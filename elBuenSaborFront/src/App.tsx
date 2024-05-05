import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';
import Navbar from './components/Navbar';
import { routesConfig } from './routes/routesConfig';
import ProtectedRoute from './routes/ProtectedRoute';
import AppRoutes from './routes/AppRoutes';
import FloatingBtn from './components/navigation/FloatingBtn';

const App: React.FC = () => {


    const routes = routesConfig.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={(
            //<ProtectedRoute allowedRoles={route.roles == null ? [] : route.roles}>
              <AppRoutes
                path={route.path}
                roles={route.roles == null ? [] : route.roles}
                component={route.component}
              />
           //</ProtectedRoute>
          )}
        />
      ));
    //<!--<FloatingBtn></FloatingBtn>-->

  return (
      <ContextProvider>
          <BrowserRouter>
              <Navbar />
              <Routes>{routes}</Routes>
          </BrowserRouter>
      </ContextProvider>
  );
};
export default App;