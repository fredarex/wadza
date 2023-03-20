import React from 'react'
import Image from 'next/image'
import { ICommonProps, IMockNotableCollection } from '../../types/types'
import VerifiedMarkIcon from '../../assets/svg/verified_mark.svg'

interface IProps extends ICommonProps {
  collection: IMockNotableCollection
}

const NotableCollectionCard = (props: IProps) => {
  const { collection, className } = props
  return (
    <div className='flex h-[292px] shadow-[0_16px_26px_rgba(0,0,0,0.07)]'>
      <div className='relative flex-col justify-center w-full h-[257px] sm:h-[278px] bg-gray rounded-[10px] bg-white'>
        <Image
          src={collection.coverImage}
          alt='collection image'
          className='rounded-t-[10px] object-cover h-[227px]'
        />
        <div className='absolute bottom-[-12px] sm:bottom-[-14px] h-[52px] sm:h-[83px]'>
          <div className='flex justify-start items-center'>
            <Image
              src={collection.profileImage}
              alt='profile image'
              className='w-[52px] sm:w-[92px] h-[47px] sm:h-[83px] ml-[13px] sm:ml-6 rounded-[4px] mr-[13px] sm:mr-[22px]'
            />
            <div className='font-poppins-400 text-sm sm:text-lg text-black leading-[98.3%] mr-[6px] sm:mr-3 mt-1'>
              {collection.title}
            </div>
            <Image
              src={VerifiedMarkIcon}
              alt='checkbox image'
              className='mt-1 w-[10px] sm:w-[17px] h-[10px] sm:h-[17px]'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotableCollectionCard
