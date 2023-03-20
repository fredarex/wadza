import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ReferralBannerImage from '../../assets/main/referral_banner.webp'
import { FormattedMessage, useIntl } from 'react-intl'
import { EthereumSvgIcon, LinkSvgIcon, UserPlusSvgIcon, Vector4SvgIcon, Vector5SvgIcon } from '../../components/icons'

const Referrals = () => {
  const intl = useIntl()
  const router = useRouter()

  const join = () => {
    router.push({
      pathname: `/referrals/dashboard`
    })
  }

  return (
    <section className='relative w-full mt-[77px]'>
      <Image
        src={ReferralBannerImage}
        alt='referral banner image'
        className='absolute top-0 w-full'
      />
      <div className='relative w-full'>
        <div className='flex justify-center items-center w-[50%] h-[665px] ml-[50%]'>
          <div className='flex flex-col items-start'>
            <h1 className='max-w-[326px] w-full font-poppins-700 text-[40px] text-purple leading-[120%]'>
              <FormattedMessage id='page.referrals.banner.title' />
            </h1>
            <h3 className='max-w-[279px] w-full font-poppins-400 text-[18px] text-purple leading-[120%] mt-[13px]'>
              <FormattedMessage id='page.referrals.banner.desc' />
            </h3>
            <button onClick={() => join()} className='flex flex-row justify-center items-center w-[234px] h-[38px] bg-purple rounded-[19px] mt-[38px] hover:bg-purple-light hover:shadow-sm hover:scale-[1.02] active:scale-[1]'>
              <h4 className='font-poppins-600 text-[15px] text-white leading-[22px]'>
                <FormattedMessage id='page.referrals.button.join_now' />
              </h4>
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='font-poppins-700 text-[32px] text-purple leading-[120%]'>
            <FormattedMessage id='page.referrals.label.how_it_works' />
          </h1>
          <h3 className='font-poppins-400 text-[18px] text-purple leading-[120%] mt-[6px]'>
            <FormattedMessage id='page.referrals.how_it_works.desc' />
          </h3>
          <div className='flex flex-row mt-10 space-x-[41px]'>
            <div className='flex flex-col justify-center items-center w-[389px] h-[352px] bg-white rounded-[9px] shadow-[0px_10px_27px_rgba(0,0,0,0.1)]'>
              <div className='flex flex-row justify-center items-center w-[89px] h-[89px] bg-purple rounded-full'>
                <UserPlusSvgIcon color='white' width={45} height={43} />
              </div>
              <h2 className='font-poppins-700 text-5 text-purple leading-[120%] mt-6'>
                <FormattedMessage id='page.referrals.how_it_works.block1.title' />
              </h2>
              <h3 className='max-w-[273px] w-full text-center font-poppins-400 text-[18px] text-purple leading-[27px] mt-[11px]'>
                <FormattedMessage id='page.referrals.how_it_works.block1.desc' />
              </h3>
            </div>
            <div className='flex flex-col justify-center items-center w-[389px] h-[352px] bg-white rounded-[9px]'>
              <div className='flex flex-row justify-center items-center w-[89px] h-[89px] bg-purple rounded-full'>
                <LinkSvgIcon color='white' width={43} height={43} />
              </div>
              <h2 className='font-poppins-700 text-5 text-purple leading-[120%] mt-6'>
                <FormattedMessage id='page.referrals.how_it_works.block2.title' />
              </h2>
              <h3 className='max-w-[273px] w-full text-center font-poppins-400 text-[18px] text-purple leading-[27px] mt-[11px]'>
                <FormattedMessage id='page.referrals.how_it_works.block2.desc' />
              </h3>
            </div>
            <div className='flex flex-col justify-center items-center w-[389px] h-[352px] bg-white rounded-[9px]'>
              <div className='flex flex-row justify-center items-center w-[89px] h-[89px] bg-purple rounded-full'>
                <EthereumSvgIcon color='white' width={30} height={50} />
              </div>
              <h2 className='font-poppins-700 text-5 text-purple leading-[120%] mt-6'>
                <FormattedMessage id='page.referrals.how_it_works.block3.title' />
              </h2>
              <h3 className='max-w-[273px] w-full text-center font-poppins-400 text-[18px] text-purple leading-[27px] mt-[11px]'>
                <FormattedMessage id='page.referrals.how_it_works.block3.desc' />
              </h3>
            </div>
          </div>
          <div className='relative flex flex-col justify-center items-center max-w-[1250px] w-full h-[232px] bg-purple rounded-[15px] mt-[108px] mb-10'>
            <div className='absolute top-0 left-[131px]'>
              <Vector4SvgIcon color='white' />
            </div>
            <h1 className='flex flex-row font-poppins-400 text-[30px] text-white leading-[104.3%] uppercase'>
              <div
                dangerouslySetInnerHTML={{ __html: intl.formatMessage({ 'id': 'page.referrals.become_an_affiliate.title' }) }}
              />
            </h1>
            <h3 className='flex flex-row font-poppins-400 text-[15px] text-white leading-[22px] mt-1'>
              <FormattedMessage id='page.referrals.become_an_affiliate.desc' />
            </h3>
            <button onClick={() => join()} className='flex flex-row justify-center items-center w-[248px] h-10 bg-[rgba(255,255,255,0.11)] rounded-[19px] mt-6 hover:bg-purple-light hover:shadow-sm hover:scale-[1.02] active:scale-[1] duration-150'>
              <h3 className='font-poppins-600 text-xs text-white leading-[18px]'>
                <FormattedMessage id='page.referrals.become_an_affiliate.button.become_an_affiliate' />
              </h3>
            </button>
            <div className='absolute top-0 right-0'>
              <Vector5SvgIcon color='white' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Referrals
