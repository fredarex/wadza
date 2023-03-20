import React from 'react'
import { ISvgIconProps } from '../../types/types'

const CheckSvgIcon = (props: ISvgIconProps) => {
  const { color = '#E6E2EC', width = 14, height = 10 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.0303 0.96967C13.3232 1.26256 13.3232 1.73744 13.0303 2.03033L6.03033 9.03033C5.73744 9.32322 5.26256 9.32322 4.96967 9.03033L0.96967 5.03033C0.676777 4.73744 0.676777 4.26256 0.96967 3.96967C1.26256 3.67678 1.73744 3.67678 2.03033 3.96967L5.5 7.43934L11.9697 0.96967C12.2626 0.676777 12.7374 0.676777 13.0303 0.96967Z" fill={color} />
    </svg>
  )
}

export default CheckSvgIcon
