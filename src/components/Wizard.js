import React, { useState } from 'react'
import fetch from 'node-fetch'
import {
  Button,
  Heading,
  Link,
  majorScale,
  Pane,
  Paragraph,
  SearchIcon,
  Select,
  Strong,
  Text,
  TextInput,
} from 'evergreen-ui'
import { EmailInputField, ProvinceSelect } from './InputFields'
import { BackButton, CountryButton, FakeLoadButton } from './Buttons'
import { HelpTooltip, PillHelpTooltip } from './Tooltips'
import {
  DEFAULT_PROVINCE,
  AVAILABLE_PROVINCES,
  COMPANY_NAME,
} from '../constants'
import { HelpBox } from './HelpBox'
import { ResultsContainer } from './ResultsContainer'
import useToggle from '../hooks/useToggle'
import useInput from '../hooks/useInput'

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

const EmailSubscriptionForm = props => {
  const {
    country = '',
    region = ''
  } = props
  const [ isSubmitted, setIsSubmitted ] = useState(false)
  const { value:email, bind:bindEmail } = useInput('')

  const createSubscription = async (email, country, region) => {
    try {
      const res = await fetch('/api/v1/public/notify', {
        method: 'POST',
        body: JSON.stringify({ email, country, region }),
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createSubscription(email, country, region)
    console.log(`subscribed ${email} to email type: ${country} ${region}`)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return <Paragraph>Thank you! We'll send you an email when we announce expansion into your region.</Paragraph>
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <EmailInputField {...bindEmail} />
        <Button appearance="primary">Send</Button>
      </form>
    )
  }
}

export const Wizard = () => {
  const [ currentStep, setCurrentStep ] = useState('1-start')
  const [ province, setProvince ] = useState(DEFAULT_PROVINCE)
  const [ company, setCompany ] = useState('')
  const [ companyResults, setCompanyResults ] = useState(null)
  const [ isLoading, toggleIsLoading ] = useToggle()

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
      toggleIsLoading()
      const res = await fetch(
        `/api/v1/companies/search?q=${company}&location=${province}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      const json = await res.json()
      setCompanyResults(json)
      toggleIsLoading()
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
        <EmailSubscriptionForm country="usa" />
      </WizardStep>
      <WizardStep
        step="2-pick-province"
        heading="Province"
        currentStep={currentStep}
        onBack={() => handleGoTo('1-start')}
      >
        <Pane>
          <Text>This company will be located in</Text>
          <ProvinceSelect
            marginLeft={majorScale(1)}
            value={province}
            onChange={handleProvinceChange}
          />
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
        <EmailSubscriptionForm country="canada" region={province} />
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
        <form>
          <Text marginRight={majorScale(1)}>My company is called</Text>
          <TextInput
            onChange={handleCompanyChange}
            marginRight={majorScale(1)}
            placeholder="Company Name or Number"
            />
          <Button iconBefore={SearchIcon} onClick={handleCompanySearch} isLoading={isLoading}>Search</Button>
        </form>
        <ResultsContainer
          results={companyResults}
          province={province}
        />
      </WizardStep>
    </>
  )
}
