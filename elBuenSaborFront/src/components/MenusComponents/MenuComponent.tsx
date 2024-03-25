import './menu.css'
import { Link } from 'react-router-dom';

const MenuComponent: React.FC = () => {


  return (
    <div className='d-flex justify-content-around'>
        <div className='justify-content-around mt-2 mb-2 container-adminlinks py-2'>
        <Link className='mx-4' to="/dashboard-delivery/" style={{ color: 'white' }}>
            <button className="btn btn-outline-light">
                <i className="material-icons">
                    two_wheeler
                </i>
            </button>
          </Link>
          <Link className='mx-4' to="/dashboard-pedidos/" style={{ color: 'white' }}>
            <button className="btn btn-outline-light">
                <i className="material-icons">
                event_note
                </i>
            </button>
          </Link>
           <Link className='mx-4' to="/dashboard-cocina/" style={{ color: 'white' }}>
            <button className="btn btn-outline-light">
            <i className="material-icons">restaurant_menu</i>
            </button>
          </Link>
          </div>
    </div>
  )

}

export default MenuComponent;