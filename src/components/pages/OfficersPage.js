import React from 'react'
import { Button, Heading, Pane, PlusIcon } from 'evergreen-ui'
import { AppPage } from './AppPage'
import { HotDogCards } from '../HotDogCards'
import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const ROLE_SORT_ORDER = [
  'president',
  'vice president',
  'secretary',
  'treasurer',
]

const sortRolesByImportance = (a, b) => {
  return ROLE_SORT_ORDER.indexOf(a) - ROLE_SORT_ORDER.indexOf(b)
}

export const OfficersPage = () => {

  const PEOPLE = [
    {
      name: 'Patrick Connolly',
      email: 'me@example.com',
      phone: '555-555-5555',
      address: '719 Bloor St W, Unit 117, Toronto, ON, Canada, M6G 1L5',
      roles: ['director', 'secretary', 'president'],
      is_resident: true,
    },{
      name: 'Jane Doe',
      email: 'me@example.com',
      phone: '555-555-5555',
      address: '719 Bloor St W, Unit 117, Toronto, ON, Canada, M6G 1L5',
      roles: ['director', 'president'],
      is_resident: false,
    },
  ]

  const getAllRoles = () => {
    return uniq(flatten(PEOPLE.map(p => p.roles))).sort(sortRolesByImportance)
  }

  const getAllOfficerRoles = () => {
    return getAllRoles().filter(r => r !== 'director')
  }

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
        {getAllOfficerRoles().map(roleName => (
          <React.Fragment key={roleName}>
            <Pane>
              <Heading is="h4" size={700}>
                {capitalize(roleName)}
              </Heading>
              <Pane>
                <HotDogCards />
              </Pane>
            </Pane>
            <hr style={{margin: '36px 0'}} />
          </React.Fragment>
        ))}
      </Pane>
    </AppPage>
  )
}