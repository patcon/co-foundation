import React from 'react'
import { Select, TextInputField } from 'evergreen-ui'
import { PROVINCE_DATA } from '../constants'

export const EmailInputField = props => (
  <TextInputField
    {...props}
    label="Email"
    placeholder="me@example.com"
  />
)

export const ProvinceSelect = props => (
  <Select {...props}>
    { PROVINCE_DATA.map(p => (
      <option key={p.code} value={p.code}>{p.name}</option>
    ))}
  </Select>
)