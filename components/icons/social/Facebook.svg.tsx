import React from 'react'
import { ISvgIconProps } from '../../../types/types'

const FacebookSvgIcon = (props: ISvgIconProps) => {
  const { color, width = 12, height = 20 } = props
  
  return (
    <svg width={width} height={height} viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.2 0.875C6.97337 0.875 5.79699 1.36228 4.92963 2.22963C4.06228 3.09699 3.575 4.27337 3.575 5.5V8.075H1.1C0.975736 8.075 0.875 8.17574 0.875 8.3V11.7C0.875 11.8243 0.975736 11.925 1.1 11.925H3.575V18.9C3.575 19.0243 3.67574 19.125 3.8 19.125H7.2C7.32426 19.125 7.425 19.0243 7.425 18.9V11.925H9.92192C10.0252 11.925 10.1152 11.8547 10.1402 11.7546L10.9902 8.35457C11.0257 8.21256 10.9183 8.075 10.7719 8.075H7.425V5.5C7.425 5.29446 7.50665 5.09733 7.65199 4.95199C7.79733 4.80665 7.99446 4.725 8.2 4.725H10.8C10.9243 4.725 11.025 4.62426 11.025 4.5V1.1C11.025 0.975736 10.9243 0.875 10.8 0.875H8.2Z" fill={color} />
    </svg>
  )
}

export default FacebookSvgIcon
