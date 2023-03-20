import React from 'react'
import { ISvgIconProps } from '../../types/types'

const ArrowUpSvgIcon = (props: ISvgIconProps) => {
  const { color = '#393939', width = 10, height = 7 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.46967 6.03033C0.176777 5.73744 0.176777 5.26256 0.46967 4.96967L4.46967 0.96967C4.76256 0.676777 5.23744 0.676777 5.53033 0.96967L9.53033 4.96967C9.82322 5.26256 9.82322 5.73744 9.53033 6.03033C9.23744 6.32322 8.76256 6.32322 8.46967 6.03033L5 2.56066L1.53033 6.03033C1.23744 6.32322 0.762563 6.32322 0.46967 6.03033Z" fill={color} />
    </svg>
  )
}

export default ArrowUpSvgIcon
