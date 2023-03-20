import React from 'react'
import { useAssets } from '../../contexts/Assets.context'
import { FormattedMessage } from 'react-intl'
import Image from 'next/image'
import FilterIcon from '../../assets/svg/filter.svg'
import FilterIcon2 from '../../assets/svg/filter2.svg'
import { ArrowDownSvgIcon } from '../icons'
import constants from '../../utils/constants'

import { Menu, Transition } from '@headlessui/react'
import { IFilterOption } from '../../types/types'

const FilterNavbar = () => {
  const { onFilterSidebar, setOnFilterSidebar } = useAssets()
  const { SORT_BY } = constants()

  return (
    <div className='flex navbar-filter flex-row filter_btn justify-between items-center max-w-[1250px] w-full bg-purple-lightest p-[9px] rounded-t-[15px] rounded-b'>
      <button
        className='flex justify-center   items-center  w-[86px] h-[27px] bg-white hover:bg-slate-100 rounded-tl-[10px] rounded-tr rounded-b '
        onClick={() => setOnFilterSidebar(!onFilterSidebar)}
      >
        <Image
          src={FilterIcon}
          alt='filter icon'
          width={10}
          height={10}
          className='mr-[7px]'
        />
        <span className='font-poppins-400 text-xs text-black-lighter leading-[98.3%]'>
          <FormattedMessage id='page.assets.filter.navbar.button.filters' />
        </span>
      </button>
      <div className='flex'>
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
        <button className='flex justify-center items-center w-[28px] h-[27px] bg-white hover:bg-slate-100 rounded-tl rounded-tr-[10px] rounded-b'>
          <Image
            src={FilterIcon}
            alt='filter icon'
            width={14}
            height={14}
          />
        </button>
      </div>
    </div>
  )
}

export default FilterNavbar
