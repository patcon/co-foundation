import React, { useState } from 'react';
import {
  Button,
  ChevronLeftIcon,
  Heading,
  IconButton,
  majorScale,
  Pane,
  Paragraph,
  Pill,
  SearchIcon,
  Select,
  Text,
  TextInput,
  TextInputField,
  Tooltip,
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

const BackButton = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    icon={ChevronLeftIcon}
    height={majorScale(4)}
    borderRadius={majorScale(2)}
  />
)

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
    <Pane display="flex" flexDirection="row">
      <Pane width={100} display="flex">
        { step === 1 ? null : <BackButton onClick={onBack} /> }
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
  const { text } = props

  return (
    <Tooltip
      appearance="card"
      content={
        <Pane margin={majorScale(2)}>
            <Paragraph>{text}</Paragraph>
            <Button as="a" href="#">Read More</Button>
        </Pane>
      }>
      <Pill display="inline-flex" margin={majorScale(1)}>?</Pill>
    </Tooltip>
  )
}

function App() {
  const DEFAULT_PROVINCE = 'on'

  const [ currentStep, setCurrentStep ] = useState('1-start')
  const [ province, setProvince ] = useState(DEFAULT_PROVINCE)

  const handleGoTo = (stepName) => {
    setCurrentStep(stepName)
  }

  const handleProvinceChange = (e) => {
    setProvince(e.target.value)
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
        text="Founded is only available for Canadian companies at this time.
          Leave us your email and we will update you once we launch
          in the US."
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
            <option value="nw">Northwest Territories</option>
            <option value="ns">Nove Scotia</option>
            <option value="nu">Nunavut</option>
            <option value="on">Ontario</option>
            <option value="pe">Prince Edward Island</option>
            <option value="pq">Quebec</option>
            <option value="sk">Saskatchewan</option>
            <option value="yk">Yukon</option>
          </Select>
        </Pane>
        <Button appearance="primary" onClick={() => handleGoTo('3-new-or-existing')}>Next</Button>
      </WizardStep>
      <WizardStep
        step="0-unavailable-canada"
        header="Come Back Soon"
        text="Founded is not currently available in your province, at this time.
          Leave us your email and we will update you once we launch
          in your province."
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
          <HelpTooltip
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
          <HelpTooltip
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
          marginRight={majorScale(1)}
          placeholder="Company Name or Number"
          />
        <Button iconBefore={SearchIcon} onClick={null}>Search</Button>
      </WizardStep>
    </>
  )
}

export default App;
