import React from 'react'
import { ISvgIconProps } from '../../types/types'

const CommentSvgIcon = (props: ISvgIconProps) => {
  const { color = '#8B6EAE', width = 18, height = 17 } = props
  
  return (
    <svg width={width} height={height} viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.36092 0C3.58066 0 -0.357486 5.85685 1.82339 11.2099L2.75573 13.4984C2.83916 13.7032 2.77817 13.9384 2.60576 14.0769L0.634273 15.6602C0.468845 15.793 0.405278 16.0158 0.475696 16.2159C0.546115 16.4161 0.735183 16.55 0.947355 16.55H8.76763C13.5904 16.55 17.5 12.6404 17.5 7.81765C17.5 3.50008 13.9999 0 9.68235 0H9.36092Z" fill={color} />
    </svg>        
  )
}

export default CommentSvgIcon
