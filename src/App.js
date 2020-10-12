import React, { useState } from 'react'
import fetch from 'node-fetch'
import {
  Button,
  ChevronLeftIcon,
  ErrorIcon,
  Heading,
  Icon,
  IconButton,
  LightbulbIcon,
  Link,
  ListItem,
  majorScale,
  Pane,
  Paragraph,
  Pill,
  SearchIcon,
  Select,
  Strong,
  Table,
  TableRow,
  Text,
  TextInput,
  TextInputField,
  TickCircleIcon,
  Tooltip,
  UnorderedList,
} from 'evergreen-ui'

const CountryButton = props => {
  const { onClick, flag, name } = props

  return (
    <Button onClick={onClick} height={majorScale(8)} paddingX={majorScale(1)} marginRight={majorScale(3)}>
      <Text width="100px">
        <Text fontSize={majorScale(3)}>{ flag }</Text><br />
        <Text fontWeight="600">{ name }</Text>
      </Text>
    </Button>
  )
}

const BackButton = props => {
  return (
    <IconButton
    { ...props }
    icon={ChevronLeftIcon}
    height={majorScale(4)}
    borderRadius={majorScale(2)}
    />
  )
}

const EmailInputField = () => (
  <TextInputField
    label="Email"
    placeholder="me@example.com"
  />
)

const WizardStep = props => {
  const {
    onBack,
    currentStep,
    step,
    heading,
    text,
    children,
  } = props

  if (currentStep !== step) {
    return null
  }

  return (
    <Pane paddingTop={majorScale(2)} display="flex" flexDirection="row">
      <Pane width={100} display="block">
        { step === '1-start'
          ? null
          : <BackButton
              marginRight={majorScale(2)}
              marginTop="-6px"
              float="right"
              onClick={onBack} /> }
      </Pane>
      <Pane>
        <Heading marginBottom={majorScale(5)}>{heading}</Heading>
        { text ? <Paragraph marginBottom={majorScale(6)}>{text}</Paragraph> : null }
        <Pane display="block">
          { children }
        </Pane>
      </Pane>
    </Pane>
  )
}

const HelpTooltip = props => {
  const { children, text, href } = props

  return (
    <Tooltip
      appearance="card"
      content={
        <Pane margin={majorScale(2)}>
            <Paragraph>{text}</Paragraph>
            <Button as="a" href={href}>Read More</Button>
        </Pane>
      }>
      { children }
    </Tooltip>
  )
}

const PillHelpTooltip = props => {
  return (
    <HelpTooltip {...props}>
      <Pill display="inline-flex" margin={majorScale(1)}>?</Pill>
    </HelpTooltip>
  )
}

const HelpBox = props => {
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

const ResultsContainer = props => {
  const { results } = props

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
            Is your company incorporated in Ontario?
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
            <Table.Cell paddingX="0" flex="0 0 auto"><Link href="#"><Strong>Select</Strong></Link></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </HelpBox>

  )
}

