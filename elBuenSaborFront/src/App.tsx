import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginBtn from './components/LoginBtn'


import './css/App.css'


const App: React.FC = () => {

  

  return (
    <div className="App" >
      <h1 style={{color: "white"}}>Hola</h1>
      <main>
        <Navbar />
        <LoginBtn />

      </main>
    </div>
  )
}

export default App
