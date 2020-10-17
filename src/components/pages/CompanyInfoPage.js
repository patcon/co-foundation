import React from 'react'
import { AppPage } from './AppPage'
import { Heading, Link, Pane, Paragraph, SelectField, majorScale } from 'evergreen-ui'
import { FakeLoadButton } from '../Buttons'
import useToggle from '../../hooks/useToggle'

const FormattedAddress = props => {
  const { street1, street2, city, region, country, postalCode } = props
  return (
    <>
      <Paragraph>{street1}</Paragraph>
      {street2
        ? <Paragraph>{street2}</Paragraph>
        : null
      }
      <Paragraph>{city}, {region}</Paragraph>
      <Paragraph>{country}</Paragraph>
      <Paragraph>{postalCode}</Paragraph>
    </>
  )
}
FormattedAddress.defaultProps = {
  street1: '',
  street2: '',
  city: '',
  region: '',
  country: 'Canada',
  postalCode: ''
}

export const OrganizationInfoView = props => {
  const { jurisdiction, yearEndMonth } = props

  return (
    <Pane display="flex">
      <InfoGroup
        heading="Jurisdiction of Incorporation"
        content={jurisdiction} />
      <InfoGroup
        heading="Fiscal Year End"
        content={`Last day of ${yearEndMonth}`} />
    </Pane>
  )
}

export const InfoGroup = props => {
  const { heading, content } = props

  return (
    <Pane marginBottom={majorScale(3)} marginRight={majorScale(6)}>
      <Heading fontStyle="italic" is="h6">{heading}</Heading>
      <Paragraph>{content}</Paragraph>
  </Pane>
  )
}

const MonthSelectField = props => {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return (
    <SelectField {...props}>
      {MONTHS.map((month, idx) => (
        <option key={month} value={month}>{month}</option>
      ))}
    </SelectField>
  )
}

export const OrganizationInfoEdit = props => {
  const { jurisdiction, yearEndMonth } = props

  return (
    <Pane display="flex">
      <InfoGroup
        heading="Jurisdiction of Incorporation"
        content={jurisdiction} />
      <MonthSelectField label="Fiscal Year End" value={yearEndMonth} />
    </Pane>
  )
}

export const CompanyInfoBox = props => {
  const { title, isEditable, editLabel, editLinkOverride, children, renderEdit } = props
  const [ isEditing, toggleEditing ] = useToggle(false)
  return (
    <Pane padding={majorScale(3)} marginBottom={majorScale(3)} elevation={1}>
      <Pane minHeight={majorScale(4)} display="flex" justifyContent="space-between">
        <Heading size={700} is="h2" marginBottom={majorScale(3)}>{title}</Heading>
        {isEditable
          ? isEditing
            ? <Pane>
                <Link cursor="pointer" onClick={() => toggleEditing()} marginRight={majorScale(2)}>Cancel</Link>
                <FakeLoadButton onComplete={() => toggleEditing()} textTransform="uppercase" appearance="primary">
                  Save Changes
                </FakeLoadButton>
              </Pane>
            : !editLinkOverride
              ? <Link cursor="pointer" onClick={() => toggleEditing()}>{editLabel}</Link>
              : <Link href={editLinkOverride}>{editLabel}</Link>
          : null
        }
      </Pane>
      <Pane>
        {isEditing
          ? renderEdit
          : children
        }
      </Pane>
    </Pane>
  )
}
CompanyInfoBox.defaultProps = {
  title: '  ',
  isEditable: false,
  isEditMode: false,
  editLabel: 'Edit Details',
  editLinkOverride: '',
}

export const CompanyInfoPage = () => {
  return (
    <AppPage
      title="Company Info"
      byline="Company Information contains the registration information and other key details on the corporation."
    >
      <CompanyInfoBox
        title="Company Name"
        isEditable={true}
        editLinkOverride="#"
        editLabel="Change Name"
      >
        <Paragraph>Sunday Flowers Inc.</Paragraph>
      </CompanyInfoBox>
      <CompanyInfoBox
        title="Registered Head Office"
        isEditable={true}
        editLabel="Change Address"
      >
        <FormattedAddress
          street1="719 Bloor St W"
          city="Toronto"
          region="ON"
          postalCode="M6G 1L5"
        />
      </CompanyInfoBox>
      <CompanyInfoBox
        title="Organization Information"
        isEditable={true}
        renderEdit={<OrganizationInfoEdit
          jurisdiction="Federal Canadian"
          yearEndMonth="July"
        />}
      >
        <OrganizationInfoView
          jurisdiction="Federal Canadian"
          yearEndMonth="July"
        />
      </CompanyInfoBox>
      <CompanyInfoBox
        title="Extra Information"
        isEditable={true} />
      <CompanyInfoBox
        title="Individuals with Significant Control"
        isEditable={true} />
    </AppPage>
  )
}