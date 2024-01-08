import {useAuth0} from '@auth0/auth0-react'
import '../css/styles.css'

const LogoutBtn: React.FC = () => {


    const {logout} = useAuth0();

    return(
        // <button className='btnIngresoNav' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
    )
}

export default LogoutBtn;