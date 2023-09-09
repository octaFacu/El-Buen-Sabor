
import Navbar from './components/Navbar'
import { ContextProvider } from './context/ContextProvider'
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from './routes/AppRoutes'
import FloatingBtn from './components/navigation/FloatingBtn'


const App: React.FC = () => {

  return (
  <ContextProvider>
    <BrowserRouter>

          <Navbar />
          <AppRoutes/>
          <FloatingBtn></FloatingBtn>

      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
