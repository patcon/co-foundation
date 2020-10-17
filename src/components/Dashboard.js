import { Button, Text, Pane, Paragraph, Tablist, SidebarTab, Heading, Link, majorScale, SelectField, PlusIcon } from 'evergreen-ui'
import React, { useState } from 'react'
import { Link as RouterLink, Switch, Route, Redirect } from 'react-router-dom'
import useToggle from '../hooks/useToggle'
import { FakeLoadButton } from './Wizard'

const HotDogCards = () => (
  <>
    <Pane>
      <Text>Name</Text>
    </Pane>
    <Pane>
      <HotDogCard />
    </Pane>
  </>
)

const HotDogCard = () => {
  const role = 'President'
  const otherRoles = ['Director', 'Shareholder', 'Secretary']
  return (
    <Pane>
      <Pane padding={majorScale(1)} elevation={2}><Text>Patrick Connolly</Text></Pane>
      <Pane>
        <Pane elevation={1} marginX={majorScale(1)}>
          <Pane display="flex" justifyContent="flex-end" alignItems="center" marginX={majorScale(3)} height={majorScale(6)}>
            <Pane>
              <Link marginLeft={majorScale(3)} cursor="pointer">Edit Contact Info</Link>
              <Link marginLeft={majorScale(3)} cursor="pointer">Remove</Link>
              <Link marginLeft={majorScale(3)} cursor="not-allowed">Replace</Link>
            </Pane>
          </Pane>
          <Pane padding={majorScale(3)}>
            <Pane>
              <Pane marginBottom={majorScale(3)}>
                <Text>
                  This {role} in also a {otherRoles.join(', ')}.
                </Text>
              </Pane>
              <Pane>
                <Paragraph>me@example.com</Paragraph>
                <Paragraph>555-555-5555</Paragraph>
                <Paragraph>123 Any Street, Unit 3, Anytown, ON, Canada, H0H 0H0</Paragraph>
              </Pane>
            </Pane>
            <Paragraph textAlign="right">Canadian Resident</Paragraph>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  )
}

const DirectorsPage = () => {
  return (
    <AppPage
      title="Directors"
      byline="The Directors appoint Officers and oversee management of the company."
      moreLink="https://get.founded.help/roles-in-your-corporation/what-is-a-director"
    >
      <Pane display="flex" justifyContent="flex-end">
        <Button appearance="primary" textTransform="uppercase">Add Director <PlusIcon /> </Button>
      </Pane>
      <Pane>
        <HotDogCards />
      </Pane>
    </AppPage>
  )
}

const OfficersPage = () => {
  return (
    <AppPage
      title="Officers"
      byline="Officers actively operate and manage the business. President and Secretary are mandatory however companies can create other positions like CEO, Treasurer, etc. These can all be held by the same person."
      moreLink="https://get.founded.help/roles-in-your-corporation/what-is-an-officer"
    >
      <Pane display="flex" justifyContent="flex-end">
        <Button appearance="primary" textTransform="uppercase">Add Officer <PlusIcon /> </Button>
      </Pane>
      <Pane>
        <Pane>
          <Heading is="h4" size={700}>President</Heading>
          <Pane>
            <HotDogCards />
          </Pane>
        </Pane>
        <hr style={{margin: '36px 0'}} />
        <Pane>
          <Heading is="h4" size={700}>Secretary</Heading>
          <Pane>
            <HotDogCards />
          </Pane>
        </Pane>
      </Pane>
    </AppPage>
  )
}

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

export const InfoGroup = props => {
  const { heading, content } = props

  return (
    <Pane marginBottom={majorScale(3)} marginRight={majorScale(6)}>
      <Heading fontStyle="italic" is="h6">{heading}</Heading>
      <Paragraph>{content}</Paragraph>
  </Pane>
  )
}

export const OrganizationInfoView = props => {
  const { jurisdiction, yearEndMonth } = props

  return (
    <Pane display="flex">
      <InfoGroup
        heading="Jurisdiction of Incorporation"
        content={jurisdiction} />
      <InfoGroup
        heading="Fiscal Year End"
        content={`Last day of ${yearEndMonth}`} />
    </Pane>
  )
}

const MonthSelectField = props => {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return (
    <SelectField {...props}>
      {MONTHS.map((month, idx) => (
        <option key={month} value={month}>{month}</option>
      ))}
    </SelectField>
  )
}

export const OrganizationInfoEdit = props => {
  const { jurisdiction, yearEndMonth } = props

  return (
    <Pane display="flex">
      <InfoGroup
        heading="Jurisdiction of Incorporation"
        content={jurisdiction} />
      <MonthSelectField label="Fiscal Year End" value={yearEndMonth} />
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
        isEditable={true}
        renderEdit={<OrganizationInfoEdit
          jurisdiction="Federal Canadian"
          yearEndMonth="July"
        />}
      >
        <OrganizationInfoView
          jurisdiction="Federal Canadian"
          yearEndMonth="July"
        />
      </CompanyInfoBox>
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
  const { title, isEditable, editLabel, editLinkOverride, children, renderEdit } = props
  const [ isEditing, toggleEditing ] = useToggle(false)
  return (
    <Pane padding={majorScale(3)} marginBottom={majorScale(3)} elevation={1}>
      <Pane minHeight={majorScale(4)} display="flex" justifyContent="space-between">
        <Heading size={700} is="h2" marginBottom={majorScale(3)}>{title}</Heading>
        {isEditable
          ? isEditing
            ? <Pane>
                <Link cursor="pointer" onClick={() => toggleEditing()} marginRight={majorScale(2)}>Cancel</Link>
                <FakeLoadButton onComplete={() => toggleEditing()} textTransform="uppercase" appearance="primary">
                  Save Changes
                </FakeLoadButton>
              </Pane>
            : !editLinkOverride
              ? <Link cursor="pointer" onClick={() => toggleEditing()}>{editLabel}</Link>
              : <Link href={editLinkOverride}>{editLabel}</Link>
          : null
        }
      </Pane>
      <Pane>
        {isEditing
          ? renderEdit
          : children
        }
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
  const { title, byline, moreLink, children } = props
  return (
    <Pane>
      <Pane>
        <Heading size={900} textTransform="uppercase" is="h1">{title}</Heading>
        <Heading is="h5">
          {byline + ' '}
          {moreLink
            ? <Link target="_blank" href={moreLink}>Read More</Link>
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