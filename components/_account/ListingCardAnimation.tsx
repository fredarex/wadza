import React from 'react'

const ListingCardAnimation = () => {
  return (
    <section className='flex flex-col max-w-[290px] w-full h-[240px] md:h-[347px] bg-white rounded-[26px] px-[14px] pt-[14px]'>
      <div className='animate-pulse flex flex-col w-full h-full'>
        <div className='bg-[#D7CEE3] rounded-[15px] w-full h-[80%]'>
        </div>
        <div className='flex flex-row justify-between items-center w-full pt-4 pb-5'>
          <div className='flex flex-col w-[70%]'>
            <div className='bg-[#D7CEE3] w-[90%] h-4 rounded mb-1'>
            </div>
            <div className='bg-[#D7CEE3] w-[90%] h-4 rounded'>
            </div>
          </div>
          <div className='flex flex-col w-[30%] items-end'>
            <div className='bg-[#D7CEE3] w-[100%] h-4 rounded mb-1'>
            </div>
            <div className='bg-[#D7CEE3] w-[100%] h-4 rounded'>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ListingCardAnimation
