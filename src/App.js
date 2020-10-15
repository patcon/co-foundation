import React from 'react'
import { Switch, Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { Wizard } from './components/Wizard'
import { Dashboard } from './components/Dashboard'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/new" />
      </Route>
      <Route path="/new">
        <Wizard />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  </Router>
)

export default App;
