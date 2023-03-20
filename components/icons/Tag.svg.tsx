import React from 'react'
import { ISvgIconProps } from '../../types/types'

const TagSvgIcon = (props: ISvgIconProps) => {
  const { color = '#393939', width = 18, height = 18 } = props
  
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 8.86352V1.6875C0 0.755508 0.755508 0 1.6875 0H8.86352C9.31108 2.34027e-06 9.7403 0.177794 10.0568 0.494262L17.5057 7.94324C18.1647 8.60224 18.1647 9.67071 17.5057 10.3297L10.3297 17.5057C9.67071 18.1647 8.60224 18.1647 7.94324 17.5057L0.494262 10.0568C0.177794 9.7403 2.34027e-06 9.31108 0 8.86352H0ZM3.9375 2.25C3.00551 2.25 2.25 3.00551 2.25 3.9375C2.25 4.86949 3.00551 5.625 3.9375 5.625C4.86949 5.625 5.625 4.86949 5.625 3.9375C5.625 3.00551 4.86949 2.25 3.9375 2.25Z" fill={color} />
    </svg>    
  )
}

export default TagSvgIcon
