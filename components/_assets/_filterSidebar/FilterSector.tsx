import React, { useState } from 'react'
import Image from 'next/image'
import { ICommonProps } from '../../../types/types'
import ArrowUpIcon from '../../../assets/svg/arrow_up.svg'
import { ArrowDownSvgIcon } from '../../icons'

interface IProps extends ICommonProps {
  title: string
  show?: boolean
  children?: any
}

const FilterSector = (props: IProps) => {
  const { title, show, children, className } = props
  const [_show, setShow] = useState<boolean>(show || false)

  return (
    <div className={`max-w-[262px] w-full ${className}`}>
      <div
        className='flex flex-row justify-between items-center h-8 bg-purple-light px-[14px] rounded-sm hover:bg-purple active:bg-purple-lighter ease-in duration-100 cursor-pointer'
        onClick={() => setShow(!_show)}
      >
        <span className='font-poppins-600 text-xs text-white leading-[98.3%]'>
          {title}
        </span>
        {_show? (
          <Image
            src={ArrowUpIcon}
            alt='arrow up icon'
            width={8}
            height={5}
          />
        ) : (
          <ArrowDownSvgIcon color='white' width={8} height={5} />
        )}
      </div>
      {_show && (
        <div className='max-h-[335px] bg-white p-[6px] rounded-sm'>
          {children}
        </div>
      )}
    </div>
  )
}

export default FilterSector
