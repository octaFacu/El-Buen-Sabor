import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  var roles: string[] = [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && allowedRoles.length !== 0) {
    return <div>Por favor ingrese a su cuenta para ver esta página.</div>;
  }

if(isAuthenticated && user){
  
  var rolesString = user['rol']; //IT IS AN OBJECT

    for (const key in rolesString) {
      if (rolesString.hasOwnProperty(key) && typeof rolesString[key] === "string") {
        roles.push(rolesString[key]);
      }
    }

    console.log("roles del usuario: "+roles);
}


  if (allowedRoles.length === 0  || allowedRoles.some(role => roles.includes(role))) {
    return <>{children}</>;
  } else {
    return(
      <div>
        <div className='d-flex justify-content-center text-center font-weight-bold'>
          <h1 className='text-danger mt-5 ms-5 me-5'>Acceso denegado. </h1>
        </div>
        <div className='d-flex justify-content-center text-center'>
          <h2>Usted no tiene los permisos para ver esta página.</h2>
        </div>
      </div>
    );
    
  }
};

export default ProtectedRoute;
