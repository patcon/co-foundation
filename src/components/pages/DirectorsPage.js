import React from 'react'
import { Button, Pane, PlusIcon } from 'evergreen-ui'
import { AppPage } from './AppPage'
import { HotDogCards } from './OfficersPage'

export const DirectorsPage = () => {
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