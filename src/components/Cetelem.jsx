import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom'
import CetelemMul from './CetelemMul'
import CetelemM12M13 from './CetelemM12M13'
import CetelemMenu from './CetelemMenu'

const Cetelem = () => {
    return (
        <div>
            <section className='title'>
                <h2>CAPTURA DE POLIZAS CETELEM</h2>
            </section>
            <Router>
                <CetelemMenu></CetelemMenu>
                <Switch>
                    <Route exact path='/Mul' component={CetelemMul}></Route>
                    <Route exact path='/M12M13' component={CetelemM12M13}></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Cetelem
