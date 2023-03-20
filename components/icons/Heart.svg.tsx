import React from 'react'
import { ISvgIconProps } from '../../types/types'

const HeartSvgIcon = (props: ISvgIconProps) => {
  const { color, width = 16, height = 13 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.00004 0.375C2.68266 0.375 0.708374 2.10775 0.708374 4.35816C0.708374 5.91062 1.43533 7.21765 2.39878 8.30035C3.35893 9.37934 4.59766 10.285 5.71752 11.043L7.6497 12.3509C7.8613 12.4941 8.13878 12.4941 8.35038 12.3509L10.2826 11.043C11.4024 10.285 12.6412 9.37934 13.6013 8.30035C14.5648 7.21765 15.2917 5.91062 15.2917 4.35816C15.2917 2.10775 13.3174 0.375 11 0.375C9.80548 0.375 8.75434 0.935116 8.00004 1.65986C7.24574 0.935116 6.1946 0.375 5.00004 0.375Z" fill={color} />
    </svg>
  )
}

export default HeartSvgIcon
