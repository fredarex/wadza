import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Image from 'next/image'
import DotCurve from '../../assets/svg/dot_curve.svg'
import Visa from '../../assets/main/visa.webp'
import { Guides } from '../../mock/SliderData'
import { IMockGuide } from '../../types/types'
import GuideCard from '../cards/GuideCard'
import { isMobile } from 'react-device-detect'
import ArrowBtn from '../buttons/ArrowBtn'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

const WadzaIntroduction = () => {
  const intl = useIntl()
  const [_isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(isMobile)
  }, [])

  return (
    <div className='flex justify-center mt-[57px] sm:mt-[187px]  '>
      <div className='relative max-w-[1250px] w-full h-[954px] sm:h-[528px] bg-purple sm:rounded-[15px] shadow-sm'>
        <div className=' absolute top-[-14px] sm:top-[-71px] left-[25px] sm:left-[42px] max-w-[340px] min-[391px]:max-w-[calc(100vw-50px)] sm:max-w-[1165px] w-full'>
          <div className='flex-col  '>
            <div className='relative sm:flex max-w-[1165px] w-full h-[386px] sm:h-[217px] bg-[#53317D] rounded-[9px] shadow-sm'>
              <div className='flex-col pt-[38px] sm:pt-[44px] pl-7 sm:pl-[67px] max-w-[520px] w-full'>
                <div className='flex font-poppins-400 text-[22px] sm:text-[33px] text-white leading-[104.3%] uppercase'>
                  <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({'id': 'page.home.introduction.section.label.new_to_nfts'}) }} />
                </div>
                <div className='flex font-poppins-400 text-sm sm:text-[13px] text-white leading-[21px] sm:leading-[20px] mt-[9px]'>
                  <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({'id': 'page.home.introduction.section.description.1'}) }} />
                </div>
                <button className='bg-white/[0.11] px-[71px] sm:px-[61px] py-[7px] font-poppins-600 text-[15px] sm:text-xs text-white leading-[22px] sm:leading-[18px] rounded-[30px] mt-[23px] sm:mt-4 hover:bg-white/[0.08]'>
                  <FormattedMessage id='page.home.referral.program.section.button.join' />
                </button>
              </div>
              <div className='absolute sm:relative bottom-0 flex max-w-[730px] w-full justify-center'>
                <div className='flex items-end'>
                  <Image
                    src={DotCurve}
                    alt='dot curve image'
                    className='w-[43px] sm:w-[72px] h-[82px] sm:h-[140px]'
                  />
                </div>
                <div className='flex justify-center items-center max-w-[186px] sm:max-w-[317px] w-full h-[81px] sm:h-[139px] bg-[rgba(60,19,97,0.31)] px-7 sm:px-12 mb-11 sm:mb-0 backdrop-blur-[11px] rounded-[6px] rotate-[-15deg]'>
                  <Image
                    src={Visa}
                    alt='visa image'
                    className='w-[129px] sm:w-[220px] h-[42px] sm:h-[72px]'
                  />
                </div>
              </div>
            </div>
            <div className='max-w-[1165px] w-full h-[528px] sm:h-[311px] bg-[#53317D] rounded-[9px] shadow-sm mt-[23px] sm:mt-[29px]'>
              <div className='flex flex-col sm:flex-row'>
                <div className='flex-col pt-8 sm:pt-[66px] pl-7 sm:pl-[67px] sm:max-w-[320px] w-full'>
                  <div
                    dangerouslySetInnerHTML={{ __html: intl.formatMessage({ 'id': 'page.home.introduction.section.label.nft_basics' }) }}
                    className='font-poppins-400 text-[22px] sm:text-[33px] text-white uppercase leading-[104.3%]'
                  />
                  <div className='font-poppins-400 text-sm sm:text-[13px] text-white leaidng-[21px] sm:leading-5 mt-[9px] sm:max-w-[150px] w-full'>
                    <FormattedMessage id='page.home.introduction.section.description.2' />
                  </div>
                  <button className='bg-white/[0.11] px-[43px] py-[7px] font-poppins-600 text-[15px] sm:text-xs text-white leading-[22px] sm:leading-[18px] rounded-[30px] mt-[22px] hover:bg-white/[0.08]'>
                    <FormattedMessage id='page.home.introduction.section.button.learn_more' />
                  </button>
                </div>
                {_isMobile ? (
                  <div className='flex justify-center items-center mt-[34px]'>
                    <div className='relative'>
                      <ArrowBtn direction={`left`} className='absolute top-[43%] left-[0] sm:left-[-30px] z-[2] custom-guides-swiper-prev-button bg-[#8B6EAE]' />
                      <div className='max-w-[1250px] w-full'>
                        <Swiper
                          slidesPerView={1.3}
                          spaceBetween={24}
                          slidesPerGroup={1}
                          loop={true}
                          loopFillGroupWithBlank={true}
                          className='guidesSwiper'
                          navigation={{
                            prevEl: '.custom-guides-swiper-prev-button',
                            nextEl: '.custom-guides-swiper-next-button',
                          }}
                          speed={2000}
                          modules={[Navigation]}
                        >
                          {Guides.length > 0 && Guides.map((guide: IMockGuide, index: number) => (
                            <SwiperSlide key={index}>
                              <GuideCard guide={guide} className='h-[296px]' />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                      <ArrowBtn direction={`right`} className='absolute top-[43%] right-[-20px] sm:right-[-30px] z-[2] custom-guides-swiper-next-button bg-[#8B6EAE]' />
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-center items-center py-5'>
                    {Guides.length > 0 && Guides.map((guide: IMockGuide, index: number) => (
                      <div key={index}>
                        <GuideCard guide={guide} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WadzaIntroduction
