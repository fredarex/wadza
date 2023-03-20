import React from 'react'
import Image from 'next/image'
import { ICommonProps } from '../../types/types'
import InfoIcon from '../../assets/svg/info.svg'

interface IProps extends ICommonProps {
  label: string
  required?: boolean
  info?: boolean
}

const MainLabel = (props: IProps) => {
  const { className, label, required, info } = props

  return (
    <div className='flex flex-row font-poppins-600 text-[22px] leading-[98.3%]'>
      <span className='text-black-lighter inline'>
        {label}
        {required && <span className='text-[#DB5C5C]'>
          &nbsp;*
        </span>}
        {info && (
          <Image
            src={InfoIcon}
            alt='info'
            className='ml-2 cursor-pointer inline'
          />
        )}
      </span>
    </div>
  )
}

export default MainLabel
