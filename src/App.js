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
  Select,
  Text,
  TextInput,
  TextInputField,
  Tooltip,
} from 'evergreen-ui'

const CountryButton = props => {
  const { onClick, flag, name } = props

  return (
    <Button onClick={onClick} height={majorScale(8)} paddingX={majorScale(1)}>
      <Text width="100px">
        <Text fontSize={majorScale(3)}>{ flag }</Text><br />
        <Text fontWeight="600">{ name }</Text>
      </Text>
    </Button>
  )
}

const BackButton = () => (
  <IconButton icon={ChevronLeftIcon} height={majorScale(4)} borderRadius={majorScale(2)} />
)

const EmailInputField = () => (
  <TextInputField
    label="Email"
    placeholder="me@example.com"
  />
)

const WizardStep = props => {
  const { onBack, currentStep, step, children } = props
  if (currentStep !== step) {
    return null
  }

  return (
    <Pane display="flex" flexDirection="row">
      <Pane width={100} display="flex">
        { step === 1 ? null : <BackButton onClick={onBack} /> }
      </Pane>
      <Pane>
        { children }
      </Pane>
    </Pane>
  )
}

function App() {
  const [ currentStep, setCurrentStep ] = useState(1)

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <>
      <WizardStep step={1} currentStep={currentStep} onBack={handleBack}>
        <Heading>Country</Heading>
        <Text>Where is your business located?</Text>
        <Pane>
          <CountryButton flag="🇨🇦" name="Canada" onClick={handleNext} />
          <CountryButton flag="🇺🇸" name="United States" />
        </Pane>
      </WizardStep>
      <WizardStep currentStep={currentStep} onBack={handleBack}>
        <Heading>Come Back Soon</Heading>
        <Text>Founded is only available for Canadian companies at this time. Leave us your email and we will update you once we launch in the US.</Text>
        <EmailInputField />
        <Button>Send</Button>
      </WizardStep>
      <WizardStep step={2} currentStep={currentStep} onBack={handleBack}>
        <Heading>Province</Heading>
        <Text>This company will be located in</Text>
        <Select defaultValue="on">
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
        <Button onClick={handleNext}>Next</Button>
      </WizardStep>
      <WizardStep currentStep={currentStep} onBack={handleBack}>
        <Heading>Come Back Soon</Heading>
        <Text>Founded is not currently available in your province, at this time. Leave us your email and we will update you once we launch in your province.</Text>
        <EmailInputField />
        <Button>Send</Button>
      </WizardStep>
      <WizardStep step={3} currentStep={currentStep} onBack={handleBack}>
        <Heading>Business State</Heading>
        <Text>Are you incorporating a new business or onboarding an existing one?</Text>
        <Button onClick={handleNext}>New</Button>
        <Button onClick={handleNext}>Existing</Button>
      </WizardStep>
      <WizardStep step={4} currentStep={currentStep} onBack={handleBack}>
        <Heading>About your company</Heading>
        <Text>I want a</Text>
        <Select>
          <option value="named">Named</option>
          <option value="numbered">Numbered</option>
        </Select>
        <Text>company</Text>
        <Tooltip
          appearance="card"
          content={
            <Pane margin={majorScale(2)}>
                <Paragraph>
                Both named and numbered companies are legal. A numbered company may be required to register its operating name in certain circumstances.
                </Paragraph>
                <Button>Read More</Button>
            </Pane>
          }>
          <Pill display="inline-flex" margin={majorScale(1)}>?</Pill>
        </Tooltip>
        <Text>My company will be called</Text>
        <TextInput
          placeholder="Company Name" />
        <Select>
          <option value="inc">Inc.</option>
          <option value="ltd">Ltd.</option>
          <option value="corp">Corp.</option>
          <option value="limited">Limited</option>
        </Select>
        <Tooltip
          appearance="card"
          content={
            <Pane margin={majorScale(2)}>
                <Paragraph>
                  Your corporate name requires a legal ending (like Inc. or Ltd.). The ending has no legal consequences. You can choose whichever you prefer.
                </Paragraph>
                <Button>Read More</Button>
            </Pane>
          }>
          <Pill display="inline-flex" margin={majorScale(1)}>?</Pill>
        </Tooltip>
        <Button onClick={handleNext}>Submit</Button>
      </WizardStep>
      <WizardStep step={5} currentStep={currentStep} onBack={handleBack}>
        <Heading>Company Search</Heading>
        <Text>My company is called</Text>
        <TextInput
          placeholder="Company Name or Number"
          />
        <Button onClick={handleNext}>Search</Button>
      </WizardStep>
    </>
  )
}

export default App;