function App() {
  const COMPANY_NAME = 'Co-Foundation'
  const DEFAULT_PROVINCE = 'on'
  const AVAILABLE_PROVINCES = ['ab', 'bc', 'on']

  const [ currentStep, setCurrentStep ] = useState('1-start')
  const [ province, setProvince ] = useState(DEFAULT_PROVINCE)
  const [ company, setCompany ] = useState('')
  const [ companyResults, setCompanyResults ] = useState(null)

  const handleGoTo = (stepName) => {
    setCurrentStep(stepName)
    // Don't keep these between steps. Clear when going backwards.
    setCompanyResults(null)
  }

  const handleProvinceChange = (event) => {
    setProvince(event.target.value)
  }

  const handleProvinceNext = () => {
    if (AVAILABLE_PROVINCES.indexOf(province) > -1) {
      handleGoTo('3-new-or-existing')
    } else {
      handleGoTo('0-unavailable-canada')
    }
  }

  const handleCompanyChange = (event) => {
    setCompany(event.target.value)
  }

  const handleCompanySearch = async () => {
    if (company === '') {
      // TODO: replace this with field validation.
      setCompanyResults([])
    } else {
      const res = await fetch(
        `/api/searchCorporations?q=${company}&location=${province}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      const json = await res.json()
      setCompanyResults(json)
    }
  }

  return (
    <>
      <WizardStep
        step="1-start"
        heading="Country"
        text="Where is your business located?"
        currentStep={currentStep}
      >
        <CountryButton flag="🇨🇦" name="Canada"
          onClick={() => handleGoTo('2-pick-province')} />
        <CountryButton flag="🇺🇸" name="United States"
          onClick={() => handleGoTo('0-unavailable-usa')} />
      </WizardStep>
      <WizardStep
        step="0-unavailable-usa"
        heading="Come Back Soon"
        text={`${COMPANY_NAME} is only available for Canadian companies at this time.
          Leave us your email and we will update you once we launch
          in the US.`}
        currentStep={currentStep}
        onBack={() => handleGoTo('1-start')}
      >
        <EmailInputField />
        <Button appearance="primary">Send</Button>
      </WizardStep>
      <WizardStep
        step="2-pick-province"
        heading="Province"
        currentStep={currentStep}
        onBack={() => handleGoTo('1-start')}
      >
        <Pane>
          <Text>This company will be located in</Text>
          <Select marginLeft={majorScale(1)}
            value={province}
            onChange={handleProvinceChange}
          >
            <option value="ab">Alberta</option>
            <option value="bc">British Columbia</option>
            <option value="mb">Manitoba</option>
            <option value="nb">New Brunswick</option>
            <option value="nl">Newfoundland and Labrador</option>
            <option value="nt">Northwest Territories</option>
            <option value="ns">Nove Scotia</option>
            <option value="nu">Nunavut</option>
            <option value="on">Ontario</option>
            <option value="pe">Prince Edward Island</option>
            <option value="qc">Quebec</option>
            <option value="sk">Saskatchewan</option>
            <option value="yt">Yukon</option>
          </Select>
        </Pane>
        <Button marginTop={majorScale(4)} appearance="primary" onClick={() => handleProvinceNext()}>Next</Button>
      </WizardStep>
      <WizardStep
        step="0-unavailable-canada"
        heading="Come Back Soon"
        text={`${COMPANY_NAME} is not currently available in your province, at this time.
          Leave us your email and we will update you once we launch
          in your province.`}
        currentStep={currentStep}
        onBack={() => handleGoTo('2-pick-province')}
      >
        <EmailInputField />
        <Button appearance="primary">Send</Button>
      </WizardStep>
      <WizardStep
        step="3-new-or-existing"
        heading="Business State"
        text="Are you incorporating a new business or onboarding an existing one?"
        currentStep={currentStep}
        onBack={() => handleGoTo('2-pick-province')}
      >
        <Button onClick={() => handleGoTo('4-new')}>New</Button>
        <Button marginLeft={majorScale(3)} onClick={() => handleGoTo('4-existing')}>Existing</Button>
      </WizardStep>
      <WizardStep
        step="4-new"
        heading="About your company"
        currentStep={currentStep}
        onBack={() => handleGoTo('3-new-or-existing')}
      >
        <Pane>
          <Text>I want a</Text>
          <Select marginX={majorScale(1)}>
            <option value="named">Named</option>
            <option value="numbered">Numbered</option>
          </Select>
          <Text>company</Text>
          <PillHelpTooltip
            text="Both named and numbered companies are legal.
            A numbered company may be required to register its
            operating name in certain circumstances."
            href="#"
            />
        </Pane>
        <Pane>
          <Text>My company will be called</Text>
          <TextInput
            marginLeft={majorScale(1)}
            placeholder="Company Name" />
          <Select marginLeft={majorScale(1)}>
            <option value="inc">Inc.</option>
            <option value="ltd">Ltd.</option>
            <option value="corp">Corp.</option>
            <option value="limited">Limited</option>
          </Select>
          <PillHelpTooltip
            text="Your corporate name requires a legal ending (like Inc. or Ltd.).
            The ending has no legal consequences.
            You can choose whichever you prefer."
            href="#"
            />
        </Pane>
        <HelpBox
          type="info"
          heading="Requirements"
        >
          <Paragraph>
            The Company’s name must be unique and must contain a 
            <HelpTooltip href="#"
              text="The Distinctive element is the word that promotes your corporation’s brand. For example “Rhino Sandwiches Inc.“">
              <Strong> Distinctive </Strong>
            </HelpTooltip>
            element and a 
            <HelpTooltip href="#"
              text="The Descriptive element is the word that describes the nature of your business. For example “Rhino Sandwiches Inc.“">
              <Strong> Descriptive </Strong>
            </HelpTooltip>
            element. The name can’t be profane and must conform to legal requirements.
          </Paragraph>
          <Link href="#">Read More</Link>
        </HelpBox>
        <Button marginTop={majorScale(4)} appearance="primary" onClick={null}>Submit</Button>
      </WizardStep>
      <WizardStep
        step="4-existing"
        heading="Company Search"
        currentStep={currentStep}
        onBack={() => handleGoTo('3-new-or-existing')}
      >
        <Text marginRight={majorScale(1)}>My company is called</Text>
        <TextInput
          onChange={handleCompanyChange}
          marginRight={majorScale(1)}
          placeholder="Company Name or Number"
          />
        <Button iconBefore={SearchIcon} onClick={handleCompanySearch}>Search</Button>
        <ResultsContainer results={companyResults} />
      </WizardStep>
    </>
  )
}

export default App;
