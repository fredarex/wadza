import Image from 'next/image'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ICommonProps, IMockCollection } from '../../types/types'
import { abbreviation } from '../../utils/utils'

interface IProps extends ICommonProps {
  collection: IMockCollection
  index: number
}

const FlatCollectionCard = (props: IProps) => {
  const { collection, index } = props

  return (
    <div className='flex justify-center items-center max-w-[534px] h-[60px] sm:h-[97px] w-full py-[15px] pr-[18px] bg-[#F0F0F0] my-[22px] sm:my-[10px] rounded-lg relative'>
      <div className='absolute left-[-7px] sm:left-[-16px] flex justify-center items-center max-w-[534px] w-full py-[15px] my-[10px]'>
        <div className='bg-purple p-[13px] rounded-l-[10px] max-w-[24px] sm:max-w-[32px] w-full'>
          <div className='font-poppins-600 text-white text-[15px] leading-[98.3%]'>
            {index + 1}
          </div>
        </div>
        <Image
          src={collection?.collectionImage}
          alt='collection image'
          className='max-w-[55px] sm:max-w-[71px] w-full h-[60px] sm:h-[67px] mr-[10px] sm:mr-[18px]'
        />
        <div className='flex-col max-w-[171px] sm:max-w-[305px] w-full'>
          <div className='flex font-poppins-600 text-black-light text-sm sm:text-base leading-[123.3%] sm:leading-[98.3%]'>
            {abbreviation(collection?.title, 25)}
          </div>
          <div className='flex font-poppins-400 text-black-light text-sm sm:text-xs leading-[98.3%] mt-2 sm:mt-[10px]'>
            <FormattedMessage id='page.home.product.card.label.floor' />: {collection?.floorPrice} {collection?.currency}
          </div>
        </div>
        <div className='flex justify-center items-center bg-[#E3E3E3] py-[23px] sm:py-[26px] px-[9px] sm:px-5 rounded'>
          <div className='font-poppins-700 text-black-light text-[15px] sm:text-[13px] leading-[98.3%]'>
            {collection?.totalValue} {collection?.currency}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlatCollectionCard
