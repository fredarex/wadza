import React from 'react'
import Image from 'next/image'
import { IAttribute, ICommonProps, INftAttributeData, INftStatsData } from '../../types/types'
import PlusIcon from '../../assets/svg/plus.svg'
import MainDescription from '../form/MainDescription'
import { PropertyItem, LevelItem, StatItem } from './_attribute_items'

interface IProps extends ICommonProps {
  attribute: IAttribute
  properties?: INftAttributeData[]
  levels?: INftStatsData[]
  stats?: INftStatsData[]
  onClick?: () => void
}

const AddAttribute = (props: IProps) => {
  const { attribute, properties, levels, stats, onClick, className } = props
  
  return (
    <section className={`pr-[10px] py-[11px] border border-solid border-[rgba(139,110,174,0.33)] rounded-md mb-[13px] ${className}`}>
      <div className={`flex flex-row justify-between pl-4 ${properties?.length! > 0 || levels?.length! > 0 || stats?.length! > 0? 'mb-3' : ''}`}>
        <div className='flex flex-row'>
          <div className='mr-3'>
            <Image
              src={attribute.image}
              alt='attribut icon'
            />
          </div>
          <div className='flex flex-col text-sm text-black-lighter leading-[21px]'>
            <span className='font-poppins-600'>
              {attribute.name}
            </span>
            <MainDescription description={attribute.description} info={attribute.info} className='max-w-[320px] w-full mt-1' />
          </div>
        </div>
        <button onClick={onClick} className='flex flex-row justify-center items-center w-[44px] h-[44px] bg-[#D8CCE7] hover:bg-purple-lighter/50 rounded-[3px]'>
          <Image
            src={PlusIcon}
            alt='plus icon'
          />
        </button>
      </div>
      <div className='pl-[11px]'>
        {attribute.slug === 'properties' && properties?.length! > 0 && properties?.map((property: INftAttributeData, index: number) => (
          <PropertyItem key={index} property={property} />
        ))}
        {attribute.slug === 'levels' && levels?.length! > 0 && levels?.map((level: INftStatsData, index: number) => (
          <LevelItem key={index} level={level} />
        ))}
        {attribute.slug === 'stats' && stats?.length! > 0 && stats?.map((stat: INftStatsData, index: number) => (
          <StatItem key={index} stat={stat} />
        ))}
      </div>
    </section>
  )
}

export default AddAttribute
