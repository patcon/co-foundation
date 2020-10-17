import { Button, Pane, Paragraph, Tablist, SidebarTab, Heading, Link, majorScale } from 'evergreen-ui'
import React, { useState } from 'react'
import { Link as RouterLink, Switch, Route, Redirect } from 'react-router-dom'
import useToggle from '../hooks/useToggle'

export const Dashboard = props => {
  const { path } = props.match
  const [ selectedIndex, setSelectedIndex ] = useState(0)
  const tabs = [
    {name: 'Dashboard', component: <AppPage title="Dashboard" />},
    {name: 'Organization', component: <CompanyInfoPage />},
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
      <Pane padding={16} background="tint1" flex="1">
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

export const CompanyInfoPage = () => {
  return (
    <AppPage
      title="Company Info"
      byline="Company Information contains the registration information and other key details on the corporation."
    >
      <CompanyInfoBox
        title="Company Name"
        isEditable={true}
        editLinkOverride="#"
        editLabel="Change Name"
      >
        <Paragraph>Sunday Flowers Inc.</Paragraph>
      </CompanyInfoBox>
      <CompanyInfoBox
        title="Registered Head Office"
        isEditable={true}
        editLabel="Change Address"
      >
        <FormattedAddress
          street1="719 Bloor St W"
          city="Toronto"
          region="ON"
          postalCode="M6G 1L5"
        />
      </CompanyInfoBox>
      <CompanyInfoBox
        title="Organization Information"
        isEditable={true} />
      <CompanyInfoBox
        title="Extra Information"
        isEditable={true} />
      <CompanyInfoBox
        title="Individuals with Significant Control"
        isEditable={true} />
    </AppPage>
  )
}

const FormattedAddress = props => {
  const { street1, street2, city, region, country, postalCode } = props
  return (
    <>
      <Paragraph>{street1}</Paragraph>
      {street2
        ? <Paragraph>{street2}</Paragraph>
        : null
      }
      <Paragraph>{city}, {region}</Paragraph>
      <Paragraph>{country}</Paragraph>
      <Paragraph>{postalCode}</Paragraph>
    </>
  )
}
FormattedAddress.defaultProps = {
  street1: '',
  street2: '',
  city: '',
  region: '',
  country: 'Canada',
  postalCode: ''
}

export const CompanyInfoBox = props => {
  const { title, isEditable, editLabel, editLinkOverride, children } = props
  const [ isEditing, toggleEditing ] = useToggle(false)
  return (
    <Pane padding={majorScale(3)} marginBottom={majorScale(3)} elevation={1}>
      <Pane display="flex" justifyContent="space-between">
        <Heading as="h2">{title}</Heading>
        {isEditable
          ? isEditing
            ? <Pane>
                <Link onClick={() => toggleEditing()} marginRight={majorScale(3)}>Cancel</Link>
                <Button textTransform="uppercase" appearance="primary">
                  Save Changes
                </Button>
              </Pane>
            : !editLinkOverride
              ? <Link onClick={() => toggleEditing()}>{editLabel}</Link>
              : <Link href={editLinkOverride}>{editLabel}</Link>
          : null
        }
      </Pane>
      <Pane>
        {children}
      </Pane>
    </Pane>
  )
}
CompanyInfoBox.defaultProps = {
  title: '  ',
  isEditable: false,
  isEditMode: false,
  editLabel: 'Edit Details',
  editLinkOverride: '',
}

export const AppPage = props => {
  const { title, byline, more_link, children } = props
  return (
    <Pane>
      <Pane>
        <Heading textTransform="uppercase" as="h1">{title}</Heading>
        <Heading as="h5">
          {byline}
          {more_link
            ? <Link target="_blank" href={more_link}>Read More</Link>
            : null
          }
        </Heading>
        <hr style={{ marginTop: majorScale(3) }} />
      </Pane>
      <Pane paddingTop={majorScale(4)}>
        {children}
      </Pane>
    </Pane>
  )
}