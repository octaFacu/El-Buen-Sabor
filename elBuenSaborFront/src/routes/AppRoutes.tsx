import React, { useEffect } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import PageLoader from '../components/pageLoader/PageLoader';

interface AppRouteProps {
  path: string;
  roles: string[];
  component: React.ComponentType<any>;
}

const AppRoutes: React.FC<AppRouteProps> = ({
  path,
  roles,
  component: Component,
}) => {

  const { isAuthenticated, isLoading, user } = useAuth0();
  var userRoles: string[] = [];	

  if(!isLoading){
    if (!isAuthenticated && roles.length !== 0) {

      return <Navigate to="/" />;
    }else if(!isAuthenticated && roles.length === 0){
      
      return <Component />;//<Routes><Route path={path} element={<Component />} /></Routes>;
    }

    if(user) { 
      var rolesString = user['rol']; //IT IS AN OBJECT

      if(rolesString == "" || rolesString == undefined){
        userRoles.push("cliente");
      }

      //console.log("Roles: "+rolesString);

      for (const key in rolesString) {
        if (rolesString.hasOwnProperty(key) && typeof rolesString[key] === "string") {
          userRoles.push(rolesString[key]);
        }
      }

      if (roles.length === 0 || roles.some(role => userRoles.includes(role))) {

        return <Component />;

      } else {
        //console.log("roles del usuario: "+userRoles);
        return <Navigate to="/access-denied" />;
      }
    }else{
      return <Navigate to="/" />;
    }
  }else{
    return <PageLoader></PageLoader>
  }
};

export default  AppRoutes;
