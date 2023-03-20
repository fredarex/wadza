import React from 'react'
import { ISvgIconProps } from '../../types/types'

const EditAltSvgIcon = (props: ISvgIconProps) => {
  const { color = '#393939', width = 16, height = 16 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.7808 0.0625C10.8968 0.0625 11.0081 0.108594 11.0901 0.190641L13.565 2.66551C13.7359 2.83637 13.7359 3.11338 13.565 3.28423L5.52167 11.3276C5.4667 11.3825 5.39808 11.4219 5.32287 11.4415L1.973 12.3165C1.82272 12.3558 1.6629 12.3124 1.55307 12.2026C1.44325 12.0927 1.39988 11.9329 1.43914 11.7826L2.31414 8.43277C2.33378 8.35756 2.37311 8.28895 2.42807 8.23398L10.4714 0.190641C10.5535 0.108594 10.6647 0.0625 10.7808 0.0625Z" fill={color} />
      <path d="M1.5 13.8438C1.13756 13.8438 0.84375 14.1376 0.84375 14.5C0.84375 14.8624 1.13756 15.1562 1.5 15.1562H14.625C14.9874 15.1562 15.2812 14.8624 15.2812 14.5C15.2812 14.1376 14.9874 13.8438 14.625 13.8438H1.5Z" fill={color} />
    </svg>
  )
}

export default EditAltSvgIcon
