import React from 'react'

const RankingCollectionAnimationCard = () => {
  return (
    <div className='flex flex-row justify-end items-center w-full h-[97px] pr-[27px] bg-[#DDD7E5] mt-[10px] rounded-lg cursor-pointer'>
      <div className='animate-pulse space-x-4 flex items-center w-full h-full px-6 py-[15px] my-[10px]'>
        <div className='bg-[#D7CEE3] max-w-[55px] sm:max-w-[71px] w-full h-[60px] sm:h-[67px] mr-[10px] sm:mr-[22px] object-cover rounded'>
        </div>
        <div className='flex-col w-[24.2%]'>
          <div className='flex flex-row items-center w-full'>
            <div className='w-full h-4 bg-[#D7CEE3] rounded'>
            </div>
          </div>
        </div>
        <div className='flex w-[15.4%] items-center'>
          <div className='w-full h-4 bg-[#D7CEE3] rounded'>
          </div>
        </div>
        <div className='flex w-[15.4%] items-center'>
          <div className='w-full h-4 bg-[#D7CEE3] rounded'>
          </div>
        </div>
        <div className='flex w-[15.8%] items-center'>
          <div className='w-full h-4 bg-[#D7CEE3] rounded'>
          </div>
        </div>
        <div className='flex w-[7%] items-center'>
          <div className='w-full h-4 bg-[#D7CEE3] rounded'>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-full h-4 bg-[#D7CEE3] rounded'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RankingCollectionAnimationCard
