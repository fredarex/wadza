import React from 'react'
import Image from 'next/image'
import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/router'

import FilterIcon from '../../assets/svg/filter.svg'
import { useActivity } from '../../contexts/Activity.context'
import { IFilterOption } from '../../types/types'
import { CloseSvgIcon } from '../icons'

const ActivityFilterNavbar = () => {
  const router = useRouter()
  const { onFilterSidebar, setOnFilterSidebar, eventTypes, setEventTypes, setFilterParams, setEventTypeFilterOptions, handleEventTypeFilter } = useActivity()

  const clearAll = () => {
    setEventTypes([])
    setFilterParams('')
    setEventTypeFilterOptions([])

    router.push({
      pathname: `/activity`,
      query: ''
    }, undefined, { scroll: false })
  }

  return (
    <div className='max-w-[1250px] w-full bg-purple-lightest rounded-[15px_15px_4px_4px] p-[10px]'>
      <div className='flex flex-row justify-between'>
        <button onClick={() => setOnFilterSidebar(!onFilterSidebar)} className='flex flex-row justify-center items-center max-w-[86px] w-full h-[27px] bg-white hover:bg-slate-100 rounded-[10px_4px_4px_4px]'>
          <Image
            src={FilterIcon}
            alt='filter icon'
            width={10}
            height={10}
            className='mr-[7px]'
          />
          <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
            <FormattedMessage id='page.assets.filter.navbar.button.filters' />
          </h4>
        </button>
        {eventTypes.length > 0 && <div className='flex flex-row items-center'>
          <h4 onClick={() => clearAll()} className='font-poppins-400 text-xs text-black underline leading-[98.3%] cursor-pointer mr-[13px]'>
            <FormattedMessage id='page.nft_detail.history.clear_all' />
          </h4>
          {eventTypes.map((eventType: IFilterOption, index: number) => (
            <div key={index} className='flex flex-row items-center bg-white h-[27px] px-[9px] rounded ml-[6px]'>
              <h5 className='font-poppins-400 text-xs text-black leading-[98.3%] mr-2'>
                {eventType?.label || ''}
              </h5>
              <span onClick={(e) => handleEventTypeFilter(e, eventType)} className='cursor-pointer'>
                <CloseSvgIcon color='#393939' width={7} height={7} />
              </span>
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}

export default ActivityFilterNavbar
