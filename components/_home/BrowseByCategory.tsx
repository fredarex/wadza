import React from 'react'
import BrowseByCategoryImage from '../static/BrowseByCategoryImage'
import { CategoryData } from '../../mock/CategoryData'
import { IMockCategory } from '../../types/types'
import { FormattedMessage } from 'react-intl'

const BrowseByCategory = () => {
  return (
    <div className='flex justify-center items-center mt-[34px] sm:mt-[148px]'>
      <div className='relative max-w-[1250px] w-full h-[763px] sm:h-[312px] bg-purple-light shadow-[0_10px_10px_rgba(0,0,0,0.05)] rounded-none sm:rounded-[15px] pt-[35px] pl-[25px] sm:pl-[42px]'>
        <div className='flex font-poppins-400 text-[22px] sm:text-[33px] text-white uppercase leading-[104.3%]'>
          <FormattedMessage id='page.home.browse.by.category.section.title.1' />&nbsp;
          <div className='font-poppins-600'>
            <FormattedMessage id='page.home.browse.by.category.section.title.2' />
          </div>
        </div>
        <div className='font-poppins-400 text-[14px] sm:text-[15px] text-white leading-[21px] sm:leading-[22px] mt-1 sm:mt-[9px]'>
          <FormattedMessage id='page.home.browse.by.category.section.description' />
        </div>
        <div className='flex justify-start max-w-[783px] w-full flex-wrap'>
          {CategoryData.length > 0 && CategoryData.map((category: IMockCategory, index: number) => (
            <button key={index} className='flex justify-center items-center bg-white/[0.11] h-[34px] px-7 sm:px-[55px] py-[7px] mr-5 rounded-[23px] mt-4 sm:mt-[22px] hover:bg-white/[0.18]'>
              <div className='font-poppins-600 text-sm text-white'>
                <FormattedMessage id={`page.home.browse.by.category.section.category.${category.value}`} />
              </div>
            </button>
          ))}
        </div>
        <BrowseByCategoryImage mobile={false} className='relative sm:absolute sm:top-[-90px] sm:right-[43px] mt-[41px] sm:mt-0' />
      </div>
    </div>
  )
}

export default BrowseByCategory
