import { Pane, Tablist, SidebarTab, majorScale } from 'evergreen-ui'
import React, { useState } from 'react'
import { Link as RouterLink, Switch, Route, Redirect } from 'react-router-dom'
import { AppPage } from './pages/AppPage'
import { CompanyInfoPage } from './pages/CompanyInfoPage'
import { DirectorsPage } from './pages/DirectorsPage'
import { OfficersPage } from './pages/OfficersPage'

export const Dashboard = props => {
  const { path } = props.match
  const [ selectedIndex, setSelectedIndex ] = useState(0)
  const tabs = [
    {name: 'Dashboard', component: <AppPage title="Dashboard" />},
    {name: 'Organization', component: <CompanyInfoPage />},
    {name: 'Directors', component: <DirectorsPage />},
    {name: 'Officers', component: <OfficersPage />},
    {name: 'Shares', component: <AppPage title="Shares" />},
    {name: 'Employees', component: <AppPage title="Employees" />},
    {name: 'Documents', component: <AppPage title="Documents" />},
    {name: 'Settings', component: <AppPage title="Settings" />},
  ]

  return (
    <Pane display="flex">
      <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
        {tabs.map((tab, index) => (
          <SidebarTab
            is={RouterLink}
            to={`${path}/${tab.name.toLowerCase()}`}
            key={tab.name}
            id={tab.name}
            onSelect={() => setSelectedIndex(index)}
            isSelected={index === selectedIndex}
            aria-controls={`panel-${tab.name}`}
          >
            { tab.name }
          </SidebarTab>
        ))}
        <Pane>
          <SidebarTab paddingLeft={majorScale(4)} fontSize="0.7em">Submenu</SidebarTab>
        </Pane>
      </Tablist>
      <Pane padding={16} flex="1">
        <Switch>
          <Route path={`${path}`} exact>
            <Redirect to={`${path}/${tabs[0].name.toLowerCase()}`} />
          </Route>
          {tabs.map((tab, index) => (
            <Route key={tab.name} path={`${path}/${tab.name.toLowerCase()}`}>
              <Pane
                id={`panel-${tab.name}`}
                role="tabpanel"
                aria-labelledby={tab.name}
                aria-hidden={index !== selectedIndex}
                display={index === selectedIndex ? 'block' : 'none'}
              >
                { tab.component }
              </Pane>
            </Route>
          ))}
        </Switch>
      </Pane>
    </Pane>
  )
}