import React from 'react'
import { ISvgIconProps } from '../../../types/types'

const EthereumAltSvgIcon = (props: ISvgIconProps) => {
  const { color = '#3C1361', width = 67, height = 112 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 67 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1007_13379)">
        <path d="M33.4895 0L32.7593 2.55211V76.609L33.4895 77.3585L66.979 57.0383L33.4895 0Z" fill={color} />
        <path d="M33.4895 0L0 57.0383L33.4895 77.3585V41.414V0Z" fill="#B79ECD" />
        <path d="M33.4895 83.868L33.0786 84.3838V110.765L33.4895 112L67 63.5586L33.4895 83.868Z" fill="#704697" />
        <path d="M33.4895 111.998V83.868L0 63.5586L33.4895 111.998Z" fill="#9B84B0" />
        <path d="M33.4895 77.3585L66.979 57.0383L33.4895 41.4141V77.3585Z" fill="#644184" />
        <path d="M0 57.0383L33.4895 77.3585V41.4141L0 57.0383Z" fill="#D8BEEF" />
      </g>
      <defs>
        <clipPath id="clip0_1007_13379">
          <rect width="67" height="112" fill="white" />
        </clipPath>
      </defs>
    </svg>    
  )
}

export default EthereumAltSvgIcon
