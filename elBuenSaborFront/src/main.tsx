import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/index.css'
import { Auth0Provider } from '@auth0/auth0-react'







ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider domain={"dev-elbuensabor.us.auth0.com"} clientId={"GFBGwZPPuFKMKUsTtrfkwAqG3BJCIe5l"} authorizationParams={{
      redirect_uri: window.location.origin
    }}> 
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
