import React from 'react'
import { ISvgIconProps } from '../../../types/types'

const Vector5SvgIcon = (props: ISvgIconProps) => {
  const { color = 'white', width = 227, height = 119 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 227 119" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.999995 0.999998C21.6429 40 95.7431 118 227 118" stroke={color} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="10 10" />
    </svg>        
  )
}

export default Vector5SvgIcon
