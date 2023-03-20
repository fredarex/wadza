import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Image from 'next/image'
import SubscribeBox from '../boxes/SubscribeBox'
import {
  TelegramSvgIcon,
  FacebookSvgIcon,
  TwitterSvgIcon,
  RedditSvgIcon
} from '../icons'
import LogoFooter from '../../assets/main/logo_footer.webp'
import Ethereum from '../../assets/svg/ethereum.svg'
import Visa from '../../assets/svg/visa.svg'
import { IMenu } from '../../types/types'
import FooterMenuCard from '../cards/FooterMenuCard'
import Link from 'next/link'
import constants from '../../utils/constants'

const styles = {
  socialButton: 'flex justify-center items-center w-9 h-9 bg-purple rounded-[6px] mr-[13px] hover:bg-purple/[0.85] ease-in duration-100'
}

const Footer = () => {
  const intl = useIntl()
  const { MENUS } = constants()

  return (
    <div className='bg-[#ECECEC] mt-[101px] sm:mt-[112px] pt-[49px] sm:pt-10 px-[25px] sm:px-0'>
      <div className='flex justify-center items-center'>
        <div className='flex-col max-w-[1250px] w-full'>
          <div className='sm:flex justify-between items-center'>
            <div className='flex-col sm:max-w-[465px] w-full'>
              <div className='flex font-poppins-400 text-[19px] sm:text-[27px] text-black leading-[104.3%] uppercase'>
                <FormattedMessage id='page.home.footer.section.label.stay_in_the' />&nbsp;
                <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ 'id': 'page.home.footer.section.label.loop' }) }} className='font-poppins-600 text-purple' />
              </div>
              <div className='font-poppins-400 text-[14px] sm:text-[13px] text-black leading-[21px] sm:leading-[20px] mt-[6px] mb-[19px] sm:mb-[30px]'>
                <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ 'id': 'page.home.footer.section.description.1' }) }} />
              </div>
              <SubscribeBox />
            </div>
            <div className='flex-col sm:max-w-[558px] w-full mt-[55px] sm:mt-0'>
              <div className='flex font-poppins-400 text-[19px] sm:text-[27px] text-black leading-[104.3%] uppercase'>
                <FormattedMessage id='page.home.footer.section.label.join_the' />&nbsp;
                <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ 'id': 'page.home.footer.section.label.community' }) }} className='font-poppins-600 text-purple' />
              </div>
              <div className='max-w-[318px] w-full font-poppins-400 text-sm sm:text-[13px] text-black leading-[21px] sm:leading-[20px] mt-[5px] sm:mt-[6px] mb-5 sm:mb-[30px]'>
                <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ 'id': 'page.home.footer.section.description.2' }) }} />
              </div>
              <div className='flex'>
                <button className={styles.socialButton}>
                  <TelegramSvgIcon color='#ECECEC' />
                </button>
                <button className={styles.socialButton}>
                  <FacebookSvgIcon color='#ECECEC' />
                </button>
                <button className={styles.socialButton}>
                  <TwitterSvgIcon color='#ECECEC' />
                </button>
                <button className={styles.socialButton}>
                  <RedditSvgIcon color='#ECECEC' />
                </button>
              </div>
            </div>
          </div>
          <hr className='border-solid border-[#D1D1D1] mt-[58px] sm:mt-[59px] mb-9 sm:mb-[52px]' />
          <div className='flex flex-col sm:flex-row justify-start mb-[50px] sm:mb-[97px]'>
            <div className='flex-col sm:max-w-[251px] w-full sm:mr-[74px]'>
              <Image
                src={LogoFooter}
                alt='logo footer'
                className='w-[184px] sm:w-[223px] h-[42px] sm:h-[51px]'
              />
              <div className='font-poppins-400 text-sm sm:text-xs text-black leading-[21px] sm:leading-[18px] mt-[18px]'>
                <FormattedMessage id='page.home.footer.section.description.3' />
              </div>
              <div className='flex mt-[19px] sm:mt-[34px]'>
                <button className='flex justify-center items-center max-w-[138px] w-full h-[29px] bg-white rounded-[6px] mr-4'>
                  <Image
                    src={Ethereum}
                    alt='ethereum icon'
                    width={12}
                    height={20}
                    className='mr-[9px]'
                  />
                  <div className='font-poppins-400 text-[11px] text-[#6A577B] leading-4'>
                    <FormattedMessage id='page.home.footer.section.button.ethereum_network' />
                  </div>
                </button>
                <button className='flex justify-center items-center max-w-[66px] w-full h-[29px] bg-white rounded-[6px]'>
                  <Image
                    src={Visa}
                    alt='ethereum icon'
                    width={46}
                    height={15}
                  />
                </button>
              </div>
            </div>
            <div className='max-w-[999px] w-full grid grid-cols-2 md:grid-cols-4 gap-x-1.5'>
              {MENUS.length > 0 && MENUS.map((menu: IMenu, index: number) => (
                <FooterMenuCard key={index} title={menu.title} menus={menu.menus} />
              ))}
            </div>
          </div>
          <hr className='border-solid border-[#D1D1D1] mb-[20px]' />
          <div className='flex flex-col sm:flex-row justify-between mb-[41px] font-poppins-400 text-sm sm:text-[11px] text-black leading-[21px] sm:leading-4'>
            © 2022 Wadza
            <div className='flex justify-start sm:justify-end mt-[9px] sm:mt-0'>
              <Link href={`/#`} className='hover:text-purple'>
                <FormattedMessage id='page.home.footer.section.label.privacy_policy' />
              </Link>
              <Link href={`/#`} className='ml-6 hover:text-purple'>
                <FormattedMessage id='page.home.footer.section.label.terms_of_service' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
