import React from 'react'
import { ICommonProps, INftAttributeData } from '../../../types/types'

interface IProps extends ICommonProps {
  property: INftAttributeData
}

const PropertyItem = (props: IProps) => {
  const { property, className } = props

  return (
    <section className={`flex flex-col justify-center w-full h-[52px] bg-[#E2DCEA] border hover:border hover:border-solid hover:border-[rgba(139,110,174,0.33)] font-poppins-700 text-xs leading-[98.3%] pl-[17px] mb-[7px] rounded-[3px] ${className}`}>
      <span className='text-purple-lighter'>
        {property.trait_type}
      </span>
      <span className='text-black mt-1'>
        {property.value}
      </span>
    </section>
  )
}

export default PropertyItem
