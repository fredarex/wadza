import React from 'react'
import { FormattedMessage } from 'react-intl'

const Referral = () => {
  return (
    <div className='flex justify-center items-center mt-[63px]'>
      <div className='sm:flex justify-around items-center max-w-[1250px] w-full h-[458px] sm:h-[232px] bg-purple sm:rounded-[15px] shadow-[0_10px_10px_rgba(0,0,0,0.05)] pt-9 px-[25px] sm:p-10'>
        <div className='flex-col sm:mr-14'>
          <div className='flex font-poppins-600 text-[22px] sm:text-3xl text-white uppercase leading-[104.3%]'>
            <FormattedMessage id='page.home.referral.program.section.label.referral' />
            <div className='font-poppins-400'>
              &nbsp;<FormattedMessage id='page.home.referral.program.section.label.program' />
            </div>
          </div>
          <div className='font-poppins-600 sm:font-poppins-400 text-base sm:text-[15px] text-white leading-6 sm:leading-[22px] mt-[9px] sm:mt-[5px]'>
            <FormattedMessage id='page.home.referral.program.section.description.1' />
          </div>
          <div className='font-poppins-400 text-sm sm:text-xs text-white mt-[19px] sm:mt-2 leading-[21px] sm:leading-[18px]'>
            <FormattedMessage id='page.home.referral.program.section.description.2' />
          </div>
          <button className='flex justify-center items-center max-w-[174px] sm:max-w-[169px] w-full h-[38px] sm:h-[29px] rounded-[19px] bg-[#512D72] sm:bg-white/[0.11] mt-[22px] sm:mt-5 hover:bg-white/[0.15] active:bg-white/[0.08] ease-in-out duration-100'>
            <div className='font-poppins-600 text-[15px] sm:text-xs text-white leading-[22px] sm:leading-[18px]'>
              <FormattedMessage id='page.home.referral.program.section.button.join' />
            </div>
          </button>
        </div>
        <div className='flex justify-center items-center bg-purple-light max-w-[340px] sm:max-w-[525px] w-full h-[108px] sm:h-[152px] rounded-[11px] backdrop-blur-[12.5px] mt-[33px] sm:mt-0'>
          <div className='flex-col mr-6'>
            <div className='font-poppins-400 text-white text-sm sm:text-[11px] leading-[21px] sm:leading-4'>
              <FormattedMessage id='page.home.referral.program.section.label.absolutely_payments' />:
            </div>
            <div className='flex relative justify-center items-center w-[151px] sm:w-[233px] h-[45px] sm:h-[65px] bg-white/[0.17] rounded-lg mt-[6px] sm:mt-2 pl-4 sm:pl-5 pr-[13px] sm:pr-11 shadow-[0_10px_10px_rgba(0,0,0,0.05)]'>
              <div className='absolute top-[50%] translate-y-[-50%]'>
                <div className='flex items-end'>
                  <div className='font-poppins-800 text-[25px] sm:text-4xl text-white leading-[104.3%] mr-1 sm:mr-2'>
                    {`2356.11`}
                  </div>
                  <div className='font-poppins-600 text-sm sm:text-lg text-white leading-[21px] sm:leading-[27px] uppercase'>
                    {`USD`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-col'>
            <div className='font-poppins-400 text-white text-sm sm:text-[11px] leading-[21px] smleading-4'>
              <FormattedMessage id='page.home.referral.program.section.label.referrals_attracted' />
            </div>
            <div className='flex relative justify-center items-center w-[140px] sm:w-[209px] h-[45px] sm:h-[65px] bg-white/[0.17] rounded-lg mt-[6px] sm:mt-2 pl-[13px] sm:pl-5 pr-4 sm:pr-11 shadow-[0_10px_10px_rgba(0,0,0,0.05)]'>
              <div className='absolute top-[50%] translate-y-[-50%]'>
                <div className='flex items-end'>
                  <div className='font-poppins-800 text-[25px] sm:text-4xl text-white leading-[104.3%] mr-[6px] sm:mr-2 uppercase'>
                    {`400+`}
                  </div>
                  <div className='font-poppins-600 text-sm sm:text-lg text-white leading-[21px] sm:leading-[27px]'>
                    <FormattedMessage id='page.home.referral.program.section.label.users' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Referral
