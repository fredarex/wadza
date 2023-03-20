import React from 'react'

const ActivityCardAnimation = () => {
  return (
    <div className='flex flex-row items-center w-full h-[78px] bg-[#DDD7E6] px-7 rounded-lg mb-2'>
      <div className='animate-pulse flex items-center space-x-4 w-full'>
        <div className=' rounded-xl bg-[#D7CEE3] h-6 w-[10%]'></div>
        <div className='flex flex-row items-center w-[24%]'>
          <div className='bg-[#D7CEE3] rounded w-[54px] h-[51px] mr-3'></div>
          <div className='flex flex-col justify-center w-[calc(100%-60px)]'>
            <div className='rounded-xl bg-[#D7CEE3] h-4 w-full mb-2'></div>
            <div className='rounded-xl bg-[#D7CEE3] h-4 w-full'></div>
          </div>
        </div>
        <div className=' rounded-xl bg-[#D7CEE3] h-6 w-[12%]'></div>
        <div className=' rounded-xl bg-[#D7CEE3] h-6 w-[9%]'></div>
        <div className=' rounded-xl bg-[#D7CEE3] h-6 w-[10%]'></div>
        <div className=' rounded-xl bg-[#D7CEE3] h-6 w-[10%]'></div>
        <div className=' rounded-xl bg-[#D7CEE3] h-6 w-[12%]'></div>
      </div>
    </div>
  )
}

export default ActivityCardAnimation
