import React from 'react'
import { ISvgIconProps } from '../../types/types'

const ChartSvgIcon = (props: ISvgIconProps) => {
  const { color = '#8B6EAE', width = 14, height = 14 } = props
  
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5397 5.08495C13.2206 2.52056 11.1881 0.488003 8.62368 0.168879C8.23547 0.120569 7.91675 0.442345 7.91675 0.833546V5.43771C7.91675 5.63331 8.07531 5.79188 8.27092 5.79188H12.8751C13.2663 5.79188 13.5881 5.47316 13.5397 5.08495Z" fill={color} />
      <path d="M6.50008 1.18772C3.17487 1.18772 0.479248 3.88334 0.479248 7.20855C0.479248 10.5338 3.17487 13.2294 6.50008 13.2294C9.8253 13.2294 12.5209 10.5338 12.5209 7.20855C12.5209 7.01295 12.3623 6.85438 12.1667 6.85438H7.20842C7.01281 6.85438 6.85425 6.69582 6.85425 6.50022V1.54188C6.85425 1.34628 6.69568 1.18772 6.50008 1.18772Z" fill={color} />
    </svg>        
  )
}

export default ChartSvgIcon
