import React from 'react'
import Image from 'next/image'
import { ICommonProps } from '../../types/types'
import { FormattedMessage } from 'react-intl'
import { abbreviation, abbreviationBasic } from '../../utils/utils'
import moment from 'moment'

interface IProps extends ICommonProps {
  blog: any
}

const BlogCarouselCard = (props: IProps) => {
  const { blog } = props

  return (
    <div className='flex flex-row w-full h-[365px] rounded-[15px] bg-white shadow-[0px_4px_19px_rgba(60,19,97,0.11)] p-6'>
      <picture className='max-w-[466px] w-full mr-8'><img
        src={blog?.image}
        alt='blog image'
        className='w-full h-full rounded-[5px] object-cover'
      /></picture>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          <button className='w-[145px] h-[37px] rounded-[5px] bg-purple-lighter'>
            <h5 className='font-poppins-400 text-[15px] text-white leading-[98.3%]'>
              {blog?.category?.name || ''}
            </h5>
          </button>
        </div>
        <h2 className='font-poppins-700 text-[32px] text-purple-light leading-[98.3%] mt-[22px]'>
          {abbreviation(blog?.title || '', 30)}
        </h2>
        <h4 className='font-poppins-400 text-[15px] text-black leading-[98.3%] mt-6'>
          {moment(blog?.createdAt || '').format('MMMM DD, YYYY')} | {`By ${blog?.creator?.username || ''}`}
        </h4>
        <h4 className='font-poppins-400 text-[15px] text-black leading-[98.3%] mt-6 pr-[56px]'>
          {blog?.description || ''}
        </h4>
        <button className='flex flex-row justify-center items-center w-[155px] h-[37px] bg-purple rounded-[5px] mt-8'>
          <h4 className='font-poppins-400 text-[15px] text-white leading-[98.3%]'>
            <FormattedMessage id='page.blog.button.view_post' />
          </h4>
        </button>
      </div>
    </div>
  )
}

export default BlogCarouselCard
