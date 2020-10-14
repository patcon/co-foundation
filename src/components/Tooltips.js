import React from 'react'
import {
  Button,
  Pane,
  Pill,
  Paragraph,
  Tooltip,
  majorScale
} from 'evergreen-ui'

export const HelpTooltip = props => {
  const { children, text, href } = props

  return (
    <Tooltip
      appearance="card"
      content={
        <Pane margin={majorScale(2)}>
            <Paragraph>{text}</Paragraph>
            <Button as="a" href={href} rel="noreferrer">Read More</Button>
        </Pane>
      }>
      { children }
    </Tooltip>
  )
}
  
export const PillHelpTooltip = props => {
  return (
    <HelpTooltip {...props}>
      <Pill display="inline-flex" margin={majorScale(1)}>?</Pill>
    </HelpTooltip>
  )
}