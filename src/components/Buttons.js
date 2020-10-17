import React from 'react'
import {
  Button,
  IconButton,
  Text,
  majorScale,
} from 'evergreen-ui'
import {
  ChevronLeftIcon,
} from 'evergreen-ui'
import useToggle from '../hooks/useToggle'

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

const FakeLoadButton = props => {
  const { onComplete } = props
  const [ isLoading, toggleLoading ] = useToggle(false)

  const handleClick = () => {
    toggleLoading()
    setTimeout(() => {
      if (typeof onComplete == 'function') {
        onComplete()
      }
      toggleLoading()
    }, 1000)
  }

  return (
    <Button {...props} isLoading={isLoading} onClick={handleClick} />
  )
}

export {
  BackButton,
  CountryButton,
  FakeLoadButton,
}