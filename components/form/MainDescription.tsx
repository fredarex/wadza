import React from 'react'
import Image from 'next/image'
import { ICommonProps } from '../../types/types'
import InfoIcon from '../../assets/svg/info.svg'

interface IProps extends ICommonProps {
  description: string
  info?: boolean
}

const MainDescription = (props: IProps) => {
  const { className, description, info } = props

  return (
    <div className={`flex flex-row font-poppins-400 text-sm leading-[21px] ${className}`}>
      <span className='text-black-lighter inline'>
        {description}
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

export default MainDescription
