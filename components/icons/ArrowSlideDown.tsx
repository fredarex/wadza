import React from 'react'
import { ISvgIconProps } from '../../types/types'

const ArrowSlideDownSvgIcon = (props: ISvgIconProps) => {
  const { color = '#DB5C5C', width = 12, height = 12 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.2583 9.03919L10.2583 4.61639C10.2583 4.14008 10.6445 3.75395 11.1208 3.75395C11.5971 3.75395 11.9832 4.14008 11.9832 4.61639L11.9832 11.1213C11.9832 11.5976 11.5971 11.9837 11.1208 11.9837L4.61587 11.9837C4.13956 11.9837 3.75343 11.5976 3.75343 11.1213C3.75343 10.645 4.13956 10.2589 4.61587 10.2589H9.03867L1.16014 2.38033C0.823337 2.04353 0.823337 1.49746 1.16014 1.16066C1.49694 0.823858 2.04301 0.823859 2.37981 1.16066L10.2583 9.03919Z" fill={color} />
    </svg>    
  )
}

export default ArrowSlideDownSvgIcon
