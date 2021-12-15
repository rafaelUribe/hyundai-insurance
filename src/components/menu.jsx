import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const [displayMenu, setDisplayMenu] = useState(false)

    const toggleMenu = () => {
        displayMenu? setDisplayMenu(false) : setDisplayMenu(true)
    }

    return (
        <div className='menu'>
            <section className='header'>
                <div className='dalton-logo'>

                </div>
                <div className='show-menu-button mobile-visible'>
                    <button className='menu-button' onClick={toggleMenu}>
                        Menú
                    </button>
                </div>           
            </section>
            <div className='menu-nav-desktop desktop-visible'>               
                    <div className='to-add-policy'>
                        <Link to='/AddPolicy' >Nueva poliza</Link>
                    </div>
                    <div>
                        <Link to='/Cetelem'>Cetelem</Link>
                    </div>
                    <div className='to-monitor'>
                        <Link to='/Monitor' >Monitor</Link>
                    </div>
                    <div className='to-quotation'>
                        <Link to='/AddQuotation'>Cotizacion</Link>
                    </div>
                    <div className='to-collection'>
                        <Link to='/Collection'>Cobranza</Link>
                    </div>
                    <div className='to-admin'>
                        <Link to='/Admin'>Admin</Link>
                    </div>
            </div>
            {
                displayMenu?
                    (
                        <div className='carousel'>
                            <div className='menu-nav-mobile mobile-visible'>
                                <div className='to-add-policy' onClick={toggleMenu}>
                                    <Link to='/AddPolicy' >Nueva poliza</Link>
                                </div>
                                <div onClick={toggleMenu}>
                                    <Link to='/Cetelem'>Cetelem</Link>
                                </div>
                                <div className='to-monitor' onClick={toggleMenu}>
                                    <Link to='/Monitor' >Monitor</Link>
                                </div>
                                <div className='to-quotation' onClick={toggleMenu}>
                                    <Link to='/AddQuotation'>Cotizacion</Link>
                                </div>
                                <div className='to-collection' onClick={toggleMenu}>
                                    <Link to='/Collection'>Cobranza</Link>
                                </div>
                                <div className='to-admin' onClick={toggleMenu}>
                                    <Link to='/Admin'>Admin</Link>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (   
                        <span></span>
                    )
            }
        </div>
    )
}

export default Menu
