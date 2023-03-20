import React from 'react'
import { ICommonProps } from '../../../types/types'

interface IProps extends ICommonProps {
  children?: any,
  label: string
}

const NftDetailItem = (props: IProps) => {
  const { children, label, className } = props
  return (
    <div className={`flex flex-row justify-between items-center max-w-[441px] w-full h-8 bg-[#E2DCEA] px-[22px] py-[10px] mb-1 rounded-[3px] ${className}`}>
      <h4 className='font-poppins-700 text-xs text-black leading-[98.3%]'>
        {label}
      </h4>
      {children}
    </div>
  )
}

export default NftDetailItem
