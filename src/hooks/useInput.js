import { useState } from 'react'

export default function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: e => {
        setValue(e.target.value)
      }
    }
  }
}