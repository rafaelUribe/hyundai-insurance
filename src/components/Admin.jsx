import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom'
import AdminMenu from './AdminMenu'
import SalesmanAdmin from './SalesmanAdmin'
import Teams from './Teams'
import Brokers from './Brokers'
import Companies from './Companies'
import Origins from './Origins'

const Admin = () => {
    return (
        <div>
            <section className='title'>
                <h2>ADMINISTRACION</h2>
            </section>
            <Router>
                <AdminMenu></AdminMenu>
                <Switch>
                    <Route exact path='/SalesmanAdmin' component={SalesmanAdmin}></Route>
                    <Route exact path='/Teams' component={Teams}></Route>
                    <Route exact path='/Brokers' component={Brokers}></Route>
                    <Route exact path='/Companies' component={Companies}></Route>
                    <Route exact path='/Origins' component={Origins}></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Admin
