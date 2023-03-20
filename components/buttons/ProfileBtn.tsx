import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'
import { Switch } from '@headlessui/react'
import { UserSvgIcon, HeartSvgIcon, LayoutSvgIcon, SettingsAltSvgIcon, MoonSvgIcon, DocumentSvgIcon, ArrowDownSvgIcon, EyeSvgIcon, WalletSvgIcon, LogoutSvgIcon } from '../icons'
import { ICommonProps } from '../../types/types'
import NavbarDropdown from '../dropdowns/NavbarDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { logoutSuccess, setAddFundsModal, setAdditionalDetails, setConnectWalletsModal, setLoginModal, setMyWalletModal, setNightMode } from '../../redux/features/userSlice'
import AddFundsModal from '../modals/AddFundsModal'
import MyWalletModal from '../modals/MyWalletModal'

const styles = {
  switch: 'relative inline-flex items-center h-[18px] w-[38px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
  switchHandle: 'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-[#818181] shadow-lg ring-0 transition duration-200 ease-in-out',
  li: 'flex flex-row justify-start items-center w-full h-[33px] bg-white border hover:shadow-md hover:border-t hover:border-t-slate-100 hover:scale-[1.05] ease-in duration-150 delay-[75] pl-[13px] cursor-pointer rounded-sm',
  liSwitch: 'flex flex-row justify-between items-center w-full h-[33px] bg-white border hover:shadow-md hover:border-t hover:border-t-slate-100 hover:scale-[1.05] ease-in duration-150 delay-[75] px-[13px] cursor-pointer rounded-sm',
}

