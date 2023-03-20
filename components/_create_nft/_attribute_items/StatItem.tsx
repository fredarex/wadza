import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ICommonProps, INftStatsData } from '../../../types/types'

interface IProps extends ICommonProps {
  stat: INftStatsData
}

const StatItem = (props: IProps) => {
  const { stat, className } = props

  return (
    <section className={`flex flex-row justify-between items-center w-full h-[38px] bg-[#E2DCEA] border hover:border hover:border-solid hover:border-[rgba(139,110,174,0.33)] font-poppins-700 text-xs leading-[98.3%] px-[14px] mb-[7px] rounded-[3px] ${className}`}>
      <span className='text-purple-lighter'>
        {stat.trait_type}
      </span>
      <span className='font-poppins-400 text-[#181818] mt-1'>
        {stat.value?.amount}&nbsp;
        <FormattedMessage id='page.nft.creation.label.of' />&nbsp;
        {stat.value?.total}
      </span>
    </section>
  )
}

export default StatItem
