import React from 'react'
import { ISvgIconProps } from '../../types/types'

const MenuAltSvgIcon = (props: ISvgIconProps) => {
  const { color = '#8B6EAE', width = 24, height = 9 } = props

  return (
    <svg width={width} height={height} viewBox="0 0 24 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M24 7.96154C24 7.38801 23.4801 6.92308 22.8387 6.92308H1.16129C0.519927 6.92308 0 7.38801 0 7.96154C0 8.53506 0.519927 9 1.16129 9H22.8387C23.4801 9 24 8.53506 24 7.96154Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M24 1.03846C24 0.464935 23.4801 0 22.8387 0H1.16129C0.519927 0 0 0.464935 0 1.03846C0 1.61199 0.519927 2.07692 1.16129 2.07692H22.8387C23.4801 2.07692 24 1.61199 24 1.03846Z" fill={color} />
    </svg>
  )
}

export default MenuAltSvgIcon
