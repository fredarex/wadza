import React from 'react'
import { ICommonProps, IMockCategory } from '../../types/types'

interface IProps extends ICommonProps {
  category: IMockCategory
  selected: boolean
  onClick: (tab: string) => void
}

const TabItem = (props: IProps) => {
  const { category, selected, className, onClick } = props

  return (
    <div onClick={() => onClick(category.value)} className={`relative flex flex-row justify-center items-center group h-full cursor-pointer ${className}`}>
      <h4 className={`${selected? 'font-poppins-700' : 'font-poppins-400'} text-sm leading-[98.3%]`}>
        {category.label}
      </h4>
      <span className={`absolute ${selected? 'block' : 'hidden'} bottom-0 w-full h-1 rounded-t-[3px] bg-purple-lighter group-hover:block`}></span>
    </div>
  )
}

export default TabItem
