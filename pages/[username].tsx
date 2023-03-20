import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { Menu, Transition } from '@headlessui/react'
import moment from 'moment'
import { RootState } from '../redux/store'
import { abbreviationFormat } from '../utils/utils'
import { getCollectedListings, getCreatedListings, getFavoriteListings } from '../api/listing'
import constants from '../utils/constants'
import { IFilterOption, ITab, ProfileTabsType } from '../types/types'
import { ArrowDownSvgIcon, EthereumSvgIcon, SearchSvgIcon, ShareSvgIcon, ThreeHorizontalSvgIcon } from '../components/icons'
import { NoItems, ListingCard } from '../components/_account'
import UploadIcon from '../assets/svg/upload.svg'
import MenuDirectDownWhiteIcon from '../assets/svg/menu_direct_down_white.svg'
import FilterIcon from '../assets/svg/filter.svg'
import FilterIcon2 from '../assets/svg/filter2.svg'
import { useMetamask } from '../contexts/Metamask.context'

const styles = {
  button: 'flex flex-row justify-center items-center h-[27px] bg-white border hover:border-purple-lighter ease-in duration-150 rounded-lg',
  tab: 'flex px-[42px] mr-2 rounded-t-[10px] hover:bg-purple hover:font-poppins-600 hover:text-white hover:py-5 ease-in duration-200 leading-[98.3%] cursor-pointer',
}

