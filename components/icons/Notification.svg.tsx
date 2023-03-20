import React from 'react'
import { ISvgIconProps } from '../../types/types'

const NotificationSvgIcon = (props: ISvgIconProps) => {
  const { color = '#8B6EAE', width = 16, height = 20 } = props
  
  return (
    <svg width={width} height={height} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9 1C9 0.447715 8.55229 0 8 0C7.44772 0 7 0.447715 7 1V1.75H6.44258C4.21751 1.75 2.37591 3.48001 2.23702 5.70074L2.01601 9.2342C1.93175 10.5814 1.47946 11.8797 0.708404 12.9876C0.0117219 13.9886 0.631942 15.3712 1.84287 15.5165L5.25 15.9254V17C5.25 18.5188 6.48122 19.75 8 19.75C9.51878 19.75 10.75 18.5188 10.75 17V15.9254L14.1571 15.5165C15.3681 15.3712 15.9883 13.9886 15.2916 12.9876C14.5205 11.8797 14.0682 10.5814 13.984 9.2342L13.763 5.70074C13.6241 3.48001 11.7825 1.75 9.55741 1.75H9V1ZM6.75 17C6.75 17.6904 7.30964 18.25 8 18.25C8.69036 18.25 9.25 17.6904 9.25 17V16.25H6.75V17Z" fill={color} />
    </svg>    
  )
}

export default NotificationSvgIcon
