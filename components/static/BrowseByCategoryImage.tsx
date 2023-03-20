import React, { useEffect, useState } from 'react'
import { ICommonProps } from '../../types/types'
import BBCImage1 from '../../assets/home/bbc1.webp'
import BBCImage2 from '../../assets/home/bbc2.webp'
import Image from 'next/image'
import { isMobile } from 'react-device-detect'

interface IProps extends ICommonProps {
  mobile: boolean
}

const BrowseByCategoryImage = (props: IProps) => {
  const { mobile, className } = props
  const [_isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(isMobile)
  }, [])
  
  return (
    <div className={`max-w-[340px] min-[391px]:max-w-[calc(100vw-50px)] sm:max-w-[364px] w-full h-[323px] sm:h-[471px] ${className}`}>
      <div className='absolute top-[52px] bg-purple max-w-[237px] sm:max-w-[287px] w-full h-[221px] sm:h-[275px] shadow-[0_10px_10px_rgba(0,0,0,0.05)] rounded-[15px]'>
      </div>
      <div className='absolute right-[21px] sm:right-9 bottom-[18px] sm:bottom-0 bg-purple max-w-[147px] sm:max-w-[169px] w-full h-[227px] sm:[275px] shadow-[0_10px_10px_rgba(0,0,0,0.05)] rounded-[15px]'>
      </div>
      <div className='absolute top-0 left-[23px]'>
        <Image
          src={BBCImage1}
          alt='bbc image 1'
          width={_isMobile? 237 : 287}
          height={_isMobile? 323 : 391}
          className='rounded-[15px] max-h-[323px] sm:max-h-[391px]'
        />
      </div>
      <div className='absolute right-0 bottom-10 sm:bottom-5'>
        <Image
          src={BBCImage2}
          alt='bbc image 2'
          width={_isMobile? 237 : 287}
          height={_isMobile? 228 : 275}
          className='rounded-[15px] min-h-[228px] sm:min-h-[275px]'
        />
      </div>
    </div>
  )
}

export default BrowseByCategoryImage
