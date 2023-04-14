import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/index.css'
import { Auth0Provider } from '@auth0/auth0-react'


const clientID: string = process.env.REACT_APP_AUTH0_CLIENT_ID!;
const domain: string = process.env.REACT_APP_AUTH0_DOMAIN!;
//redirectUri={window.location.origin}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider domain={"dev-elbuensabor.us.auth0.com"} clientId={"GFBGwZPPuFKMKUsTtrfkwAqG3BJCIe5l"}> 
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
