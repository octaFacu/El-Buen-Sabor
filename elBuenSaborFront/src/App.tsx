import { useState } from 'react'
import Navbar from './components/Navbar'
import {useAuth0} from '@auth0/auth0-react'

import './css/App.css'


const App: React.FC = () => {

  const { loginWithRedirect } = useAuth0()

  return (
    
    <main>
      <Navbar />
      <button onClick={() => loginWithRedirect()}>Login</button>

    </main>
  )
}

export default App
