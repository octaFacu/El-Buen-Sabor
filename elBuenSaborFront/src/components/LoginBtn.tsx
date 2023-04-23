import {useAuth0} from '@auth0/auth0-react'
import '../css/styles.css'
import '../css/index.css'

const LoginBtn: React.FC = () => {

    const { loginWithRedirect } = useAuth0()

    

    return(
        <button className='btnIngresoNav' onClick={() => loginWithRedirect()}>Login</button>
    )

}

export default LoginBtn;