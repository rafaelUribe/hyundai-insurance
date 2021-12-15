import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <div className='admin-menu'>
            <nav className='admin-menu-nav'>
                <ul className='nav-ul'>
                    <li className='salesman-admin'>
                        <Link to='/SalesmanAdmin'>Fuerza de ventas</Link>
                    </li>
                    <li className='teams-admin'>
                        <Link to='/Teams'>Equipos de ventas</Link>
                    </li>
                    <li className='brokers-admin'>
                        <Link to='/Brokers'>Brokers</Link>
                    </li>
                    <li className='companies-admin'>
                        <Link to='/Companies'>Companías</Link>
                    </li>
                    <li className='companies-admin'>
                        <Link to='/Origins'>Orígenes</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default AdminMenu
