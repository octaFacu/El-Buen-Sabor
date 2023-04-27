import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import 'bootstrap/dist/css/bootstrap.min.css';








ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Auth0Provider domain={import.meta.env.VITE_AUTH0_DOMAIN! as string} clientId={import.meta.env.VITE_AUTH0_CLIENT_ID! as string} authorizationParams={{
      redirect_uri: window.location.origin
    }}> 
      <App />
    </Auth0Provider>
  // </React.StrictMode>,
)
