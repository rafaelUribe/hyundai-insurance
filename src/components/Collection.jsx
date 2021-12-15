import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import CollectionMenu from './CollectionMenu'
import Unregistered from './Unregistered'
import Unpaid from  './Unpaid'
import ForPaySchedule from './ForPaySchedule'
import Scheduled from './Scheduled'
import PaidPolicies from './PaidPolicies'

const Collection = () => {
    return (
        <div>
            <section className='title'>
                <h2>COBRANZA</h2>
            </section>
            <Router>
                <CollectionMenu></CollectionMenu>
                <Switch>
                    <Route exact path='/Unregistered' component={Unregistered}></Route>
                    <Route exact path='/Unpaid' component={Unpaid}></Route>
                    <Route exact path='/ForPaySchedule' component={ForPaySchedule}></Route>
                    <Route exact path='/Scheduled' component={Scheduled}></Route>
                    <Route exact path='/PaidPolicies' component={PaidPolicies}></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Collection
