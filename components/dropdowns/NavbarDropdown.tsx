import React from 'react'
import { Transition } from '@headlessui/react'
import { ICommonProps } from '../../types/types'

interface IProps extends ICommonProps {
  show: boolean
  children?: any
}

const NavbarDropdown = (props: IProps) => {
  const { show, children } = props
  return (
    <Transition
      as={React.Fragment}
      enter='transition ease-out duration-300'
      enterFrom='transform opacity-0 scale-90'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-300'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-90'
      show={show}
    >
      {children}
    </Transition>
  )
}

export default NavbarDropdown
