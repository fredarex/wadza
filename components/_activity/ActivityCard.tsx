import React, { useEffect, useState } from 'react'
import { ICommonProps } from '../../types/types'
import { abbreviation, abbreviationBasic, convertCryptoToCash, getPassedTime } from '../../utils/utils'
import { ListSvgIcon, MintedSvgIcon, OfferSvgIcon, ShareBoxSvgIcon, ShoppingCartSvgIcon, TransferSvgIcon } from '../icons'
import { useRouter } from 'next/router'
import { useMetamask } from '../../contexts/Metamask.context'

interface IProps extends ICommonProps {
  activity: any
  ethPrice: string
}

const ActivityCard = (props: IProps) => {
  const { activity, ethPrice } = props
  const router = useRouter()
  const [usdPrice, setUsdPrice] = useState<string>('')
  const { chain } = useMetamask()

  useEffect(() => {
    const getUsdPrice = async () => {
      if ((activity?.price || activity?.value) && ethPrice) {
        const _usdPrice = (Number(activity?.price || activity?.value) * Number(ethPrice)).toFixed(2)
        if (_usdPrice) {
          setUsdPrice(_usdPrice)
        }
      }
    }

    getUsdPrice()
  }, [activity, ethPrice])

  return (
    <div className='flex flex-row items-center w-full h-[78px] bg-[#DDD7E6] px-7 rounded-lg mb-2 hover:shadow-md'>
      {/* type */}
      <div className='flex flex-row w-[12%] items-center cursor-pointer' onClick={() => router.push({pathname: `/assets/${chain?.slug}/${activity?.tokenAddress}/${activity?.tokenId}`})}>
        {activity?.eventType === 'Sale' && <ShoppingCartSvgIcon color='#373737' width={15} height={15} />}
        {activity?.eventType === 'List' && <ListSvgIcon color='#373737' width={15} height={15} />}
        {activity?.eventType === 'Offer' && <OfferSvgIcon color='#373737' width={15} height={15} />}
        {activity?.eventType === 'Transfer' && <TransferSvgIcon color='#373737' width={15} height={15}/>}
        {activity?.eventType === 'Minted' && <MintedSvgIcon color='#373737' width={15} height={15} />}
        <h4 className='font-poppins-600 text-xs text-black leading-[98.3%] ml-[10px]'>
          {activity?.eventType}
        </h4>
      </div>
      {/* listing */}
      <div className='flex flex-row w-[26%] items-center'>
        <picture>
          <img
            src={activity?.tokenImage? String(activity.tokenImage).includes('ipfs://')? String(activity.tokenImage).replace('ipfs://', 'https://ipfs.io/ipfs/') : activity.tokenImage : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
            alt='nft image'
            className='w-[54px] h-[51px] rounded object-cover mr-[15px] cursor-pointer'
            onClick={() => router.push({pathname: `/assets/${chain?.slug}/${activity?.tokenAddress}/${activity?.tokenId}`})}
          />
        </picture>
        <div className='flex flex-col justify-center'>
          <h3 className='font-poppins-400 text-sm text-black leading-[98.3%] mb-2 cursor-pointer' onClick={() => router.push({pathname: `/collection/${activity?.collectionSlug}`})}>
            {abbreviation(activity?.collectionName, 15) || ''}
          </h3>
          <h3 className='font-poppins-600 text-sm text-black leading-[98.3%] cursor-pointer' onClick={() => router.push({pathname: `/assets/${chain?.slug}/${activity?.tokenAddress}/${activity?.tokenId}`})}>
            {abbreviation(activity?.tokenName, 15) || ''}
          </h3>
        </div>
      </div>
      {/* price */}
      <div className='flex flex-row w-[14%] items-center'>
        {!activity?.price && !activity?.value ? <div className='flex items-center'>
          <h3 className='font-poppins-600 text-sm text-black leading-[98.3%] mb-2'>
            ---
          </h3>
        </div> : <div className='flex flex-col justify-center'>
          <h3 className='font-poppins-600 text-sm text-black leading-[98.3%] mb-2'>
            {`${Number(activity?.price || activity?.value).toFixed(3)} ${activity?.currency || 'ETH'}`}
          </h3>
          <h3 className='font-poppins-400 text-sm text-black leading-[98.3%]'>
            {usdPrice? `${usdPrice} USD` : ''}
          </h3>
        </div>}
      </div>
      {/* quantity */}
      <div className='flex flex-row w-[10%] items-center cursor-pointer' onClick={() => router.push({pathname: `/assets/${chain?.slug}/${activity?.tokenAddress}/${activity?.tokenId}`})}>
        <h3 className='font-poppins-600 text-sm text-black leading-[98.3%] mb-2'>
          {Number(activity?.quantity) < 0? 1 : activity?.quantity}
        </h3>
      </div>
      {/* from */}
      <div className='flex flex-row w-[12%] items-center cursor-pointer'>
        <h4 className='font-poppins-400 text-sm text-[#7F4CB5] leading-[98.3%]'>
          {activity?.eventType === 'Minted'? '000000' : ''}
          {activity?.eventType === 'List'? abbreviationBasic(activity?.seller?.username?.replace('0x', ''), 6) || abbreviationBasic(activity?.seller?.walletAddress?.replace('0x', ''), 6) : ''}
          {activity?.eventType === 'Sale'? abbreviationBasic(activity?.seller?.username?.replace('0x', ''), 6) || abbreviationBasic(activity?.seller?.walletAddress?.replace('0x', ''), 6) : ''}
          {activity?.eventType === 'Offer'? abbreviationBasic(activity?.offerBy?.username?.replace('0x', ''), 6) || abbreviationBasic(activity?.offerBy?.walletAddress?.replace('0x', ''), 6) : ''}
        </h4>
      </div>
      {/* to */}
      <div className='flex flex-row w-[12%] items-center cursor-pointer'>
        <h4 className='font-poppins-400 text-sm text-[#7F4CB5] leading-[98.3%]'>
          {activity?.eventType === 'Minted'? abbreviationBasic(activity?.creator?.username?.replace('0x', ''), 6) || abbreviationBasic(activity?.creator?.walletAddress?.replace('0x', ''), 6) : ''}
          {activity?.eventType === 'List'? '---' : ''}
          {activity?.eventType === 'Sale'? abbreviationBasic(activity?.buyer?.username?.replace('0x', ''), 6) || abbreviationBasic(activity?.buyer?.walletAddress?.replace('0x', ''), 6) : ''}
          {activity?.eventType === 'Offer'? '---' : ''}
        </h4>
      </div>
      {/* time/transaction */}
      <div className={`flex flex-row w-[14%] items-center ${activity?.txHash? 'cursor-pointer' : ''}`} onClick={() => activity?.txHash? window.open(`${chain?.blockExplorerUrl}/tx/${activity?.txHash}`, '_blank') : {}}>
        <h4 className={`font-poppins-400 text-sm ${activity?.txHash? 'text-[#7F4CB5]' : 'text-black' }  leading-[98.3%] mr-2`}>
          {getPassedTime(activity?.updatedAt)}
        </h4>
        {activity?.txHash && <ShareBoxSvgIcon color='#7F4CB5' width={15} height={14} />}
      </div>
    </div>
  )
}

export default ActivityCard
