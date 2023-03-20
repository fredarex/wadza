import React from 'react'
import { ISvgIconProps } from '../../types/types'

const ArrowRightAltSvgIcon = (props: ISvgIconProps) => {
  const { color = '#424242', width = 9, height = 7 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.41854 1.33146C5.23549 1.1484 5.23549 0.851602 5.41854 0.668544C5.6016 0.485485 5.8984 0.485485 6.08146 0.668544L8.58146 3.16854C8.76451 3.3516 8.76451 3.6484 8.58146 3.83146L6.08146 6.33146C5.8984 6.51451 5.6016 6.51451 5.41854 6.33146C5.23549 6.1484 5.23549 5.8516 5.41854 5.66854L7.11834 3.96875H1.0625C0.803617 3.96875 0.59375 3.75888 0.59375 3.5C0.59375 3.24112 0.803617 3.03125 1.0625 3.03125H7.11834L5.41854 1.33146Z" fill={color} />
    </svg>
  )
}

export default ArrowRightAltSvgIcon
