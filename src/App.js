import React, { useState } from 'react';
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
  Text,
  TextInput,
  TextInputField,
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
  const { children, text } = props

  return (
    <Tooltip
      appearance="card"
      content={
        <Pane margin={majorScale(2)}>
            <Paragraph>{text}</Paragraph>
            <Button as="a" href="#">Read More</Button>
        </Pane>
      }>
      { children }
    </Tooltip>
  )
}

const PillHelpTooltip = props => {
  const { text } = props

  return (
    <HelpTooltip text={text}>
      <Pill display="inline-flex" margin={majorScale(1)}>?</Pill>
    </HelpTooltip>
  )
}

const ResultsContainer = props => {
  const { heading, results } = props

  if (results === null) {
    return null
  }

  const NoResults = () => (
    <>
      <Icon icon={ErrorIcon} size="20px" marginRight={majorScale(1)} />
      <Pane>
        <Strong>Sorry, we couldn't find a company under that name or number</Strong>
        <Pane>
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
        </Pane>
      </Pane>
    </>
  )

  const ListResults = () => (
    <>
      <Icon icon={LightbulbIcon} size="20px" marginRight={majorScale(1)} />
      <Pane width="100%">
        <Strong>We Found Your Company</Strong>
        <Table>
          <Table.Body>
            { results.map((r) => (
              <Table.Row paddingY={majorScale(1)} width="100%">
                <Table.Cell paddingRight="0" paddingRight={majorScale(2)}><Text size="400">{r.name}</Text></Table.Cell>
                <Table.Cell paddingX="0" flex="0 0 auto"><Link href="#"><Strong>Select</Strong></Link></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Pane>
    </>
  )

  return (
    <Pane
      marginTop={majorScale(3)}
      paddingX={majorScale(3)}
      paddingY={majorScale(2)}
      elevation="1"
      display="flex"
    >
      { results.length > 0 ? <ListResults /> : <NoResults /> }
    </Pane>
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

  const handleCompanySearch = () => {
    if (company === '') {
      setCompanyResults([])
    } else {
      setCompanyResults([{ name: company }])
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
            />
        </Pane>
        <Pane display="flex" alignItems="center">
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
            />
        </Pane>
        <Button appearance="primary" onClick={null}>Submit</Button>
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
