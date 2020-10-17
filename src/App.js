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
        <FormPdfViewer formId="07200" pages="8,9,9" />
      </Route>
      <Route path="/pdf2">
        <FormPdfViewer formId="11377" pages="2-7" />
      </Route>
      <Route path="/app" component={Dashboard} />
    </Switch>
  </Router>
)

export default App;
