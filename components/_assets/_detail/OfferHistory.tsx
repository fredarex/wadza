import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ICommonProps } from '../../../types/types'
import { abbreviation } from '../../../utils/utils'

interface IProps extends ICommonProps {
  offers: any[]
  isOwner: boolean
  handleAcceptOffer: (offer: any) => void
  handleCancelOffer: (offer: any) => void
}

const OfferHistory = (props: IProps) => {
  const { offers = [], isOwner, handleAcceptOffer, handleCancelOffer, className } = props
  return (
    <ul className='bg-[#E2DCEA] rounded-b-[15px]'>
      <li className='flex flex-row items-center bg-[#E6E2EC] font-poppins-400 text-black text-[11px] leading-[98.3%] h-6 px-3'>
        <div className='w-[90px]'>
          <FormattedMessage id='page.nft_detail.modal.offer.label.price' />
        </div>
        <div className='w-[90px]'>
          <FormattedMessage id='page.nft_detail.history.usd_price' />
        </div>
        <div className='w-[110px]'>
          <FormattedMessage id='page.nft_detail.history.floor_difference' />
        </div>
        <div className='w-[90px]'>
          <FormattedMessage id='page.nft_detail.history.expiration' />
        </div>
        <div className='w-[90px]'>
          <FormattedMessage id='page.nft_detail.history.from' />
        </div>
        {isOwner && <div className='sticky'>
          &nbsp;
        </div>}
      </li>
      {offers.length > 0 && offers.map((_offer: any, index: number) => {
        return <li key={index} className='flex flex-row items-center h-[41px] font-poppins-400 text-xs text-black leading-[98.3%] border-t border-solid border-[#D7CDE5] px-3'>
          <div className='w-[90px]'>
            {_offer?.price}&nbsp;WETH
          </div>
          <div className='w-[90px]'>
            ${_offer?.usdPrice}
          </div>
          <div className='w-[110px]'>
            {_offer?.c_difference}
          </div>
          <div className='w-[90px]'>
            {_offer?.c_expiry}
          </div>
          <div className='w-[90px] font-poppins-700 text-purple cursor-pointer'>
            {abbreviation(_offer?.c_from, 8)}
          </div>
          {isOwner && !_offer?.is_maker && <div className='sticky flex flex-row justify-end items-center w-[calc(100%-470px)]'>
            <button className={`flex flex-row justify-center items-center w-[61px] h-[22px] bg-[#D7CDE5] rounded-[3px] hover:bg-purple-lightest hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1] mr-1`}>
              <h4 className='font-poppins-400 text-purple text-[10px] leading-[98.3%]'>
                <FormattedMessage id='page.nft_detail.offer.button.counter' />
              </h4>
            </button>
            <button onClick={() => handleAcceptOffer(_offer)} className={`flex flex-row justify-center items-center w-[61px] h-[22px] bg-purple rounded-[3px] hover:bg-purple-lighter hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
              <h4 className='font-poppins-400 text-[#E2DCEA] text-[10px] leading-[98.3%]'>
                <FormattedMessage id='page.nft_detail.offer.button.accept' />
              </h4>
            </button>
          </div>}
          {_offer?.is_maker && <div className='sticky flex flex-row justify-end items-center w-[calc(100%-470px)]'>
            <button onClick={() => handleCancelOffer(_offer)} className={`flex flex-row justify-center items-center w-[61px] h-[22px] bg-[#D7CDE5] rounded-[3px] hover:bg-purple-lightest hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1] mr-1`}>
              <h4 className='font-poppins-400 text-purple text-[10px] leading-[98.3%]'>
                <FormattedMessage id='page.nft_detail.offer.button.cancel' />
              </h4>
            </button>
          </div>}
        </li>
      })}
    </ul>
  )
}

export default OfferHistory
