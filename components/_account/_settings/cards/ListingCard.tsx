import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import { ICommonProps } from '../../../../types/types'
import { abbreviation } from '../../../../utils/utils'
import { CheckSvgIcon } from '../../../icons'

interface IProps extends ICommonProps {
  listing: any
  selectedListings: any[]
  setSelectedListings: React.Dispatch<React.SetStateAction<any[]>>
}

const ListingCard = (props: IProps) => {
  const { listing, className, selectedListings = [], setSelectedListings } = props
  const [selected, setSelected] = useState<boolean>(false)

  useEffect(() => {
    if (selectedListings?.length > 0) {
      for (const _listing of selectedListings) {
        if (_listing?._id === listing?._id) {
          setSelected(true)
          break
        }
        setSelected(false)
      }
    } else {
      setSelected(false)
    }
  }, [selectedListings, listing])

  const selectListing = () => {
      const evaluate = selectedListings.filter((_listing: any) => _listing?._id === listing?._id)
      if (evaluate.length > 0) {
        const newSelectedListings = selectedListings.filter((_listing: any) => _listing?._id !== listing?._id)
        setSelectedListings(newSelectedListings)
      } else {
        if (selectedListings.length < 10) {
          setSelectedListings((p: any[]) => (
            [
              ...p,
              listing,
            ]
          ))
        } else {
          toast.info('Item limit reached')
        }
      }
  }

  return (
    <section onClick={() => selectListing()} className={`flex flex-col max-w-[290px] w-full px-2 pt-2 cursor-pointer ${className}`}>
      <div className='relative overflow-hidden rounded pb-[100%]'>
        {listing?.image? <picture><img
          src={String(listing?.image).includes('ipfs://')? String(listing?.image).replace('ipfs://', 'https://ipfs.io/ipfs/') : listing?.image }
          alt='listing image'
          className='absolute inset-0 max-w-full min-w-full max-h-full min-h-full object-contain hover:scale-125 duration-300 delay-75'
        /></picture> : <picture><img
          src={process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
          alt='wadza nft default image'
          className='absolute inset-0 max-w-full min-w-full max-h-full min-h-full object-contain hover:scale-125 duration-300 delay-75'
        /></picture>}
        <div className='absolute top-[10px] right-[10px] flex flex-row justify-center items-center w-[27px] h-[27px] rounded-full bg-purple-lighter hover:bg-purple-light hover:shadow-sm duration-150'>
          {selected && <CheckSvgIcon color='white' width={13} height={9} />}
        </div>
      </div>
      <div className='flex flex-row justify-between items-center pt-4 pb-4'>
        <div className='flex flex-col'>
          <h1 className='font-poppins-600 text-md text-black leading-[98.3%]'>
            {abbreviation(listing?.name, 15)}
          </h1>
          <h3 className='font-poppins-400 text-xs text-black leading-[98.3%] mt-2'>
            {abbreviation(listing?.collection?.name, 20)}
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
