import React from 'react'
import { Button, Heading, Link, Pane, Paragraph, PlusIcon, Text, majorScale } from 'evergreen-ui'
import { AppPage } from './AppPage'

export const HotDogCards = () => (
  <>
    <Pane>
      <Text>Name</Text>
    </Pane>
    <Pane>
      <HotDogCard />
    </Pane>
  </>
)

export const HotDogCard = () => {
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

export const OfficersPage = () => {
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