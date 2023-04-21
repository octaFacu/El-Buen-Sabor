import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginBtn from './components/LoginBtn'
import ImgLogo from './components/ImgLogo'
import MenuCat from './components/MenuCat'




const App: React.FC = () => {

  

  return (
    <div className="App" >
      <main>
        <Navbar />
        <ImgLogo />
        <MenuCat />
      </main>
    </div>
  )
}

export default App
