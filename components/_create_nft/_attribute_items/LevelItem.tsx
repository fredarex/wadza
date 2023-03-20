import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ICommonProps, INftStatsData } from '../../../types/types'

interface IProps extends ICommonProps {
  level: INftStatsData
}

const LevelItem = (props: IProps) => {
  const { level, className } = props

  return (
    <section className={`flex flex-col w-full h-[64px] bg-[#E2DCEA] border hover:border hover:border-solid hover:border-[rgba(139,110,174,0.33)] font-poppins-700 text-xs leading-[98.3%] px-[14px] pt-[11px] mb-[7px] rounded-[3px] ${className}`}>
      <div className='flex flex-row justify-between items-center'>
        <span className='text-purple-lighter'>
          {level.trait_type}
        </span>
        <span className='font-poppins-400 text-[#181818] mt-1'>
          {level.value?.amount}&nbsp;
          <FormattedMessage id='page.nft.creation.label.of' />&nbsp;
          {level.value?.total}
        </span>
      </div>
      <div className='h-[10px] bg-[#D0C6DC] rounded-xl mt-[11px]'>
        <div className='h-full bg-purple-lighter rounded-xl' style={{width: `${Number(level.value?.amount) * 100 / Number(level.value?.total) > 100? 100 : Number(level.value?.amount) * 100 / Number(level.value?.total)}%`}}>
        </div>
      </div>
    </section>
  )
}

export default LevelItem