const Account = () => {
  const intl = useIntl()
  const router = useRouter()
  const { query } = router
  const { PROFILE_TABS, SORT_BY } = constants()
  const { chain } = useMetamask()
  const [_isMobile, setIsMobile] = useState<boolean>(false)  
  const [moreOver, setMoreOver] = useState<boolean>(false)
  const [user, setUser] = useState<any>({})
  const _user: any = useSelector((state: RootState) => state.user.user)
  const [tab, setTab] = useState<ProfileTabsType>('collected')
  const [collectedListings, setCollectedListings] = useState<Array<any>>([])
  const [createdListings, setCreatedListings] = useState<Array<any>>([])
  const [favoriteListings, setFavoriteListings] = useState<Array<any>>([])

  // get collected listings
  const _getCollectedListings = useCallback(async (username: string) => {
    const getResult: any = await getCollectedListings(username, chain?.slug || '')
    if (!getResult?.data?.error) {
      const _listings = getResult?.data?.data
      setCollectedListings(_listings)
    }
  }, [chain])

  // get favorite listings
  const _getFavoriteListings = useCallback(async (username: string) => {    
    const getResult: any = await getFavoriteListings(username)
    if (!getResult?.data?.error) {
      const _listings = getResult?.data?.data
      setFavoriteListings(_listings)
    }
  }, [])

  useEffect(() => {
    if (query.username) {
      if (query.tab) {
        const _tab = query.tab as ProfileTabsType
        setTab(_tab)
        if (_tab === 'favorites') {
          _getFavoriteListings(query.username as string)
        } else if (_tab === 'collected') {
          _getCollectedListings(query.username as string)
        }
      } else {
        setTab('collected')
        _getCollectedListings(query.username as string)
      }
    }
  }, [query, _getCollectedListings, _getFavoriteListings])

  useEffect(() => {
    setIsMobile(isMobile)
    setUser(_user)
  }, [_user])

  return (
    <section>
      {/* banner */}
      <div className={`relative flex flex-row justify-center w-full h-[452px] bg-[#DCD7E3] ${_isMobile? 'mt-[51px]' : 'mt-[77px]'}`}>
        {user?.bannerImage && <picture>
          <img
            src={user.bannerImage}
            alt='banner image'
            className='absolute top-0 left-0 w-full h-full object-cover'
          />
        </picture>}
        {/* banner image */}
        <div className='flex flex-col items-center max-w-[925px] w-full h-[414px] border border-dashed border-[#B8A2D2] rounded-[32px] mt-[38px]'>
          <Image
            src={UploadIcon}
            alt='upload icon'
            className='mt-[56px]'
          />
          <h2 className='max-w-[255px] w-full text-center font-poppins-400 text-sm text-[#B8A2D2] leading-[21px] mt-[18px]'>
            <FormattedMessage id='page.profile.banner.description' />
          </h2>
          <button className='flex flex-row justify-center items-center max-w-[228px] w-full h-[37px] bg-[#B8A2D2] hover:bg-purple-lighter rounded-md mt-[25px]'>
            <h3 className='font-poppins-600 text-base text-[#DCD7E3] leading-[98.3%]'>
              <FormattedMessage id='page.profile.banner.button.upload_cover_image' />
            </h3>
          </button>
        </div>
        {/* profile data */}
        <div className='absolute bottom-[-55px] flex flex-row justify-center w-full h-[134px]'>
          <div className='relative flex max-w-[1250px] w-full h-full bg-purple-lightest rounded-[15px]'>
            {/* profile image */}
            <div className='absolute left-[15px] top-[-85px] flex flex-row justify-center items-center max-w-[203px] w-full h-[203px] bg-white rounded-[15px]'>
              {user?.profileImage? (<picture><img 
                src={user.profileImage}
                alt='profileImage image'
                className='max-w-[183px] w-full h-[183px] object-cover rounded-[7px]'
              /></picture>) : (
                <div className='flex flex-row justify-center items-center max-w-[183px] w-full h-[183px] bg-purple-lightest rounded-[7px]'>
                  <Image
                    src={UploadIcon}
                    alt='upload icon'
                    width={72}
                    height={64}
                  />
                </div>
              )}
            </div>
            {/* user data */}
            <div className='flex flex-row justify-between max-w-[995px] w-full ml-[253px]'>
              <div className='pt-8'>
                <h1 className='font-poppins-700 text-[32px] text-black leading-[104.3%]'>
                  {user?.username || 'Unnamed'}
                </h1>
                <div className='flex flex-row items-center mt-[15px] font-poppins-400 text-xs leading-[98.3%]'>
                  <EthereumSvgIcon color='#393939' />
                  <h5 className='ml-[5px]'>
                    {abbreviationFormat(user?.walletAddress, 6, 4)}
                  </h5>
                  &nbsp;-&nbsp;
                  <FormattedMessage id='page.profile.information.joined' />
                  &nbsp;
                  {moment(user?.createdAt).format('MMMM YYYY')}
                </div>
              </div>
              {/* buttons */}
              <div className='flex flex-row justify-end pt-[17px] pr-[17px]'>
                <button className={`${styles.button} w-[27px] mr-[9px]`}>
                  <ShareSvgIcon color='#424242' />
                </button>
                <button className={`${styles.button} w-[130px] mr-[9px]`}>
                  <h3 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                    <FormattedMessage id='page.profile.button.referrals' />
                  </h3>
                </button>
                <button className={`${styles.button} w-[27px]`}>
                  <ThreeHorizontalSvgIcon color='#424242' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body */}
      <div className='mt-[97px]'>
        <div className='flex justify-center px-[25px] sm:px-0'>
          <div className='relative flex justify-center items-center max-w-[1250px] w-full'>
            {/* main header */}
            <div className='w-full h-[37px] bg-[#C7BFD3] rounded-t-[15px]'>
            </div>
            {/* tabs */}
            <ul className='absolute bottom-0 left-[15px] hidden sm:flex items-end'>
              {PROFILE_TABS.length > 0 && PROFILE_TABS.map((_tab: ITab, index: number) => (
                <li key={`tabs-${index}`} onClick={() => router.push({ pathname: '/account', query: { 'tab': _tab.slug, }, }, undefined, { scroll: false })}>
                  <h4 className={`${tab === _tab.slug as ProfileTabsType? 'bg-purple font-poppins-600 text-white py-5' : 'bg-[#DBD6E3] font-poppins-400 text-sm text-[#52307C] py-[18px]' } ${styles.tab}`}>
                    {_tab.name}
                  </h4>
                </li>
              ))}
              <li>
                <h4 className={`flex flex-row justify-center items-center bg-[#DBD6E3] font-poppins-400 text-sm text-[#52307C] py-[18px] ${styles.tab}`} onMouseEnter={() => setMoreOver(true)} onMouseLeave={() => setMoreOver(false)}>
                  <span className='mr-[11px]'>
                    <FormattedMessage id='page.profile.tabs.more' />
                  </span>
                  <ArrowDownSvgIcon color={moreOver? '#FFFFFF' : '#52307C'} width={8} height={5} />
                </h4>
              </li>
            </ul>
            {/* mobile tab */}
            <div className='absolute bottom-0 left-[10px] flex sm:hidden items-end'>
              <h4
                className='flex justify-between items-center w-[172px] sm:hidden py-4 sm:py-5 px-[13px] sm:px-[30px] rounded-t-[10px] bg-purple font-poppins-600 sm:font-poppins-400 text-base sm:text-sm text-white mr-[13px] sm:mr-2'
              >
                <FormattedMessage id='page.profile.tabs.collected' />
                <Image
                  src={MenuDirectDownWhiteIcon}
                  alt='direct down'
                />
              </h4>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='max-w-[1250px] w-full bg-purple-lightest rounded-b-[15px] p-[15px]'>
            {/* filter options */}
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row'>
                <button className='flex flex-row justify-center items-center max-w-[86px] w-full h-[27px] bg-white hover:bg-slate-100 rounded mr-[10px]'>
                  <Image
                    src={FilterIcon}
                    alt='filter icon'
                    width={10}
                    height={10}
                    className='mr-[7px]'
                  />
                  <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                    <FormattedMessage id='page.assets.filter.navbar.button.filters' />
                  </h4>
                </button>
                <div className='flex flex-row w-[346px] h-[27px] bg-white pl-[11px] rounded'>
                  <button className='flex w-auto justify-end items-center mr-[10px]'>
                    <SearchSvgIcon color='#373737' />
                  </button>
                  <input
                    type='text'
                    className={`w-full rounded mr-4 caret-slate-800 text-[12px] text-purple font-poppins-400 focus:outline-none`}
                    placeholder={intl.formatMessage({'id': 'page.profile.search.search_by_name'})}
                  />
                </div>
              </div>
              <div className='flex'>
                <Menu as={'div'} className='relative inline-block'>
                  <div>
                    <Menu.Button className='flex justify-between items-center w-[154px] h-[27px] bg-white pl-3 pr-[10.75px] mr-2 rounded'>
                      <span className='font-poppins-400 text-xs text-black-lighter leading-[98.3%]'>
                        <FormattedMessage id='page.assets.filter.navbar.sortby' />
                      </span>
                      <ArrowDownSvgIcon color='#424242' width={10} height={7} />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={React.Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute z-[1] left-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div className="p-3">
                        {SORT_BY.length > 0 && SORT_BY.map((sort: IFilterOption, index: number) => (
                          <Menu.Item key={index}>
                            <button
                              className='flex w-full items-center font-poppins-400 text-xs text-black-lighter leading-[98.3%] rounded-md px-2 py-2 hover:bg-purple hover:text-white'
                            >
                              {sort.label}
                            </button>
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <button className='flex justify-center items-center w-[28px] h-[27px] bg-white hover:bg-slate-100 mr-2 rounded'>
                  <Image
                    src={FilterIcon2}
                    alt='filter icon'
                    width={13}
                    height={13}
                  />
                </button>
                <button className='flex justify-center items-center w-[28px] h-[27px] bg-white hover:bg-slate-100 rounded'>
                  <Image
                    src={FilterIcon}
                    alt='filter icon'
                    width={14}
                    height={14}
                  />
                </button>
              </div>
            </div>
            {/* filter results */}
            <div className='mt-[17px]'>
              {tab === 'collected'? collectedListings?.length > 0? (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[18px]'>
                  {collectedListings.map((listing: any, index: number) => (
                    <ListingCard key={index} listing={listing} />
                  ))}
                </div>
              ) : <NoItems className='h-[522px] border border-dashed border-[#B8A2D2] rounded-[9px]' /> : <></>}
              {tab === 'created'? createdListings?.length > 0? (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[18px]'>
                  {createdListings.map((listing: any, index: number) => (
                    <ListingCard key={index} listing={listing} />
                  ))}
                </div>
              ) : <NoItems className='h-[522px] border border-dashed border-[#B8A2D2] rounded-[9px]' /> : <></>}
              {tab === 'favorites'? favoriteListings?.length > 0? (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[18px]'>
                  {favoriteListings.map((listing: any, index: number) => (
                    <ListingCard key={index} listing={listing} />
                  ))}
                </div>
              ) : <NoItems className='h-[522px] border border-dashed border-[#B8A2D2] rounded-[9px]' /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Account
