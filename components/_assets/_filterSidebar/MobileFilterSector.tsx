import Image from 'next/image'
import React,{useState} from 'react'
import { ICommonProps } from '../../../types/types'
import { ArrowDownSvgIcon} from '../../icons'
import ArrowUpIcon from '../../../assets/svg/arrow_up.svg'


interface IProps extends ICommonProps {
    title: string
    show?: boolean
    children?: any
  }

function MobileFilterSector(props: IProps) {
    const { title, show, children, className } = props
  const [_show, setShow] = useState<boolean>(show || false)
  return (
    <div className={`w-full bg-transparent ${className} border-b border-[#DEDEDE]`}>
    <div
      className='flex flex-row justify-between items-center h-8  ease-in duration-100 cursor-pointer'
      onClick={() => setShow(!_show)}
    >
      <span className='font-poppins-600 text-xs text-[#373737] leading-[98.3%]'>
        {title}
      </span>
      {_show? (
        <Image
          src={ArrowUpIcon}
          alt='arrow up icon'
          width={10}
          height={10}
        />
      ) : (
        <ArrowDownSvgIcon color='white' width={10} height={10} />
      )}
    </div>
    {_show && (
      <div className='max-h-[335px] bg-transparent py-[6px] rounded-sm'>
        {children}
      </div>
    )}
  </div>
  )
}

export default MobileFilterSector