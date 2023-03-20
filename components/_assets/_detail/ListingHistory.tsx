import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ICommonProps } from '../../../types/types'
import { abbreviation } from '../../../utils/utils'
import { ShoppingCartSvgIcon } from '../../icons'

interface IProps extends ICommonProps {
  items: any[],
  addToCart: (itemId: string) => void
}

const ListingHistory = (props: IProps) => {
  const { items = [], addToCart, className } = props
  return (
    <ul className='bg-[#E2DCEA] rounded-b-[15px]'>
      <li className='flex flex-row items-center bg-[#E6E2EC] font-poppins-400 text-black text-[11px] leading-[98.3%] h-6 px-3'>
        <div className='w-[120px]'>
          <FormattedMessage id='page.nft_detail.modal.offer.label.price' />
        </div>
        <div className='w-[120px]'>
          <FormattedMessage id='page.nft_detail.history.usd_price' />
        </div>
        <div className='w-[120px]'>
          <FormattedMessage id='page.nft_detail.history.expiration' />
        </div>
        <div className='w-[120px]'>
          <FormattedMessage id='page.nft_detail.history.from' />
        </div>
        <div className='sticky'>
          &nbsp;
        </div>
      </li>
      {items.length > 0 && items.map((_item: any, index: number) => {
        return <li key={index} className='flex flex-row items-center h-[41px] font-poppins-400 text-xs text-black leading-[98.3%] border-t border-solid border-[#D7CDE5] px-3'>
          <div className='w-[120px]'>
            {_item?.price}&nbsp;{_item?.currency}
          </div>
          <div className='w-[120px]'>
            ${_item?.usdPrice}
          </div>
          <div className='w-[120px]'>
            {_item?.c_expiry}
          </div>
          <div className='w-[120px] cursor-pointer'>
            {abbreviation(_item?.c_from, 8)}
          </div>
          {!_item?.is_maker && <div className='sticky flex flex-row justify-end items-center w-[calc(100%-480px)]'>
            <button onClick={() => addToCart(_item?._id)} className={`flex flex-row justify-center items-center w-[45px] h-[22px] bg-purple rounded-lg hover:bg-purple-lighter hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
              <h4 className='flex flex-row font-poppins-500 text-[#E6E2EC] text-[17px] leading-[98.3%] mr-1'>
                +
              </h4>
              <ShoppingCartSvgIcon color='#E6E2EC' width={12} height={11} />
            </button>
          </div>}
          {_item?.is_maker && <div className='sticky flex flex-row justify-end items-center w-[calc(100%-480px)]'>
            <button className={`flex flex-row justify-center items-center w-[61px] h-[22px] bg-[#D7CDE5] rounded-[3px] hover:bg-purple-lightest hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1] mr-1`}>
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

export default ListingHistory
