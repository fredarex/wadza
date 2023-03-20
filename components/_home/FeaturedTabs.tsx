import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { IMockCollection, ITab } from '../../types/types'
import Image from 'next/image'
import MenuDirectDownIcon from '../../assets/svg/menu_direct_down.svg'
import MenuDirectDownWhiteIcon from '../../assets/svg/menu_direct_down_white.svg'
import { CollectionsData } from '../../mock/CollectionsData'
import FlatCollectionCard from '../cards/FlatCollectionCard'
import constants from '../../utils/constants'

const FeaturedTabs = () => {
  const intl = useIntl()
  const { HOME_FEATURED_TABS } = constants()

  return (
    <div className='flex-col'>
        
      {/* Background header */}
      <div className='flex justify-center px-[25px] sm:px-0'>
        <div className='flex justify-center items-center mt-[39px] sm:mt-[71px] max-w-[1250px] w-full relative'>

          {/* Main header */}
          <div className='flex justify-end items-center w-full bg-gray-lightest p-[6px] rounded-t-[10px]'>
            <button className='flex justify-center items-center bg-[#F4F4F4] py-2 px-[10px] rounded mr-2 hover:bg-white'>
              <div className='font-poppins-400 text-xs text-black-lighter mr-1'>
                {`24h`}
              </div>
              <Image
                src={MenuDirectDownIcon}
                alt='direct down'
              />
            </button>
            <button className='flex justify-center items-center bg-[#F4F4F4] py-2 px-[10px] rounded hover:bg-white'>
              <div className='font-poppins-400 text-xs text-black-lighter'>
                <FormattedMessage id='page.home.featured.tabs.section.label.view_all' />
              </div>
            </button>
          </div>

          {/* Tabs */}
          <ul className='absolute bottom-0 left-8 hidden sm:flex items-end'>
            {HOME_FEATURED_TABS.length > 0 && HOME_FEATURED_TABS.map((tab: ITab, index: number) => (
              <li key={`tabs-${index}`}>
                <a
                  href='#'
                  className='flex py-5 px-[30px] rounded-t-[10px] bg-gray-lighter font-poppins-400 text-sm text-black-lighter mr-2 hover:py-[22px] hover:bg-purple hover:font-poppins-600 hover:text-xl hover:text-white ease-in duration-200'
                >
                  {tab.name}
                </a>
              </li>
            ))}
          </ul>
          <div className='absolute bottom-0 left-[10px] flex sm:hidden items-end'>
            <a
              href='#'
              className='flex justify-between items-center w-[172px] sm:hidden py-4 sm:py-5 px-[13px] sm:px-[30px] rounded-t-[10px] bg-purple font-poppins-600 sm:font-poppins-400 text-base sm:text-sm text-white mr-[13px] sm:mr-2'
            >
              <FormattedMessage id='page.home.featured.tabs.section.label.trending' />
              <Image
                src={MenuDirectDownWhiteIcon}
                alt='direct down'
              />
            </a>
          </div>
        </div>
      </div>

      {/* Content body */}
      <div className='flex justify-center px-[25px] sm:px-0'>
        <div className='flex justify-center items-center max-w-[1250px] w-full bg-[#ECECEC] shadow-[0_16px_23px_rgba(0,0,0,0.07)] rounded-b-[10px] pt-4 sm:p-8'>
          <div className='max-w-[586px] w-full sm:bg-white sm:rounded-lg sm:p-[18px] sm:mr-[14px]'>
            <div className='flex justify-between px-4 sm:px-0'>
              <div className='font-poppins-600 text-black-lighter text-[15px] leading-[98.3%] sm:pt-[9px] sm:pl-4'>
                <FormattedMessage id='page.home.featured.tabs.section.label.collection' />
              </div>
              <div className='font-poppins-600 text-black-lighter text-[15px] leading-[98.3%] sm:pt-[9px] sm:pr-4'>
                <FormattedMessage id='page.home.featured.tabs.section.label.volume' />
              </div>
            </div>
            <div className='mt-[15px] sm:mt-5 sm:px-4'>
              {CollectionsData.length > 0 && CollectionsData.map((collection: IMockCollection, index: number) => (
                <div key={`left-${index}`}>
                  {index < 5 && (
                    <FlatCollectionCard collection={collection} index={index} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className='hidden sm:block max-w-[586px] w-full bg-white rounded-lg p-[18px]'>
            <div className='flex justify-between'>
              <div className='font-poppins-600 text-black-lighter text-[15px] leading-[98.3%] pt-[9px] pl-4'>
                <FormattedMessage id='page.home.featured.tabs.section.label.collection' />
              </div>
              <div className='font-poppins-600 text-black-lighter text-[15px] leading-[98.3%] pt-[9px] pr-4'>
                <FormattedMessage id='page.home.featured.tabs.section.label.volume' />
              </div>
            </div>
            <div className='mt-5 px-4'>
              {CollectionsData.length > 0 && CollectionsData.map((collection: IMockCollection, index: number) => (
                <div key={`right-${index}`}>
                  {index > 4 && (
                    <FlatCollectionCard collection={collection} index={index} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedTabs
