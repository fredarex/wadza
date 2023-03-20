import { Switch } from '@headlessui/react'
import React from 'react'
import { ICommonProps } from '../../../types/types'

interface IProps extends ICommonProps {
  label: string
  description?: string
  checked: boolean
  onChange: () => void
}

const styles = {
  switch: 'relative inline-flex items-center h-[23.68px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
  explicitSwitchHandle: 'pointer-events-none inline-block h-[18.42px] w-[18.42px] transform rounded-full bg-purple-lighter shadow-lg ring-0 transition duration-200 ease-in-out',
}

const MoreOption = (props: IProps) => {
  const { label, description, checked, onChange, className } = props

  return (
    <div className={`flex flex-col w-full border border-solid border-[#D7CDE5] rounded-[15px] pl-[22px] pr-[19px] py-5 ${className}`}>
      <div className='flex flex-row justify-between items-center'>
        <h3 className='font-poppins-700 text-base text-black leading-[98.3%]'>
          {label}
        </h3>
        <Switch
          checked={checked}
          onChange={onChange}
          className={`${checked ? 'bg-[#C9B2E6]' : 'bg-[#D8CCE7]'} ${styles.switch}`}
        >
          <span
            aria-hidden="true"
            className={`${checked ? 'translate-x-[26.5px]' : 'translate-x-[1.5px]'} ${styles.explicitSwitchHandle}`}
          />
        </Switch>
      </div>
      {description && <div className=''>
        <h3 className='font-poppins-400 text-base text-black leading-[98.3%]'>
          {description}
        </h3>
      </div>}
    </div>
  )
}

export default MoreOption
