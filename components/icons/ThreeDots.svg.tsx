import React from 'react'
import { ISvgIconProps } from '../../types/types'

const ThreeDotsSavgIcon = (props: ISvgIconProps) => {
  const { color } = props

  return (
    <svg width="4" height="15" viewBox="0 0 4 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 1.0625C2.44462 1.0625 2.75 1.40007 2.75 1.75C2.75 2.09993 2.44462 2.4375 2 2.4375C1.55538 2.4375 1.25 2.09993 1.25 1.75C1.25 1.40007 1.55538 1.0625 2 1.0625ZM2 6.8125C2.44462 6.8125 2.75 7.15007 2.75 7.5C2.75 7.84993 2.44462 8.1875 2 8.1875C1.55538 8.1875 1.25 7.84993 1.25 7.5C1.25 7.15007 1.55538 6.8125 2 6.8125ZM2 12.5625C2.44462 12.5625 2.75 12.9001 2.75 13.25C2.75 13.5999 2.44462 13.9375 2 13.9375C1.55538 13.9375 1.25 13.5999 1.25 13.25C1.25 12.9001 1.55538 12.5625 2 12.5625Z" fill={color} stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

export default ThreeDotsSavgIcon
