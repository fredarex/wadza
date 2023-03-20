import React from 'react'
import { ISvgIconProps } from '../../types/types'

const ThreeHorizontalSvgIcon = (props: ISvgIconProps) => {
  const { color = '#424242', width = 12, height = 4 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 0.875C0.87868 0.875 0.375 1.37868 0.375 2C0.375 2.62132 0.87868 3.125 1.5 3.125C2.12132 3.125 2.625 2.62132 2.625 2C2.625 1.37868 2.12132 0.875 1.5 0.875Z" fill={color} />
      <path d="M4.875 2C4.875 1.37868 5.37868 0.875 6 0.875C6.62132 0.875 7.125 1.37868 7.125 2C7.125 2.62132 6.62132 3.125 6 3.125C5.37868 3.125 4.875 2.62132 4.875 2Z" fill={color} />
      <path d="M9.375 2C9.375 1.37868 9.87868 0.875 10.5 0.875C11.1213 0.875 11.625 1.37868 11.625 2C11.625 2.62132 11.1213 3.125 10.5 3.125C9.87868 3.125 9.375 2.62132 9.375 2Z" fill={color} />
    </svg>
  )
}

export default ThreeHorizontalSvgIcon
