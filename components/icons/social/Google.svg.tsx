import React from 'react'
import { ISvgIconProps } from '../../../types/types'

const GoogleSvgIcon = (props: ISvgIconProps) => {
  const { color, width, height } = props

  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.8553 7.36143C17.8386 7.26744 17.7562 7.2 17.6607 7.2H9.2C9.08954 7.2 9 7.28954 9 7.4V10.6C9 10.7105 9.08954 10.8 9.2 10.8H14.0864C13.3443 12.8956 11.3503 14.4 9 14.4C6.01785 14.4 3.6 11.9822 3.6 9C3.6 6.01785 6.01785 3.6 9 3.6C10.3087 3.6 11.5052 4.0694 12.4394 4.84461C12.5209 4.91225 12.6409 4.90905 12.7158 4.83415L14.9816 2.56839C15.0617 2.48833 15.0595 2.35768 14.975 2.28238C13.3853 0.866697 11.2961 0 9 0C4.02975 0 0 4.02975 0 9C0 13.9703 4.02975 18 9 18C13.9703 18 18 13.9703 18 9C18 8.45301 17.949 7.88715 17.8553 7.36143Z" fill={color} />
    </svg>
  )
}

export default GoogleSvgIcon



