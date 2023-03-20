import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import ArrowBtn from '../buttons/ArrowBtn'
import { Collections } from '../../mock/SliderData'
import { IMockNotableCollection } from '../../types/types'
import NotableCollectionCard from '../cards/NotableCollectionCard'
import { isMobile } from 'react-device-detect'

const getWindowSize = () => {
  const { innerWidth } = window
  return { innerWidth }
}

const NotableCollectionsCarousel = () => {
  const [slidesPerView, setSlidesPerView] = useState<number>(3)
  const [slidesPerGroup, setSlidesPerGroup] = useState<number>(3)
  const [_isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(isMobile)

    if (isMobile) {
      setSlidesPerView(1.5)
      setSlidesPerGroup(1)
    } else {
      const handleWindowResize = () => {
        const { innerWidth } = getWindowSize()
        
        if (innerWidth < 640) {
          setSlidesPerView(1)
          setSlidesPerGroup(1)
        } else if (innerWidth >= 640 && innerWidth < 1024) {
          setSlidesPerView(2)
          setSlidesPerGroup(2)
        } else {
          setSlidesPerView(3)
          setSlidesPerGroup(3)
        }
      }

      window.addEventListener('resize', handleWindowResize)
      
      return () => {
        window.removeEventListener('resize', handleWindowResize)
      }
    }
  }, [])

  return (
    <div className='flex justify-center mt-[41px] sm:mt-[121px]'>
      <div className='relative flex-col justify-start items-center max-w-[1250px] w-full'>
        <div className='sm:flex items-center text-xl sm:text-[27px] uppercase leading-[104.3%] pl-[25px] sm:pl-0'>
          <div className='font-poppins-400 text-black'>
            <FormattedMessage id='page.home.browse.by.notable.collections.section.label.1' />&nbsp;
          </div>
          <div className='flex items-center'>            
            <div className='font-poppins-600 text-purple mr-2 sm:mr-[18px]'>
              <FormattedMessage id='page.home.browse.by.notable.collections.section.label.2' />
            </div>
            <div className='w-[42px] sm:w-[77px] h-[10px] sm:h-[14px] rounded-[6px] bg-purple'></div>
          </div>
        </div>
        <div className='flex justify-center items-center mt-[18px] sm:mt-[37px]'>
          <div className='relative'>
            <ArrowBtn direction={`left`} className='absolute top-[43%] left-[11px] sm:left-[-30px] z-[2] custom-notable-colleciton-swiper-prev-button' />
            <div className='max-w-[1250px] w-full'>
              <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={24}
                slidesPerGroup={slidesPerGroup}
                loop={true}
                loopFillGroupWithBlank={true}
                className='notableCollectionsSwiper'
                navigation={{
                  prevEl: '.custom-notable-colleciton-swiper-prev-button',
                  nextEl: '.custom-notable-colleciton-swiper-next-button',
                }}
                speed={2000}
                modules={[Navigation]}
              >
                {Collections.length > 0 && Collections.map((collection: IMockNotableCollection, index: number) => (
                  <SwiperSlide key={index}>
                    <NotableCollectionCard collection={collection} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <ArrowBtn direction={`right`} className='absolute top-[43%] right-[11px] sm:right-[-30px] z-[2] custom-notable-colleciton-swiper-next-button' />
          </div>
        </div>
        {_isMobile && (
          <div className='absolute w-[calc(100vw/5)] h-[360px] z-[1] top-0 right-0 bg-[linear-gradient(270deg,#FFFFFF_0%,rgba(255,255,255,0)_100%)]'>
            &nbsp;
          </div>
        )}
      </div>
    </div>
  )
}

export default NotableCollectionsCarousel
