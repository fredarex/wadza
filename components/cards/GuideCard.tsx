import React from 'react'
import Image from 'next/image'
import { ICommonProps, IMockGuide } from '../../types/types'
import { abbreviation } from '../../utils/utils'
import { FormattedMessage } from 'react-intl'

interface IProps extends ICommonProps {
  guide: IMockGuide
}

const GuideCard = (props: IProps) => {
  const { guide, className } = props

  return (
    <div className={`relative flex justify-center items-center max-w-[267px] w-full sm:h-[271px] rounded-[10px] mr-[11px] ${className}`}>
      <Image
        src={guide.image}
        alt='guide image'
        className='rounded-[10px] h-[296px] sm:h-auto'
      />
      <div className='absolute bottom-0 max-w-[267px] w-full h-[125px] sm:h-[74px] bg-[rgba(124,82,149,0.52)] backdrop-blur-[10px] rounded-b-[10px]'>
        <div className='flex-col pt-3 px-[11px]'>
          <div className='flex flex-col sm:flex-row justify-between text-sm sm:text-[9px] text-white leading-[134.3%]'>
            <div className='font-poppins-600 leading-[124.3%] sm:leading-[134.3%] max-w-[149px] sm:max-w-none w-full'>
              {abbreviation(guide.title, 25)}
            </div>
            <div className='flex justify-center items-center max-w-[103px] sm:max-w-[75px] w-full h-[25px] sm:h-[16px] bg-white/[0.21] rounded font-poppins-400 mt-2 sm:mt-0'>
              {guide.date}
            </div>
          </div>
          <button className='max-w-[246px] w-full h-[29px] sm:h-[25px] bg-white rounded mt-[7px] sm:mt-[11px] font-poppins-600 text-sm sm:text-[10px] text-purple leading-[134.3%] hover:bg-white/[0.79]'>
            <FormattedMessage id='page.home.introduction.section.button.read' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GuideCard
