import React from 'react'
import { ISvgIconProps } from '../../../types/types'

const EthereumSvgIcon = (props: ISvgIconProps) => {
  const { color = '#393939', width = 9, height = 15 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_742_8514)">
        <path d="M4.49848 0L4.40039 0.3418V10.2601L4.49848 10.3605L8.99707 7.63906L4.49848 0Z" fill={color} />
        <path d="M4.49859 0L0 7.63906L4.49859 10.3605V5.54652V0Z" fill={color} />
        <path d="M4.49855 11.2317L4.44336 11.3008V14.8339L4.49855 14.9995L8.99996 8.51172L4.49855 11.2317Z" fill={color} />
        <path d="M4.49859 14.9991V11.2317L0 8.51172L4.49859 14.9991Z" fill={color} />
        <path d="M4.49854 10.3609L8.99713 7.63941L4.49854 5.54688V10.3609Z" fill={color} />
        <path d="M0 7.63941L4.49859 10.3609V5.54688L0 7.63941Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_742_8514">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default EthereumSvgIcon
