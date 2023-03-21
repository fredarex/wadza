import React, { useState } from 'react'
import Image from 'next/image'
import { ICommonProps } from '../../../types/types'
import ArrowUpIcon from '../../../assets/svg/arrow_up.svg'
import { ArrowDownSvgIcon } from '../../icons'

interface IProps extends ICommonProps {
  title: any
  show?: boolean
  children?: any
}

const ActivitySector = (props: IProps) => {
  const { title, show, children, className } = props
  const [_show, setShow] = useState<boolean>(show || false)

  return (
    <div className={`w-full -sm:mb-2 ${className}`}>
      <div
        className=' ease-in duration-100 cursor-pointer'
       
      >
        <div className='flex font-poppins-600 -sm:bg-[#FAFAFA] border-b pr-[20px]'>
          {title}
        </div>
        <div className='sm:hidden text-center' onClick={() => setShow(!_show)} >{_show? null : (<div className='font-bold p-1'>More <Image
            src={ArrowUpIcon}
            alt='arrow up icon'
            width={8}
            height={5}
          /></div>)}
        {/* {_show? (
          <Image
            src={ArrowUpIcon}
            alt='arrow up icon'
            width={8}
            height={5}
          />
        ) : (
          <ArrowDownSvgIcon color='white' width={8} height={5} />
        )} */}
        </div>
      </div>
      {_show && (
        <div className='sm:hidden -sm:bg-[#FAFAFA] max-h-[335px] py-[10px] px-[20px] rounded-sm'>
          {children}
          <div className='text-center'
          onClick={() => setShow(!_show)} >{_show? (<div className='font-bold p-1'>Less</div>) : ''}
          </div>
        </div>
      )}
    </div>
  )
}

export default ActivitySector;
