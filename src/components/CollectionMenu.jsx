import React from 'react'
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom'

const CollectionMenu = () => {
    return (
        <div className='collection-menu'>
            <nav className='collection-menu-nav'>
                <ul className='nav-ul'>
                    <li>
                        <Link to='/Unregistered'>Sin registrar en Dalton Soft</Link>
                    </li>
                    <li>
                        <Link to='/Unpaid'>Sin pagar por el cliente</Link>
                    </li>
                    <li>
                        <Link to='/ForPaySchedule'>Por programar para pago</Link>
                    </li>
                    <li>
                        <Link to='/Scheduled'>Programadas para pago</Link>
                    </li>
                    <li>
                        <Link to='/PaidPolicies'>Polizas Liquidadas</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default CollectionMenu
