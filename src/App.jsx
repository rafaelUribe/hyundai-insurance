import './App.css';
import React from 'react';
import {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import Menu from './components/menu'
import AddPolicy from './components/addPolicy'
import Monitor from './components/monitor';
import Policy from './components/policy';


function App() {
  const [policy, setPolicy] = useState('')

  return (
    <div>
      <Router>
        <Menu></Menu>
        <Switch>
          <Route exact path='/addpolicy' component={AddPolicy}></Route>
          <Route exact path='/monitor' component={Monitor}></Route>
          <Route exact path='/policy' component={Policy}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
