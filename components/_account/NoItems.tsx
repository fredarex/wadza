import React from 'react'
import Image from 'next/image'
import { FormattedMessage } from 'react-intl'
import NoItemsIcon from '../../assets/svg/collection_banner.svg'
import { ICommonProps } from '../../types/types'

interface IProps extends ICommonProps {
  width?: number
  height?: number
  imageWidth?: string
  imageHeight?: string
  fontSize?: string
  margin?: string
}

export const NoItems = (props: IProps) => {
  const { width = 85, height = 75, imageWidth = 'w-[162px]', imageHeight = 'h-[162px]', fontSize = 'text-[22px]', margin = 'mt-[34px]', className } = props
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      <div className={`flex flex-row justify-center items-center ${imageWidth} ${imageHeight} bg-[rgba(127,76,181,0.15)] rounded-full`}>
        <Image
          src={NoItemsIcon}
          alt='no items image'
          width={width}
          height={height}
        />
      </div>
      <h1 className={`font-poppins-400 text-[#B8A2D2] leading-[33px] ${fontSize} ${margin}`}>
        <FormattedMessage id='page.profile.label.no_items' />
      </h1>
    </div>
  )
}

export default NoItems
