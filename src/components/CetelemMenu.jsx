import React from 'react'
import { Link } from 'react-router-dom'

const CetelemMenu = () => {
    return (
        <div>
            <nav className='admin-menu-nav'>
                <ul className='nav-ul'>
                    <li className='salesman-admin'>
                        <Link to='/Mul'>Multianuales</Link>
                    </li>
                    <li className='teams-admin'>
                        <Link to='/M12M13'>M12 Y M13</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default CetelemMenu
