import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IMockProduct, ICommonProps } from '../../types/types'
import { FormattedMessage } from 'react-intl'
import { isMobile } from 'react-device-detect'

interface IProps extends ICommonProps {
  product: IMockProduct
}

const ProductCard = (props: IProps) => {
  const [_isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(isMobile)
  }, [])
  
  return (
    <div className='flex justify-center w-full mr-4 relative'>
      <Image
        src={props.product.productImage}
        alt='product image'
        className='rounded-[10px] object-cover'
      />
      <div className='absolute max-w-[300px] w-full bottom-0 bg-purple/[0.49] backdrop-blur-[10px] rounded-br-[10px] rounded-bl-[10px]'>
        <div className='relative h-[50px] sm:h-[82px]'>
          <div className='absolute top-[50%] translate-y-[-50%] w-full'>
            <div className='flex justify-center items-center'>
              <div className='mr-[5px] sm:mr-[9px]'>
                <Image
                  src={props.product.creatorImage}
                  alt='creator image'
                  width={_isMobile? 17 : 24}
                  height={_isMobile? 17 : 24}
                  className='rounded-[50%]'
                  priority
                />
              </div>
              <div className='flex-col mr-[70px] sm:mr-7'>
                <div className='font-poppins-700 text-xs text-white'>
                  <FormattedMessage id='page.home.product.card.label.creator' />:
                </div>
                <div className='font-poppins-400 text-xs text-white'>
                  {props.product.creator}
                </div>
              </div>
              <div className='flex justify-center items-center bg-purple-light rounded max-w-[82px] sm:max-w-[146px] w-full h-[33px] sm:h-[36.76px]'>
                <div className='flex flex-col sm:flex-row justify-center items-center font-poppins-800 sm:font-poppins-600 text-xs sm:text-[15px] text-white leading-[111.8%]'>
                  <FormattedMessage id='page.home.product.card.label.floor' />:&nbsp;
                  <div>
                    {props.product.floorPrice} {props.product.currency}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
