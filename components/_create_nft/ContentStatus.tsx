import React, { useState } from 'react'
import Image from 'next/image'
import { Switch } from '@headlessui/react'
import { IAttribute, ICommonProps } from '../../types/types'
import { MainDescription } from '../form'

interface IProps extends ICommonProps {
  attribute: IAttribute
  enabled: boolean
  onChange: () => void
}

const ContentStatus = (props: IProps) => {
  const { attribute, enabled, onChange, className } = props
  
  return (
    <div className={`flex flex-row justify-between pl-4 pr-[10px] py-[11px] border border-solid border-[rgba(139,110,174,0.33)] rounded-md mb-[13px] ${className}`}>
      <div className='flex flex-row'>
        <div className='mr-3'>
          <Image
            src={attribute.image}
            alt='attribut icon'
          />
        </div>
        <div className='flex flex-col text-sm text-black-lighter leading-[21px]'>
          <span className='font-poppins-600'>
            {attribute.name}
          </span>
          <MainDescription description={attribute.description} info={attribute.info} className='max-w-[260px] w-full mt-1' />
        </div>
      </div>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${enabled ? 'bg-[#C9B2E6]' : 'bg-[#D8CCE7]'}
          relative inline-flex items-center h-[23.68px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-[26.5px]' : 'translate-x-[1.5px]'}
            pointer-events-none inline-block h-[18.42px] w-[18.42px] transform rounded-full bg-purple-lighter shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}

export default ContentStatus