const ProfileBtn = (props: ICommonProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const intl = useIntl()
  const _user = useSelector((state: RootState) => state.user)
  const [user, setUser] = useState<any>({})
  const [dropdown, setDrowpdown] = useState<boolean>(false)

  useEffect(() => {
    setUser(_user)
  }, [_user])

  const gotoAccount = () => {
    if (user?.user?.walletAddress) {
      router.push({ pathname: '/account', })
      setDrowpdown(false)
    } else {
      dispatch(setConnectWalletsModal(true))
    }
  }

  const gotoFavorite = () => {
    if (user?.user?.walletAddress) {
      router.push({ pathname: '/account', query: { 'tab': 'favorites', }, })
      setDrowpdown(false)
    } else {
      dispatch(setConnectWalletsModal(true))
    }
  }

  const gotoMyCollections = () => {
    if (user?.user) {
      router.push({ pathname: '/collections', })
      setDrowpdown(false)
    } else {
      dispatch(setConnectWalletsModal(true))
    }
  }

  const gotoWatchlist = () => {
    if (user?.user) {
      router.push({ pathname: '/rankings', query: { tab: 'watchlist', } })
      setDrowpdown(false)
    } else {
      dispatch(setConnectWalletsModal(true))
    }
  }

  const gotoSettings = () => {
    if (user?.user) {
      router.push({ pathname: '/account/settings', })
      setDrowpdown(false)
    } else {
      dispatch(setConnectWalletsModal(true))
    }
  }

  const changeNightMode = () => {
    dispatch(setNightMode(!user?.night))
  }

  const changeAdditionalDetails = () => {
    dispatch(setAdditionalDetails(!user?.detail))
  }

  const openMyWalletModal = () => {
    if (!user?.user?.walletAddress) {
      dispatch(setConnectWalletsModal(true))
    } else {
      setDrowpdown(false)
      dispatch(setMyWalletModal(true))
    }
  }

  const closeMyWalletModal = () => {
    dispatch(setMyWalletModal(false))
  }

  const closeAddFundsModal = () => {
    dispatch(setAddFundsModal(false))
  }

  const logout = () => {
    dispatch(logoutSuccess('logout'))
    router.push({
      pathname: '/',
    })
  }

  return (
    <section
      className={`relative w-[38px] ${props.className}`}
      onMouseLeave={() => setDrowpdown(false)}
    >
      <button onMouseEnter={() => setDrowpdown(true)} className={`flex justify-center items-center w-full ${dropdown ? 'rounded-t-[19px]' : 'rounded-[19px]'} bg-gray-light h-8`}>
        <ArrowDownSvgIcon color='#424242' width={10} height={6} />
      </button>
      <NavbarDropdown show={dropdown}>
        <ul
          className='absolute right-0 w-[230px] bg-gray-light p-[5px] rounded-[4px_0_4px_4px]'
        >
          <li className={styles.li} onClick={() => gotoAccount()}>
            <span className='mr-3'>
              <UserSvgIcon color='#424242' width={12} height={13} />
            </span>
            <h1 className='font-poppins-600 text-[10px] text-black leading-[15px]'>
              <FormattedMessage id='page.home.footer.section.label.profile' />
            </h1>
          </li>
          <li className={styles.li} onClick={() => gotoFavorite()}>
            <span className='mr-3'>
              <HeartSvgIcon color='#424242' width={14} height={12} />
            </span>
            <h1 className='font-poppins-600 text-[10px] text-black leading-[15px]'>
              <FormattedMessage id='page.home.footer.section.label.favorites' />
            </h1>
          </li>
          <li className={styles.li} onClick={() => gotoMyCollections()}>
            <span className='mr-3'>
              <LayoutSvgIcon color='#424242' width={13} height={13} />
            </span>
            <h1 className='font-poppins-600 text-[10px] text-black leading-[15px]'>
              <FormattedMessage id='page.home.footer.section.label.my_collections' />
            </h1>
          </li>
          <li className={styles.li} onClick={() => gotoWatchlist()}>
            <span className='mr-3'>
              <EyeSvgIcon color='#424242' width={13} height={9} />
            </span>
            <h1 className='font-poppins-600 text-[10px] text-black leading-[15px]'>
              <FormattedMessage id='page.home.footer.section.label.watchlist' />
            </h1>
          </li>
          <li className={styles.li} onClick={() => gotoSettings()}>
            <span className='mr-3'>
              <SettingsAltSvgIcon color='#424242' width={15} height={15} />
            </span>
            <h1 className='font-poppins-600 text-[10px] text-black leading-[15px]'>
              <FormattedMessage id='page.home.footer.section.label.setting' />
            </h1>
          </li>
          <li className={styles.li} onClick={() => openMyWalletModal()}>
            <span className='mr-3'>
              <WalletSvgIcon color='#424242' width={14} height={13} />
            </span>
            <h1 className='font-poppins-600 text-[10px] text-black leading-[15px]'>
              <FormattedMessage id='page.profile_button.label.wallet' />
            </h1>
          </li>
          {user?.user && <li className={styles.li} onClick={() => logout()}>
            <span className='mr-3'>
              <LogoutSvgIcon color='#424242' width={14} height={13} />
            </span>
            <h1 className='font-poppins-600 text-[10px] text-black leading-[15px]'>
              <FormattedMessage id='page.navbar.profile.button.logout' />
            </h1>
          </li>}
          <li className={styles.liSwitch}>
            <div className='flex'>
              <span className='mr-3'>
                <MoonSvgIcon color='#424242' width={14} height={14} />
              </span>
              <h1 className='font-poppins-600 text-[10px] text-black leading-[15px]'>
                <FormattedMessage id='page.home.navbar.menu.profile.night_mode' />
              </h1>
            </div>
            <Switch
              checked={user?.night}
              onChange={() => changeNightMode()}
              className={`${user?.night ? 'bg-[#B4B4B4]' : 'bg-[#D9D9D9]'} ${styles.switch}`}
            >
              <span className="sr-only">Night mode setting</span>
              <span
                aria-hidden="true"
                className={`${user?.night ? 'translate-x-[20px]' : 'translate-x-0'} ${styles.switchHandle}`}
              />
            </Switch>
          </li>
          <li className={styles.liSwitch}>
            <div className='flex'>
              <span className='mr-3'>
                <DocumentSvgIcon color='#424242' width={13} height={16} />
              </span>
              <h1 className='font-poppins-600 text-[10px] text-black leading-[15px]'>
                <FormattedMessage id='page.home.navbar.menu.profile.additional_details' />
              </h1>
            </div>
            <Switch
              checked={user?.detail}
              onChange={() => changeAdditionalDetails()}
              className={`${user?.detail ? 'bg-[#B4B4B4]' : 'bg-[#D9D9D9]'} ${styles.switch}`}
            >
              <span className="sr-only">Night mode setting</span>
              <span
                aria-hidden="true"
                className={`${user?.detail ? 'translate-x-[20px]' : 'translate-x-0'} ${styles.switchHandle}`}
              />
            </Switch>
          </li>
        </ul>
      </NavbarDropdown>
      <MyWalletModal
        isOpen={user?.myWalletModal}
        title={intl.formatMessage({'id': 'page.modal.my_wallet.title'})}
        close={() => closeMyWalletModal()}
      />
      <AddFundsModal
        isOpen={user?.addFundsModal}
        title={intl.formatMessage({'id': 'page.modal.add_funds.title'})}
        close={() => closeAddFundsModal()}
      />
    </section>
  )
}

export default ProfileBtn
