import React from 'react'
import { Switch, Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { Wizard } from './components/Wizard'
import { Dashboard } from './components/Dashboard'
import { FormPdfViewer } from './components/PdfViewer'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/new" />
      </Route>
      <Route path="/new">
        <Wizard />
      </Route>
      <Route path="/pdf">
        <FormPdfViewer formId="07200" />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  </Router>
)

export default App;
