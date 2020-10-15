import React from 'react'
import {
  Dialog,
  UnorderedList,
  Link,
  ListItem,
  Table,
  Text,
  Strong,
  Pane,
  Heading,
  Paragraph,
  majorScale,
} from 'evergreen-ui'
import { getProvinceByCode } from '../utils'
import { HelpBox } from './HelpBox'
import { PillHelpTooltip } from './Tooltips'
import useToggle from '../hooks/useToggle'

const OnboardingConfirmationDialog = props => {
  const { isShown, handleClose, handleConfirm } = props

  return (
    <Dialog
      isShown={isShown}
      title="Confirm Selection"
      onCloseComplete={handleClose}
      onConfirm={handleConfirm}
      cancelLabel="Close"
    >
      <Pane marginX={majorScale(1)}>
        <Paragraph>Please confirm that this is your company.</Paragraph>
        <Pane>
          <Pane
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            elevation={1}
            marginTop={majorScale(3)}
            padding={majorScale(3)}
          >
            <Pane>
              <Heading as="h4" textTransform="uppercase">Company Name</Heading>
              <Strong>Any Company</Strong>
            </Pane>
            <Pane>
              <Heading as="h4" textTransform="uppercase">Corporate Number</Heading>
              <Strong>000000000</Strong>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
    </Dialog>
  )
}

export const ResultsContainer = props => {
  const { results, province } = props

  const [ showDialog, toggleShowDialog ] = useToggle()

  const handleToggleDialog = e => {
    toggleShowDialog()
  }

  if (results === null) {
    return null
  }

  if (results.length === 0) {
    return (
      <HelpBox type="error"
        heading="Sorry, we couldn't find a company under that name or number"
      >
        <UnorderedList>
          <ListItem>
            Double check that the name or number of your company is correct.
          </ListItem>
          <ListItem>
            Is your company incorporated in {getProvinceByCode(province).name}?
            <PillHelpTooltip
              text="Your company must be either a provincial Ontario corporation
                or a Federal corporation extra provincially registered in Ontario." />
          </ListItem>
          <ListItem>
          Are you a for-profit company provincially incorporated under the
            Ontario Business Corporations Act (BCA) or
            Canada Business Corporations Act (CBCA)? <Link href="#">Why that matters?</Link>
          </ListItem>
        </UnorderedList>
      </HelpBox>
    )
  }

  return (
    <HelpBox type="info"
      heading="We Found Your Company"
    >
      <Table.Body>
        { results.map(r => (
          <Table.Row key={r.number} paddingY={majorScale(1)} width="100%">
            <Table.Cell paddingLeft="0" paddingRight={majorScale(2)}><Text size={400}>{r.name}</Text></Table.Cell>
            <Table.Cell paddingX="0" flex="0 0 auto"><Link cursor="pointer" onClick={handleToggleDialog}><Strong>Select</Strong></Link></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <OnboardingConfirmationDialog
        isShown={showDialog}
        handleClose={handleToggleDialog}
        handleConfirm={() => null}
      />
    </HelpBox>
  )
}