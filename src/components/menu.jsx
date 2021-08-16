import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const Menu = () => {
    return (
        <div className='menu-header'>
            <div className='dalton-logo'>

            </div>
            <nav>
                <ul>
                    <li className='add'>
                        <Link to='/addPolicy'>+</Link>
                    </li>
                    <li className='monitor'>
                        <Link to='/monitor' ></Link>
                    </li>
                    <li className='to-add-policy'>
                        <Link to='/addPolicy' >Nueva poliza</Link>
                    </li>
                    <li className='to-monitor'>
                        <Link to='/monitor' >Monitor</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu
