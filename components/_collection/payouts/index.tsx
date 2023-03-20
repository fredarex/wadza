import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { getAllEarningsBySlug } from '../../../api/collection'
import { ICommonProps } from '../../../types/types'
import { SortSvgIcon } from '../../icons'
import { NoItems } from '../../_account'
import PayoutItem from './PayoutItem'

interface IProps extends ICommonProps {
  slug: string
}

const CollectionPayouts = (props: IProps) => {
  const { slug } = props
  const [earnings, setEarnings] = useState<any[]>([])

  useEffect(() => {
    const getData = async () => {
      if (slug) {
        const earningsResult = await getAllEarningsBySlug(slug)
        if (!earningsResult?.data?.error && earningsResult?.data?.data) {
          const _earnings = earningsResult.data.data
          setEarnings(_earnings)
        }
      }
    }

    getData()
  }, [slug])

  return (
    <div className='flex flex-row justify-center mt-[136px]'>
      <div className='flex flex-col max-w-[1250px] w-full'>
        <div className='flex flex-row justify-center items-center max-w-[434px] w-full bg-[#DFDBE4] px-13 py-8 rounded-t-[15px]'>
          <h1 className='font-poppins-700 text-3xl text-black-lighter'>
            <FormattedMessage id='page.creator_earnings.title' />
          </h1>
        </div>
        <div className='w-full bg-purple-lightest px-11 pt-[39px] pb-[49px] rounded-[0px_15px_15px_15px]'>
          <div className='w-full border border-solid border-[#D7CDE5] rounded-lg'>
            <div className='flex flex-row items-center w-full h-[49px] border-b border-solid border-[#D7CDE5] px-[33px]'>
              <SortSvgIcon color='#393939' width={11} height={13} />
              <h4 className='font-poppins-700 text-black text-sm leading-[98.3%] ml-[10px]'>
                <FormattedMessage id='page.creator_earnings.label.history' />
              </h4>
            </div>
            {earnings.length > 0? <div>
              <div className='flex flex-row items-center h-6 pl-[30px font-poppins-400 text-black text-[11px] leading-[98.3%] px-[33px]'>
                <div className='w-1/5 first-letter:uppercase'>                  
                  <FormattedMessage id='page.shopping_cart.modal.label.item' />
                </div>
                <div className='w-1/5 first-letter:uppercase'>                  
                  <FormattedMessage id='page.creator_earnings.label.unit_price' />
                </div>
                <div className='w-1/5 first-letter:uppercase'>                  
                  <FormattedMessage id='page.assets.filter.sidebar.quantity' />
                </div>
                <div className='w-1/5 first-letter:uppercase'>                  
                  <FormattedMessage id='page.creator_earnings.label.fee_earned' />
                </div>
                <div className='w-1/5 first-letter:uppercase'>                  
                  <FormattedMessage id='page.creator_earnings.label.creator_earnings' />
                </div>
              </div>
              {earnings.map((earning: any, index: number) => (
                <PayoutItem key={index} earning={earning} />
              ))}
            </div> : <NoItems className='h-[432px]' />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionPayouts
