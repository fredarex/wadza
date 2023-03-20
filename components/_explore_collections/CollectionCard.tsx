import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ICollectionData, ICommonProps } from '../../types/types'
import VerifiedMarkIcon from '../../assets/svg/verified_mark.svg'
import { abbreviation } from '../../utils/utils'
import { EditAltSvgIcon, ThreeDotsSavgIcon, WalletSvgIcon } from '../icons'
import NavbarDropdown from '../dropdowns/NavbarDropdown'
import { FormattedMessage } from 'react-intl'

interface IProps extends ICommonProps {
  collection: ICollectionData
  onClick: (slug: string) => void
  showOptionsBtn?: boolean
}

const CollectionCard = (props: IProps) => {
  const router = useRouter()
  const { collection, onClick, showOptionsBtn = false, className } = props
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const handleOptions = () => {
    setShowOptions(!showOptions)
  }

  const edit = () => {
    router.push({
      pathname: `/collection/${collection?.slug}/edit`
    })
  }

  const payouts = () => {
    router.push({
      pathname: `/collection/${collection?.slug}/payouts`
    })
  }

  return (
    <div className={`flex group min-h-[200px] cursor-pointer mt-7 ${className}`}>
      <div className='relative flex-col justify-center w-full h-[195px] sm:h-[200px] rounded-[10px] bg-white'>
        <div onClick={() => onClick(collection?.slug || '')} className='flex flex-row justify-center items-center overflow-hidden'>
          <picture className='w-full h-[163px]'><img
            src={collection?.bannerImage? collection?.bannerImage : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
            alt='collection image'
            className={`rounded-t-[10px] ${collection?.bannerImage? 'min-w-full min-h-full h-auto' : 'w-full h-full'}`}
          /></picture>
        </div>
        <div onClick={() => onClick(collection?.slug || '')} className='absolute bottom-[-8px] sm:bottom-[-9px] h-[52px] sm:h-[59px]'>
          <div className='flex justify-start items-center'>
            <picture><img
              src={collection?.logoImage? collection?.logoImage : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
              alt='logo image'
              className='w-[52px] sm:w-[66px] h-[50px] sm:h-[59px] ml-[9px] sm:ml-[17px] rounded-[4px] mr-[9px] sm:mr-4'
            /></picture>
            <div className='font-poppins-400 text-xs sm:text-sm  text-black leading-[98.3%] mr-[6px] sm:mr-3 mt-1'>
              {abbreviation(collection?.name, 15)}
            </div>
            {collection?.isVerified && <Image
              src={VerifiedMarkIcon}
              alt='checkbox image'
              className='mt-1 w-[10px] sm:w-[15px] h-[10px] sm:h-[14px]'
            />}
          </div>
        </div>
        {showOptionsBtn && <div onClick={() => handleOptions()} className='absolute hidden justify-end group-hover:block top-5 right-[22px] z-[1]'>
          <div className='relative'>
            <button className={`flex flex-row justify-center items-center w-9 h-9 bg-white ${showOptions? 'rounded-t' : 'rounded'} duration-75`}>
              <ThreeDotsSavgIcon color='#4F4F4F' />
            </button>
            <NavbarDropdown show={showOptions}>
              <ul className={`absolute right-0 w-[170px] bg-white mt-0 divide-y divide-[#EDEDED] rounded-b rounded-tl shadow-sm`}>
                <li onClick={() => edit()} className='flex flex-row items-center w-full h-10 text-black hover:shadow-[rgb(0_0_0/16%)_0px_4px_16px] pl-5 ease-in duration-200 cursor-pointer'>
                  <EditAltSvgIcon color='#393939' width={12} height={13} />
                  <h4 className='font-poppins-400 text-xs ml-2'>
                    <FormattedMessage id='page.nft_detail.button.edit' />
                  </h4>
                </li>
                <li onClick={() => payouts()} className='flex flex-row items-center w-full h-10 text-black hover:shadow-[rgb(0_0_0/16%)_0px_4px_16px] pl-5 ease-in duration-200 cursor-pointer'>
                  <WalletSvgIcon color='#393939' width={12} height={13} />
                  <h4 className='font-poppins-400 text-xs ml-2'>
                    <FormattedMessage id='page.my_collections.options.label.creator_earnings' />
                  </h4>
                </li>
              </ul>
            </NavbarDropdown>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default CollectionCard
