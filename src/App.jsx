import React from 'react';
import './css/App.css';
import './css/AddQuotation.css';
import './css/Origins.css'
import './css/Brokers.css'
import './css/AdminMenu.css'
import './css/Menu.css'
import './css/SalesmanAdmin.css'
import './css/Teams.css'
import './css/Companies.css'
import './css/AddPolicy.css'
import './css/Monitor.css'
import './css/CollectionMenu.css'
import './css/Unregistered.css'
import './css/Unpaid.css'
import './css/ForPaySchedule.css'
import './css/Scheduled.css'
import './css/PaidPolicies.css'
import './css/Cetelem.css'
import './css/CetelemMul.css'
import './css/CetelemM12M13.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Menu from './components/Menu'
import AddPolicy from './components/AddPolicy'
import Monitor from './components/Monitor';
import Quotations from './components/Quotations';
import AddQuotation from './components/AddQuotation';
import Admin from './components/Admin'
import Collection from './components/Collection'
import Cetelem from './components/Cetelem';


function App() {
  return (
    <div>
      <Router>
        <Menu></Menu>
        <Switch>
          <Route exact path='/Addpolicy' component={AddPolicy}></Route>
          <Route exact path='/Monitor' component={Monitor}></Route>
          <Route exact path='/Quotations' component={Quotations}></Route>          
          <Route exact path='/AddQuotation' component={AddQuotation}></Route>
          <Route exact path='/Admin' component={Admin}></Route>
          <Route exact path='/Collection' component={Collection}></Route>
          <Route exact path='/Cetelem' component={Cetelem}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
