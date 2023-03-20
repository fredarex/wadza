import React from 'react'
import Image from 'next/image'
import { ICommonProps, IMockCollection } from '../../../types/types'
import VerifiedMarkIcon from '../../../assets/svg/verified_mark.svg'
import { abbreviation } from '../../../utils/utils'

interface IProps extends ICommonProps {
  collection: IMockCollection
  id: string
  name: string
  checked?: boolean,
  onMobile?: boolean,
  onClick: (e: any) => void
}

const CollectionCheckbox = (props: IProps) => {
  const { collection, id, name, checked, onClick, className,onMobile } = props

  return (
    <label htmlFor={id} onClick={(e) => onClick(e)} className={`flex flex-row justify-between mb-[2px] ${onMobile ? 'py-2':'p-2'} ${!onMobile &&"hover:bg-slate-50"} cursor-pointer ease-in duration-100`}>
      <div className='flex flex-row justify-start items-center'>
        <picture><img
          src={collection?.logoImage? collection.logoImage : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
          alt='collection logo image'
          className='w-[18px] h-[18px] object-cover rounded-sm mr-[10px]'
        /></picture>
        <span className='font-poppins-400 text-xs text-black-lighter leading-[98.3%] mr-[7px]'>
          {abbreviation(collection?.name, 12)}
        </span>
        {collection?.isVerified && <Image
          src={VerifiedMarkIcon}
          alt='verified mark icon'
          className='w-3 h-3'
        />}
      </div>
      <div className='flex flex-row justify-end items-center'>
        <span className='font-poppins-400 text-xs text-[#C1C1C1] leading-[98.3%] mr-2'>
          {collection?.listingsCount?.toLocaleString('en-US') || 0}
        </span>
        <input type={'checkbox'} id={id} name={name} checked={checked} readOnly className={`form-check-input appearance-none w-[18px] h-[18px] border-none rounded-sm  ${onMobile ? 'bg-white':'bg-[#F0F0F0]'}  checked:bg-purple transition duration-200 cursor-pointer`} />
      </div>
    </label>
  )
}

export default CollectionCheckbox
