import React from 'react'
import { Link, Pane, Paragraph, Text, majorScale, minorScale, ChevronDownIcon } from 'evergreen-ui'
import useToggle from '../hooks/useToggle'
import AnimateHeight from 'react-animate-height'

export const HotDogCards = () => (
  <>
    <Pane>
      <Text>Name</Text>
    </Pane>
    <Pane>
      <HotDogCard />
    </Pane>
  </>
)

export const HotDogCard = () => {
  const [ isOpen, toggleOpen ] = useToggle()
  const role = 'President'
  const otherRoles = ['Director', 'Shareholder', 'Secretary']

  return (
    <Pane>
      <Pane alignItems="center" zIndex={999} position="relative" display="flex" cursor="pointer" padding={minorScale(3)} elevation={2} onClick={() => toggleOpen()}>
        <Pane width="100%">
          <Text size={600}>Patrick Connolly</Text>
        </Pane>
        <Pane>
          <ChevronDownIcon
            size={24}
            transform={`rotate(${isOpen ? 180 : 0}deg)`}
            transition="transform 0.5s" />
        </Pane>
      </Pane>
      <AnimateHeight
        height={isOpen ? 'auto' : 0}
      >
        <Pane elevation={1} background="tint2" marginX={majorScale(1)}>
          <Pane
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            marginX={majorScale(3)}
            height={majorScale(6)}
          >
            <Pane>
              <Link marginLeft={majorScale(3)} cursor="pointer">Edit Contact Info</Link>
              <Link marginLeft={majorScale(3)} cursor="pointer">Remove</Link>
              <Link marginLeft={majorScale(3)} cursor="not-allowed">Replace</Link>
            </Pane>
          </Pane>
          <Pane padding={majorScale(3)}>
            <Pane>
              <Pane marginBottom={majorScale(3)}>
                <Text>
                  This {role} in also a {otherRoles.join(', ')}.
                </Text>
              </Pane>
              <Pane>
                <Paragraph>me@example.com</Paragraph>
                <Paragraph>555-555-5555</Paragraph>
                <Paragraph>123 Any Street, Unit 3, Anytown, ON, Canada, H0H 0H0</Paragraph>
              </Pane>
            </Pane>
            <Paragraph textAlign="right">Canadian Resident</Paragraph>
          </Pane>
        </Pane>
      </AnimateHeight>
    </Pane>
  )
}