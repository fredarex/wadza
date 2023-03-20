import React from 'react'
import { ISvgIconProps } from '../../../types/types'

const Vector4SvgIcon = (props: ISvgIconProps) => {
  const { color = 'white', width = 119, height = 227 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 119 227" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M118 1C79 21.6429 1 95.7431 1 227" stroke={color} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="10 10" />
    </svg>    
  )
}

export default Vector4SvgIcon
