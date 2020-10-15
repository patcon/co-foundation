import React from 'react'
import { Switch, Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { Wizard } from './components/Wizard'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/new" />
      </Route>
      <Route path="/new">
        <Wizard />
      </Route>
    </Switch>
  </Router>
)

export default App;
