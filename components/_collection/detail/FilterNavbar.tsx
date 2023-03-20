import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'
import constants from '../../../utils/constants'
import { IFilterOption } from '../../../types/types'

import FilterIcon from '../../../assets/svg/filter.svg'
import FilterIcon2 from '../../../assets/svg/filter2.svg'
import { ArrowDownSvgIcon, SearchSvgIcon } from '../../icons'
import { useCollection } from '../../../contexts/Collection.context'

const FilterNavbar = () => {
  const intl = useIntl()
  const { onFilterSidebar, setOnFilterSidebar, onSweepMode, setOnSweepMode } = useCollection()
  const { SORT_BY } = constants()

  return (
    <div className='max-w-[1250px] w-full bg-purple-lightest rounded-[15px_15px_4px_4px] p-[10px]'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row'>
          <button onClick={() => setOnFilterSidebar(!onFilterSidebar)} className='flex flex-row justify-center items-center max-w-[86px] w-full h-[27px] bg-white hover:bg-slate-100 rounded-[10px_4px_4px_4px] mr-2'>
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
          <div className='flex flex-row w-[346px] h-[27px] bg-white pl-[11px] rounded mr-2'>
            <button className='flex w-auto justify-end items-center mr-[10px]'>
              <SearchSvgIcon color='#373737' />
            </button>
            <input
              type='text'
              className={`w-full rounded mr-4 caret-slate-800 text-[12px] text-purple font-poppins-400 focus:outline-none`}
              placeholder={intl.formatMessage({ 'id': 'page.profile.search.search_by_name' })}
            />
          </div>
          <Menu as={'div'} className='relative inline-block'>
            <div>
              <Menu.Button className='flex justify-between items-center w-[154px] h-[27px] bg-white pl-3 pr-[10.75px] mr-2 rounded'>
                <span className='font-poppins-400 text-xs text-black-lighter leading-[98.3%]'>
                  <FormattedMessage id='page.assets.filter.navbar.sortby' />
                </span>
                <ArrowDownSvgIcon color='#424242' width={10} height={7} />
              </Menu.Button>
            </div>
            <Transition
              as={React.Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute z-[1] left-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className="p-3">
                  {SORT_BY.length > 0 && SORT_BY.map((sort: IFilterOption, index: number) => (
                    <Menu.Item key={index}>
                      <button
                        className='flex w-full items-center font-poppins-400 text-xs text-black-lighter leading-[98.3%] rounded-md px-2 py-2 hover:bg-purple hover:text-white'
                      >
                        {sort.label}
                      </button>
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <button className='flex justify-center items-center w-[28px] h-[27px] bg-white hover:bg-slate-100 mr-2 rounded'>
            <Image
              src={FilterIcon2}
              alt='filter icon'
              width={13}
              height={13}
            />
          </button>
          <button className='flex justify-center items-center w-[28px] h-[27px] bg-white hover:bg-slate-100 rounded'>
            <Image
              src={FilterIcon}
              alt='filter icon'
              width={14}
              height={14}
            />
          </button>
        </div>
        <div className='flex'>
          <button onClick={() => setOnSweepMode(!onSweepMode)} className='flex items-center h-[27px] bg-[#8934F1] hover:bg-[#9C5AEC] hover:scale-[1.02] active:scale-[1] px-6 mr-[9px] rounded'>
            <h4 className='font-poppins-600 text-[11px] text-white leading-[98.3%]'>
              <FormattedMessage id='page.collection_detail.button.sweep_mode' />
            </h4>
          </button>
          <button className='flex items-center h-[27px] bg-purple hover:bg-purple-light hover:scale-[1.02] active:scale-[1] px-[21px] rounded'>
            <h4 className='font-poppins-600 text-[11px] text-white leading-[98.3%]'>
              <FormattedMessage id='page.collection_detail.button.make_collection_offer' />
            </h4>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterNavbar
