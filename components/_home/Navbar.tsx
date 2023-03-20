import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'
import { isMobile } from 'react-device-detect'
import Logo from '../../assets/main/logo.webp'
import LogoMobile from '../../assets/svg/logo_mobile.svg'
import SearchBox from '../boxes/SearchBox'
import ProfileBtn from '../buttons/ProfileBtn'
import WalletConnectBtn from '../buttons/WalletConnectBtn'
import MainBtn from '../buttons/MainBtn'
import LoginModal from '../modals/LoginModal'
import WalletsModal from '../modals/WalletsModal'
import { CategoryData } from '../../mock/CategoryData'
import { IMockCategory } from '../../types/types'
import NavbarDropdown from '../dropdowns/NavbarDropdown'
import CurrencyExchangeBtn from '../buttons/CurrencyExchangeBtn'
import ShoppingCartBtn from '../buttons/ShoppingCartBtn'
import EmailLoginModal from '../modals/EmailLoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setConnectWalletsModal, setLoginModal } from '../../redux/features/userSlice'
import EmailSignupModal from '../modals/EmailSignupModal'
import VerifyEmailModal from '../modals/VerifyEmailModal'

const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const _user: any = useSelector((state: RootState) => state.user)
  const [user, setUser] = useState<any>({})
  const [_isMobile, setIsMobile] = useState<boolean>(false)
  const [border, setBorder] = useState<string>('')
  const [emailLoginModal, setEmailLoginModal] = useState<boolean>(false)
  const [emailSignupModal, setEmailSignupModal] = useState<boolean>(false)
  const [emailVerifyModal, setEmailVerifyModal] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')

  const [overlay, setOverlay] = useState<boolean>(false)
  const intl = useIntl()
  const [showDropdown, setShowDropdown] = useState({
    explorer: false,
    stats: false,
    resources: false,
  })

  useEffect(() => {
    setUser(_user)
  }, [_user])

  useEffect(() => {
    setIsMobile(isMobile)
    const changeOverlay = () => {
      if (window.scrollY >= 30) {
        setOverlay(true)
        setBorder('border border-grey-light')
      } else {
        setOverlay(false)
        setBorder('')
      }
    }

    window.addEventListener('scroll', changeOverlay)

    return () => {
      window.removeEventListener('scroll', changeOverlay)
    }
  }, [])

  const handleStats = (link: string) => {
    router.push({ pathname: link })
    setShowDropdown({ ...showDropdown, stats: false, })
  }

  const openLoginModal = () => {
    dispatch(setLoginModal(true))
  }

  const openWalletsModal = () => {
    dispatch(setLoginModal(false))
    dispatch(setConnectWalletsModal(true))
  }

  const openEmailLoginModal = () => {
    dispatch(setLoginModal(false))
    setEmailLoginModal(true)
  }

  const openEmailSignupModal = () => {
    dispatch(setLoginModal(false))
    setEmailSignupModal(true)
  }

  const gotoCreate = () => {
    if (user?.user) {
      router.push({
        pathname: `/asset/create`,
      })
    } else {
      dispatch(setConnectWalletsModal(true))
    }
  }

  return (
    <div className={`fixed left-0 top-0 w-full ${_isMobile? 'h-[51px]' : 'h-[77px]'} z-10 ease-in duration-100 border-b border-gray-light ${overlay ? 'bg-white' : ''}`}>
      <div className='max-w-[1250px] h-full m-auto flex justify-between items-center px-[26px] sm:py-4 sm:px-0 text-white'>
        {/* Logo */}
        <Link href='/' className='mr-16'>
          <Image
            src={_isMobile ? LogoMobile : Logo}
            alt={`logo`}
            width={_isMobile? 94 : 145}
            height={_isMobile? 17 : 41}
            priority
          />
        </Link>
        
        {/* Search box */}
        <SearchBox
          className={`hidden md:flex rounded-full bg-white ${border}`}
          searchButtonClass='p-2'
          searchIconClass='w-[21px] h-[21px]'
          inputBoxClass='placeholder:text-gray bg-white'
          placeholder={intl.formatMessage({ id: 'page.home.navbar.search.placeholder' })}
        />
        
        {/* Main menu */}
        <ul className='hidden md:flex font-poppins-400 text-black text-[15px]'>
          <li
            className='relative cursor-pointer hover:text-purple mt-4'
            onMouseEnter={() => setShowDropdown({ ...showDropdown, explorer: true, stats: false, resources: false, })}
            onMouseLeave={() => setShowDropdown({ ...showDropdown, explorer: false, })}
          >
            <Link href={`/explore-collections`} className='p-4'>
              <FormattedMessage id='page.home.navbar.menu.explore' />
            </Link>
            <NavbarDropdown show={showDropdown.explorer}>
              <ul
                className='absolute left-[-12px] bg-white mt-4 p-2 w-48 divide-y divide-gray-100 rounded-md'
              >
                <li onClick={() => {
                  router.push({ pathname: '/assets', })
                  setShowDropdown({ ...showDropdown, explorer: false, })
                }}>
                  <Link
                    className='text-black hover:bg-purple hover:text-white py-2 px-4 block ease-in duration-200'
                    href={`/assets`}
                  >{`All NFTs`}</Link>
                </li>
                {CategoryData.length > 0 && CategoryData.map((category: IMockCategory, index: number) => (
                  <li key={index}>
                    <a
                      className='text-black hover:bg-purple hover:text-white py-2 px-4 block ease-in duration-200'
                      href='#'
                    >{category.label}</a>
                  </li>
                ))}
              </ul>
            </NavbarDropdown>
          </li>
          <li
            className='relative cursor-pointer hover:text-purple mt-4'
            onMouseEnter={() => setShowDropdown({ ...showDropdown, explorer: false, stats: true, resources: false })}
            onMouseLeave={() => setShowDropdown({ ...showDropdown, stats: false, })}
          >
            <Link href={`/rankings`} className='p-4'>
              <FormattedMessage id='page.home.navbar.menu.stats' />
            </Link>
            <NavbarDropdown show={showDropdown.stats}>
              <ul
                className='absolute left-[-12px] bg-white mt-4 p-2 w-36 divide-y divide-gray-100 rounded-md'
              >
                <li onClick={() => handleStats('/rankings')} className='text-black hover:bg-purple hover:text-white py-2 px-4 block ease-in duration-200'>
                  Rankings
                </li>
                <li onClick={() => handleStats('/activity')} className='text-black hover:bg-purple hover:text-white py-2 px-4 block ease-in duration-200'>
                  Activity
                </li>
              </ul>
            </NavbarDropdown>
          </li>
          <li
            className='relative cursor-pointer hover:text-purple mt-4'
            onMouseEnter={() => setShowDropdown({ ...showDropdown, resources: true, stats: false, explorer: false, })}
            onMouseLeave={() => setShowDropdown({ ...showDropdown, resources: false, })}
          >
            <Link href={`/learn`} className='hover:text-purple'>
              <FormattedMessage id='page.home.navbar.menu.resources' />
            </Link>
            <NavbarDropdown show={showDropdown.resources}>
              <ul
                className='absolute left-[-12px] bg-white mt-4 p-2 w-36 divide-y divide-gray-100 rounded-md'
              >
                <li onClick={() => {
                  router.push({ pathname: '/learn', })
                  setShowDropdown({ ...showDropdown, resources: false, })
                }}>
                  <Link
                    className='text-black hover:bg-purple hover:text-white py-2 px-4 block ease-in duration-200'
                    href={`/learn`}
                  >{`Learn`}</Link>
                </li>
                <li onClick={() => {
                  router.push({ pathname: '/blog', })
                  setShowDropdown({ ...showDropdown, resources: false, })
                }}>
                  <Link
                    className='text-black hover:bg-purple hover:text-white py-2 px-4 block ease-in duration-200'
                    href={`/blog`}
                  >{`Blog`}</Link>
                </li>
              </ul>
            </NavbarDropdown>
          </li>
          <li className='p-4'>
            <h4 onClick={() => gotoCreate()} className='hover:text-purple cursor-pointer'>
              <FormattedMessage id='page.home.navbar.menu.create' />
            </h4>
          </li>
        </ul>

        {/* Shopping cart */}
        <ShoppingCartBtn />
        
        {/* Profile button */}
        <ProfileBtn className='hidden md:block ml-[10px]' />

        {/* Wallet connect button */}
        <WalletConnectBtn className='hidden md:block ml-[10px]' onClick={() => openLoginModal()} />

        {/* Currency exchange button */}
        <CurrencyExchangeBtn className='hidden md:flex ml-[10px]' />

        {/* Language button */}
        <MainBtn onClick={() => router.push('/ar')} caption='العربية' className='ml-[10px]' />
      </div>
      <LoginModal
        isOpen={user?.loginModal}
        title='Log in to your account'
        close={() => dispatch(setLoginModal(false))}
        openWalletsModal={() => openWalletsModal()}
        openEmailLoginModal={() => openEmailLoginModal()}
        openEmailSignupModal={() => openEmailSignupModal()}
      />
      <WalletsModal
        isOpen={user?.connectWalletsModal}
        title='Connect your wallet'
        close={() => dispatch(setConnectWalletsModal(false))}
      />
      <EmailLoginModal
        isOpen={emailLoginModal}
        title={intl.formatMessage({'id': 'page.navbar.email_login.modal.title'})}
        close={() => setEmailLoginModal(false)}
      />
      <EmailSignupModal
        isOpen={emailSignupModal}
        title={intl.formatMessage({'id': 'page.navbar.email_signup.modal.title'})}
        close={() => setEmailSignupModal(false)}
        openVerifyEmailModal={setEmailVerifyModal}
        setEmail={setEmail}
      />
      <VerifyEmailModal
        isOpen={emailVerifyModal}
        title={intl.formatMessage({'id': 'page.navbar.verify_email.modal.title'})}
        close={() => setEmailVerifyModal(false)}
        email={email || ''}
      />
    </div>
  )
}

export default Navbar
