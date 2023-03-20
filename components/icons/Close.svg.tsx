import React from 'react'
import { ISvgIconProps } from '../../types/types'

interface IProps extends ISvgIconProps {
  width?: number
  height?: number
}

const CloseSvgIcon = (props: IProps) => {
  const { color, width = 23, height = 23 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.53564" width="27" height="5" rx="2" transform="rotate(45 3.53564 0)" fill={color} />
      <rect y="19.2783" width="27" height="5" rx="2" transform="rotate(-45 0 19.2783)" fill={color} />
    </svg>
  )
}

export default CloseSvgIcon
