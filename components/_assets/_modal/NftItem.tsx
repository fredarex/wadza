import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ICommonProps } from '../../../types/types'
import { InfoCircleSvgIcon, VerifiedSvgIcon } from '../../icons'

interface IProps extends ICommonProps {
  nft: any
  collection: any
  item: any
  royalities?: boolean
  showPrice?: boolean
}

const NftItem = (props: IProps) => {
  const { nft, collection, item, royalities = true, showPrice = true, className } = props

  return (
    <section className={`purchase-modal-nft-item flex flex-row justify-between w-full h-[98px] pl-[14px] pr-5 py-[14px] border border-solid border-[#F0ECF5] rounded-md ${className}`}>
      {/* image, info */}
      <div className='flex flex-row justify-start items-center'>
        <picture><img
          src={nft?.image? String(nft.image).includes('ipfs://')? String(nft.image).replace('ipfs://', 'https://ipfs.io/ipfs/') : nft.image : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
          alt='nft image'
          className='w-[71px] h-[71px] rounded-[3px]'
        /></picture>
        <div className='flex flex-col ml-[18px]'>
          <div className='flex flex-row items-center'>
            <h3 className='font-poppins-600 text-base text-purple leading-6 mr-2'>
              {nft?.name}
            </h3>
            {collection?.isVerified && <VerifiedSvgIcon color='#53317D' width={17} height={16} />}
          </div>
          <h3 className='font-poppins-600 text-sm text-[#707070] leading-6'>
            {collection?.name}
          </h3>
          {royalities && <div className='flex flex-row items-center'>
            <h3 className='font-poppins-400 text-xs text-[#707070] leading-6'>
              <FormattedMessage id='page.nft_detail.modal.purchase.royalties.label' />:&nbsp;{collection?.creatorFee? `${collection?.creatorFee}%` : ''}&nbsp;
            </h3>
            <span className='cursor-pointer'>
              <InfoCircleSvgIcon color='#707070' width={11} height={11} />
            </span>
          </div>}
        </div>
      </div>
      {/* price */}
      {item.price && showPrice && <div className='flex flex-col items-end'>
        <h2 className='font-poppins-600 text-base text-purple leading-6'>
          {`${item?.usdPrice} USD`}
        </h2>
        <h3 className='font-poppins-400 text-sm text-[#707070] leading-6'>
          {`(${item?.price} ${item?.currency})`}
        </h3>
      </div>}
    </section>
  )
}

export default NftItem
