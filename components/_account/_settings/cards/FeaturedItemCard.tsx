import React, { useState, useRef, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { ICommonProps } from '../../../../types/types'
import NavbarDropdown from '../../../dropdowns/NavbarDropdown'
import { EditAltSvgIcon, MenuAltSvgIcon, ThreeDotsSavgIcon, TrashAltSvgIcon } from '../../../icons'

interface IProps extends ICommonProps {
  item: any
  edit: (item: any) => void
  remove: (item: any) => void
}

const FeaturedItemCard = (props: IProps) => {
  const { item, edit, remove } = props
  const optionsRef = useRef<HTMLDivElement>(null)
  const [showOptions, setShowOptions] = useState<boolean>(false)

  useEffect(() => {    
    const handler = (event: any) => {
      if (optionsRef.current !== null && !optionsRef.current.contains(event.target)) {
        setShowOptions(false)
      }
    }
    window.addEventListener('mousedown', handler)

    return () => {
      window.removeEventListener('mousedown', handler)
    }
  }, [])

  const handleOptions = () => {
    setShowOptions(!showOptions)
  }
  
  return (
    <div className='flex flex-row justify-between items-center w-full h-[70px] bg-[#D6CCE4] rounded-md pl-6 pr-3 mb-4'>
      <div className='flex flex-row items-center'>
        <MenuAltSvgIcon color='#8B6EAE' width={24} height={9} />
        <div className='ml-[19px]'>
          <h3 className='font-poppins-600 text-sm text-purple-lighter leading-[21px]'>
            {item?.title || ''}
          </h3>
          <h3 className='font-poppins-400 text-sm text-purple-lighter leading-[21px]'>
            {item?.description || ''}
          </h3>
        </div>
      </div>
      <div className='relative flex flex-row items-center'>
        <div className='flex flex-row'>
          {item?.listings?.length > 4? item.listings.map((listing: any, index: number) => {
            if (index < 3) {
              return (
                <picture key={index}>
                  {listing?.image ? <img
                    src={String(listing?.image).includes('ipfs://') ? String(listing?.image).replace('ipfs://', 'https://ipfs.io/ipfs/') : listing?.image}
                    alt='listing image'
                    className='w-[48px] h-[48px] object-cover rounded-md mr-3'
                  /> : <img
                    src={process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
                    alt='wadza nft default image'
                    className='w-[48px] h-[48px] object-cover rounded-md mr-3'
                  />}
                </picture>
              )
            } else if (index === 3) {
              return (
                <picture key={index} className='relative'>
                  {listing?.image ? <img
                    src={String(listing?.image).includes('ipfs://') ? String(listing?.image).replace('ipfs://', 'https://ipfs.io/ipfs/') : listing?.image}
                    alt='listing image'
                    className='w-[48px] h-[48px] object-cover rounded-md mr-3'
                  /> : <img
                    src={process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
                    alt='wadza nft default image'
                    className='w-[48px] h-[48px] object-cover rounded-md mr-3'
                  />}
                  <div className='absolute top-0 left-0 flex flex-row justify-center items-center w-[48px] h-[48px] bg-[rgba(0,0,0,0.6)] rounded-md'>
                    <h4 className='font-poppins-600 text-sm text-white leading-[21px]'>
                      +{item?.listings?.length - 3}
                    </h4>
                  </div>
                </picture>
              )
            } else {
              return null
            }
          }) : item.listings.map((listing: any, index: number) => (
            <picture key={index}>
              {listing?.image ? <img
                src={String(listing?.image).includes('ipfs://') ? String(listing?.image).replace('ipfs://', 'https://ipfs.io/ipfs/') : listing?.image}
                alt='listing image'
                className='w-[48px] h-[48px] object-cover rounded-md mr-3'
              /> : <img
                src={process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
                alt='wadza nft default image'
                className='w-[48px] h-[48px] object-cover rounded-md mr-3'
              />}
            </picture>
          ))}
        </div>
        <div ref={optionsRef}>
          <button onClick={() => handleOptions()} className='flex flex-row justify-center items-center w-[30px] h-[30px] cursor-pointer hover:bg-purple-lightest hover:shadow-sm duration-150 rounded-full'>
            <ThreeDotsSavgIcon color='#8B6EAE' width={5} height={20} />
          </button>
          <NavbarDropdown show={showOptions}>
            <ul className={`absolute right-0 top-14 w-[170px] z-[1] bg-white divide-y divide-[#EDEDED] rounded shadow-sm`}>
              <li onClick={() => edit(item)} className='flex flex-row items-center w-full h-10 text-black hover:shadow-[rgb(0_0_0/16%)_0px_4px_16px] pl-5 ease-in duration-200 cursor-pointer'>
                <EditAltSvgIcon color='#393939' width={12} height={13} />
                <h4 className='font-poppins-400 text-xs ml-2'>
                  <FormattedMessage id='page.nft_detail.button.edit' />
                </h4>
              </li>
              <li onClick={() => remove(item)} className='flex flex-row items-center w-full h-10 text-black hover:shadow-[rgb(0_0_0/16%)_0px_4px_16px] pl-5 ease-in duration-200 cursor-pointer'>
                <TrashAltSvgIcon color='#DB5C5C' width={12} height={13} />
                <h4 className='font-poppins-400 text-xs ml-2 text-red'>
                  <FormattedMessage id='page.account.settings.tab.featured_items.modal.create_section.button.delete' />
                </h4>
              </li>
            </ul>
          </NavbarDropdown>
        </div>
      </div>
    </div>
  )
}

export default FeaturedItemCard
