import React from 'react'
import { useRouter } from 'next/router'
import { ICommonProps } from '../../types/types'
import { FormattedMessage } from 'react-intl'
import { useMetamask } from '../../contexts/Metamask.context'
import { abbreviation } from '../../utils/utils'

interface IProps extends ICommonProps {
  listing: any
}

const ListingCard = (props: IProps) => {
  const router = useRouter()
  const { chain } = useMetamask()
  const { listing, className } = props

  return (
    <section onClick={() => router.push({ pathname: `/assets/${chain?.slug}/${listing?.tokenAddress}/${listing?.tokenId}` })} className={`flex flex-col max-w-[290px] w-full bg-white rounded-[26px] px-[14px] pt-[14px] cursor-pointer ${className}`}>
      <div className='relative overflow-hidden rounded-[15px] pb-[100%]'>
        {listing?.image? <picture><img
          src={String(listing?.image).includes('ipfs://')? String(listing?.image).replace('ipfs://', 'https://ipfs.io/ipfs/') : listing?.image }
          alt='listing image'
          className='absolute inset-0 max-w-full min-w-full max-h-full min-h-full object-contain hover:scale-125 duration-300 delay-75'
        /></picture> : <picture><img
          src={process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
          alt='wadza nft default image'
          className='absolute inset-0 max-w-full min-w-full max-h-full min-h-full object-contain hover:scale-125 duration-300 delay-75'
        /></picture>}
      </div>
      <div className='flex flex-row justify-between items-center pt-4 pb-5'>
        <div className='flex flex-col'>
          <h1 className='font-poppins-600 text-md text-black leading-[98.3%]'>
            {abbreviation(listing?.name, 30)}
          </h1>
          <h3 className='font-poppins-400 text-xs text-black leading-[98.3%] mt-2'>
            {abbreviation(listing?.collection?.name, 30)}
          </h3>
        </div>
        {listing?.sale?.status && <div className='flex flex-col items-end'>
          <h3 className='font-poppins-400 text-xs text-[#9D9D9D] leading-[126.8%]'>
            <FormattedMessage id='page.profile.listing_card.label.last_sale' />:
          </h3>
          <h3 className='font-poppins-400 text-xs text-[#9D9D9D] leading-[126.8%]'>
            {listing?.sale.price}&nbsp;{listing?.sale.currency}
          </h3>
        </div>}
      </div>
    </section>
  )
}

export default ListingCard
