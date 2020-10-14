import React from 'react'
import {
  ErrorIcon,
  Icon,
  LightbulbIcon,
  Link,
  majorScale,
  Pane,
  Paragraph,
  Strong,
  Table,
  TickCircleIcon,
} from 'evergreen-ui'

export const HelpBox = props => {
  const { type, children, heading } = props
  const ICON_TYPES = {
    'info': LightbulbIcon,
    'error': ErrorIcon,
    'success': TickCircleIcon,
  }

  return (
    <Pane
    marginTop={majorScale(3)}
    paddingX={majorScale(3)}
    paddingY={majorScale(2)}
    elevation={1}
    display="flex"
  >
    <Icon icon={ICON_TYPES[type]} size={20} marginRight={majorScale(1)} />
    <Pane width="100%">
      <Strong>{ heading }</Strong>
      <Pane>
        { children }
      </Pane>
    </Pane>
  </Pane>
  )
}

const ConfirmedHelpBox = () => (
  <HelpBox type="success" heading="Confirmed">
    <Paragraph>
      Your name satisfies all legal requirements and has passed preliminary naming search tests.
    </Paragraph>
  </HelpBox>
)

const ErrorHelpBox = () => (
  <HelpBox type="error" heading="Error">
    <Paragraph>
      <Strong>There is an exact match for this name and it may already be in use.</Strong> Choose a more unique name.
    </Paragraph>
    <Link href="#">I have already reserved/registered this name</Link>
  </HelpBox>
)

const WarningHelpBox = props => {
  const { results } = props

  return (
    <HelpBox type="error" heading="Warning">
      <Paragraph>
        <Strong>Your proposed name is very similar to an existing corporate name. </Strong>
        Try to choose a more unique name. You may proceed,
        but if your name is too similar to an existing name,
        you may be required to change your name and incur additional fees.
      </Paragraph>
      <Table>
        <Table.Head>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
        </Table.Head>
        <Table.Body>
          { results.map(r => (
            <Table.Row key={r.number}>
              <Table.Cell>{ r.name }</Table.Cell>
              <Table.Cell>{ r.jurisdiction }</Table.Cell>
              <Table.Cell>{ r.date }</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Link href="#">View More Companies</Link>
    </HelpBox>
  )
}