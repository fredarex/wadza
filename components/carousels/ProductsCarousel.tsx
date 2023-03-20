import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, EffectCoverflow } from 'swiper'
import 'swiper/css'
import { FormattedMessage, useIntl } from 'react-intl'

import { Products } from '../../mock/SliderData'
import ArrowBtn from '../buttons/ArrowBtn'
import ProductCard from '../cards/ProductCard'
import { IMockProduct } from '../../types/types'
import { isMobile } from 'react-device-detect'

const getWindowSize = () => {
  const { innerWidth } = window
  return { innerWidth }
}

const ProductsCarousel = () => {
  const intl = useIntl()
  const [title2, setTitle2] = useState<string>('')
  const [_isMobile, setIsMobile] = useState<boolean>(false)

  const [slidesPerView, setSlidesPerView] = useState<number>(4)
  const [slidesPerGroup, setSlidesPerGroup] = useState<number>(4)

  useEffect(() => {
    setTitle2(intl.formatMessage({'id': 'page.home.products.carousel.title.2'}))
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
        } else if (innerWidth >= 1024 && innerWidth < 1280) {
          setSlidesPerView(3)
          setSlidesPerGroup(3)
        } else {
          setSlidesPerView(4)
          setSlidesPerGroup(4)
        }
      }
  
      window.addEventListener('resize', handleWindowResize)
      
      return () => {
        window.removeEventListener('resize', handleWindowResize)
      }
    }
  }, [intl])

  return (
    <div className='mt-[84px] sm:mt-[147px]'>
      <div className='flex flex-col sm:flex-row justify-center items-center text-black font-poppins-400 uppercase text-2xl sm:text-[40px]'>
        <span><FormattedMessage id='page.home.products.carousel.title.1' />&nbsp;</span>
        <div dangerouslySetInnerHTML={{ __html: title2 }} />
      </div>
      <div className='flex justify-center items-center mt-[33px] sm:mt-11'>
        <div className='relative'>
          <div className='max-w-[1250px] w-full'>
            {_isMobile ? (
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={slidesPerView}
                loop={true}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                modules={[EffectCoverflow]}
                className="productsSwiper"
              >
                {Products.length > 0 && Products.map((product: IMockProduct, index: number) => (
                  <SwiperSlide key={index}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <>
                <ArrowBtn direction={`left`} className='absolute top-[43%] left-[-22px] z-[2] custom-swiper-prev-button' />
                  <Swiper
                    slidesPerView={slidesPerView}
                    spaceBetween={16}
                    slidesPerGroup={slidesPerGroup}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    className='productsSwiper'
                    navigation={{
                      prevEl: '.custom-swiper-prev-button',
                      nextEl: '.custom-swiper-next-button',
                    }}
                    speed={2000}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Navigation]}
                  >
                    {Products.length > 0 && Products.map((product: IMockProduct, index: number) => (
                      <SwiperSlide key={index}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <ArrowBtn direction={`right`} className='absolute top-[43%] right-[-22px] z-[2] custom-swiper-next-button' />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsCarousel
