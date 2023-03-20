import React from 'react'
import { ISvgIconProps } from '../../types/types'

const LightningSvgIcon = (props: ISvgIconProps) => {
  const { color = 'white', width = 11, height = 20 } = props
  
  return (
    <svg width={width} height={height} viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.60412 0.760421C6.06352 0.585068 4.508 0.585068 2.9674 0.760421L1.37207 0.942003C1.13609 0.968862 0.951571 1.15802 0.930576 1.3946L0.807951 2.77637C0.601777 5.0996 0.601777 7.43652 0.807951 9.75975L0.930576 11.1415C0.953472 11.3995 1.16961 11.5973 1.42862 11.5973H3.50005V18.9998C3.50005 19.2122 3.63426 19.4014 3.83473 19.4717C4.0352 19.5419 4.25816 19.4778 4.39073 19.3118L4.78142 18.8226C7.11083 15.9062 8.9657 12.6405 10.2777 9.14617L10.4681 8.63894C10.5258 8.48538 10.5045 8.31331 10.4111 8.17847C10.3177 8.04363 10.1641 7.96319 10 7.96319H7.28696L9.61243 1.61068C9.66514 1.4667 9.64888 1.3065 9.56831 1.17606C9.48775 1.04561 9.35179 0.959342 9.19945 0.942003L7.60412 0.760421Z" fill={color} />
    </svg>
  )
}

export default LightningSvgIcon