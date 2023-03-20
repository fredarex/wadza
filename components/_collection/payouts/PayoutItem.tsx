import React from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ICommonProps } from '../../../types/types'
import { getPassedTime } from '../../../utils/utils'
import { useMetamask } from '../../../contexts/Metamask.context'
import ToolTip from '../../tooltip'
import { ShareBoxSvgIcon } from '../../icons'

interface IProps extends ICommonProps {
  earning: any
}

const PayoutItem = (props: IProps) => {
  const { earning, className } = props
  const router = useRouter()
  const { chain } = useMetamask()

  return (
    <div className={`${className} flex flex-row items-center w-full h-[69px] bg-[#E2DCEA] border-t border-solid border-[#D7CDE5] px-[33px] font-poppins-400 text-black-lighter text-sm leading-[98.3%]`}>
      <div className='flex flex-row items-center w-1/5 h-full'>
        <div className='flex items-center cursor-pointer' onClick={() => router.push({ pathname: `/assets/${chain?.slug}/${earning?.tokenAddress}/${earning?.tokenId}` })}>
          <picture>
            <img
              src={earning?.image || process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
              className='w-10 h-[38px] object-cover rounded mr-[11px]'
              alt='nft image'
            />
          </picture>
          <h4>
            {earning?.name}
          </h4>
        </div>
      </div>
      <div className='flex flex-row items-center w-1/5 h-full'>
        <h4>
          {`${earning?.value} ${earning?.currency || 'ETH'}`}
        </h4>
      </div>
      <div className='flex flex-row items-center w-1/5 h-full'>
        <h4>
          {earning?.quantity || 1}
        </h4>
      </div>
      <div className='flex flex-row items-center w-1/5 h-full'>
        <h4>
          {`${earning?.fee} ${earning?.currency || 'ETH'}`}
        </h4>
      </div>
      <div className='flex flex-row items-center w-1/5 h-full'>
        <ToolTip tooltip={moment(earning?.date).format('MMMM DD, YYYY hh:mm A')}>
          <div className='flex cursor-pointer' onClick={() => window.open(`${chain?.blockExplorerUrl}/tx/${earning?.txHash}`, '_blank')}>
            <h4 className='font-poppins-600 text-sm text-[#7F4CB5] leading-[98.3%] mr-[7px]'>
              {getPassedTime(earning?.date)}
            </h4>
            <ShareBoxSvgIcon color='#7F4CB5' />
          </div>
        </ToolTip>
      </div>
    </div>
  )
}

export default PayoutItem
