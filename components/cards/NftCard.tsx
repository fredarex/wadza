import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ICommonProps } from '../../types/types'
import CartIcon from '../../assets/svg/cart.svg'
import LikeIcon from '../../assets/svg/like.svg'
import { abbreviation } from '../../utils/utils'
import { useMetamask } from '../../contexts/Metamask.context'

interface IProps extends ICommonProps {
  listing: any
  collection?: any
}

const NftCard = (props: IProps) => {
  const { className, listing, collection } = props
  const router = useRouter()
  const { chain } = useMetamask()
  const [item, setItem] = useState<any>(null)

  useEffect(() => {
    if (listing?.items) {
      const items = listing.items
      if (items && items.length > 0) {
        for (const _item of items) {
          if (!_item.isSold && _item.isActive && Number(_item.expiryDate) > Math.round(new Date().getTime() / 1000)) {
            setItem(_item)
          } else {
            setItem(null)
          }
        }
      } else {
        setItem(null)
      }
    } else {
      setItem(null)
    }
  }, [listing, router])

  return (
    <div onClick={() => router.push({ pathname: `/assets/${chain?.slug}/${listing.tokenAddress}/${listing.tokenId}` })} className={`${className} flex flex-col w-full nft-card box-border bg-white rounded-[26px] p-[14px_14px_16px_14px] cursor-pointer`}>
      <div className='relative overflow-hidden rounded-[15px] pb-[100%]'>
        {listing?.image ? <picture><img
          src={String(listing.image).includes('ipfs://') ? String(listing.image).replace('ipfs://', 'https://ipfs.io/ipfs/') : listing.image}
          alt='listing image'
          className='absolute inset-0 max-w-full min-w-full max-h-full min-h-full object-contain hover:scale-125 duration-300 delay-75'
        /></picture> : <picture><img
          src={process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
          alt='listing image'
          className='absolute inset-0 max-w-full min-w-full max-h-full min-h-full object-contain hover:scale-125 duration-300 delay-75'
        /></picture>}
      </div>
      {/* title, duration */}
      <div className='flex flex-row justify-between items-center mt-4'>
        <span className='font-poppins-600 text-base text-black-lighter leading-[98.3%]'>
          {abbreviation(listing?.name, 30)}
        </span>
        {listing?.price !== 0 && (
          <span className='font-poppins-400 text-xs leading-[98.3%]'>
            {`Ends in a day`}
          </span>
        )}
      </div>
      {/* collection */}
      <div className='font-poppins-400 text-xs  w-full mt-2'>
        {abbreviation(collection?.name, 30)}&nbsp;
      </div>
      {/* price, add to cart, like */}
      <div className='flex flex-row justify-start items-center mt-3'>
        <div className={`flex justify-center items-center nft-card-btn w-full h-[27px] bg-[#F5F5F5] ${item?.price && Number(item?.price) > 0 ? 'rounded-[19px_2px_2px_19px] mr-[5px]' : 'rounded-[19px]'}`}>
          <span className='font-poppins-600 text-xs leading-[98.3%]'>
            {item?.price && Number(item?.price) > 0 ? `${item?.price} ${item?.currency}` : 'Not listed'}
          </span>
        </div>
        {item?.price && Number(item?.price) > 0 && (<button className='flex justify-center items-center max-w-[28px] w-full h-[27px] bg-[#F3E9FC] hover:bg-purple-lightest rounded-sm mr-[5px] ease-in duration-100'>
          <Image
            src={CartIcon}
            alt='cart icon'
            width={14}
            height={16}
          />
        </button>)}
        {item?.price && Number(item?.price) > 0 && (<button className='flex justify-center items-center max-w-[28px] w-full h-[27px] bg-[#F3E9FC] hover:bg-purple-lightest rounded-[2px_19px_19px_2px] ease-in duration-100'>
          <Image
            src={LikeIcon}
            alt='cart icon'
            width={14}
            height={16}
          />
        </button>)}
      </div>
      {/* buy/check button */}
      <button className='flex justify-center items-center nft-card-btn w-full h-[27px] bg-purple hover:bg-purple-light hover:scale-[1.02] active:scale-[1] rounded-[14px] py-2 mt-[5px]'>
        <span className='font-poppins-600 text-[11px] text-white leading-[98.3%]'>
          {item?.price && Number(item?.price) > 0 ? 'Buy now' : 'Check'}
        </span>
      </button>
    </div>
  )
}

export default NftCard
