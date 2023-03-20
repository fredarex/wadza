import React from 'react'
import { ISvgIconProps } from '../../types/types'

const ArrowLeftSvgIcon = (props: ISvgIconProps) => {
  const { color = '#8B6EAE', width = 9, height = 15 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.46122 0.892618C8.88836 1.31975 8.88836 2.01228 8.46122 2.43941L3.40129 7.49935L8.46122 12.5593C8.88836 12.9864 8.88836 13.6789 8.46122 14.1061C8.03409 14.5332 7.34156 14.5332 6.91443 14.1061L1.08109 8.27275C0.653958 7.84561 0.653958 7.15309 1.08109 6.72595L6.91443 0.892618C7.34156 0.465482 8.03409 0.465482 8.46122 0.892618Z" fill={color} />
    </svg>    
  )
}

export default ArrowLeftSvgIcon
