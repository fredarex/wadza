import { useState } from 'react'

const useSwitch = (initalState: boolean = false) => {
  const [value, setValue] = useState(initalState)

  const on = () => setValue(true)

  const off = () => setValue(false)

  const toggle = () => setValue((value) => !value)

  const set = (v: boolean) => setValue(v)
  
  return { value, true: on, false: off, toggle, set }
}

export default useSwitch
