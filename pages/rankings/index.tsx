import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'
import { TabItem } from '../../components/_explore_collections'
import { Menu, Transition } from '@headlessui/react'
import { ArrowDownSvgIcon } from '../../components/icons'
import { CategoryData } from '../../mock/CategoryData'
import { IMockCategory, ITab, TimeRangeType } from '../../types/types'
import constants from '../../utils/constants'
import { TopRankings, TrendingRankings, Watchlist } from '../../components/_rankings'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setConnectWalletsModal } from '../../redux/features/userSlice'

const Rankings = () => {
  const router = useRouter()
  const intl = useIntl()
  const dispatch = useDispatch()
  const { TIME_RANGES } = constants()
  const _user: any = useSelector((state: RootState) => state.user.user)
  const [user, setUser] = useState<any>({})
  const _tab = useMemo(() => router.query.tab as string || '', [router])
  const [tab, setTab] = useState<string>('top')
  const [timeRange, setTimeRange] = useState<TimeRangeType>('one_day_volume')
  const [category, setCategory] = useState<IMockCategory>({
    label: intl.formatMessage({'id': 'page.rankings.label.all_categories'}),
    value: 'all_categories',
  })

  useEffect(() => {
    setUser(_user)
  }, [_user])

  useEffect(() => {
    if (_tab) {
      setTab(_tab)
    } else {
      setTab('top')
    }
    setCategory({
      label: intl.formatMessage({'id': 'page.rankings.label.all_categories'}),
      value: 'all_categories',
    })
    setTimeRange('one_day_volume')
  }, [_tab, intl])

  const selectTab = async (_tab: string) => {
    if (_tab === 'top') {
      router.push({ pathname: '/rankings' })
    } else if (_tab === 'watchlist') {
      if (!user) {
        dispatch(setConnectWalletsModal(true))
      } else {
        router.push({
          pathname: '/rankings',
          query: {
            tab: _tab,
          },
        })
      }
    } else {
      router.push({
        pathname: '/rankings',
        query: {
          tab: _tab,
        },
      })
    }
  }

  const handleCategory = (category: IMockCategory) => {
    setCategory(category)
  }

  const handleTimeRange = (slug: TimeRangeType) => {
    setTimeRange(slug)
  }

  return (
    <section className='flex flex-col items-center mt-[50px] ms:mt-[136px]'>
      {/* header */}
      <div className='flex flex-col max-w-[1250px]  w-full'>
        {/* title */}
        <div className='flex flex-row justify-center items-center max-w-[357px] w-full sm:bg-[#DFDBE4] px-13 py-8 rounded-t-[15px]'>
          <span className='font-poppins-700 text-3xl text-black-lighter'>
            <FormattedMessage id='page.rankings.title' />
          </span>
        </div>
        {/* nabvar */}
        <div className='-sm:flex-col flex flex-row justify-between items-center  w-full sm:h-11 sm:bg-purple-lightest rounded-[0_15px_4px_4px] pl-[50px] pr-[20px]'>
          {/* tabs */}
          <div className='flex flex-row items-center -sm:mb-5 h-full  border-b shadow-sm'>
            <TabItem className='mr-[60px] text-black -sm:pb-3' onClick={() => selectTab('top')} selected={tab === 'top'} category={{ label: intl.formatMessage({ 'id': 'page.explore_collections.tabs.top' }), value: 'top' }} />
            <TabItem className='mr-[60px] text-black -sm:pb-3' onClick={() => selectTab('trending')} selected={tab === 'trending'} category={{ label: intl.formatMessage({ 'id': 'page.home.featured.tabs.section.label.trending' }), value: 'trending' }} />
            <TabItem className='text-black -sm:pb-3' onClick={() => selectTab('watchlist')} selected={tab === 'watchlist'} category={{ label: intl.formatMessage({ 'id': 'page.home.footer.section.label.watchlist' }), value: 'watchlist' }} />
          </div>
          {/* sorting */}
          <div className='-sm:flex-col flex flex-row -sm:w-full items-center'>
            {['top', 'trending'].includes(tab) && 
            <Menu as={'div'} className=' -sm:mb-5 -sm:w-full -sm:rounded  sm:inline-block'>
              <div>
                <Menu.Button className='flex justify-between items-center -sm:w-full w-[154px] -sm:h-[40px] h-[27px] bg-white pl-3 pr-[10.75px] mr-2 -md:rounded-2xl'>
                  <span className='font-poppins-400 text-xs text-black-lighter leading-[98.3%]'>
                    {category.label}
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
                <Menu.Items className='absolute z-[2]  sm:left-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className="p-3">
                    <Menu.Item>
                      <button
                        onClick={() => handleCategory({
                          label: intl.formatMessage({'id': 'page.rankings.label.all_categories'}),
                          value: 'all_categories',
                        })}
                        className='flex w-full items-center font-poppins-400 text-xs text-black-lighter leading-[98.3%] rounded-md px-2 py-2 hover:bg-purple hover:text-white'
                      >
                        <FormattedMessage id='page.rankings.label.all_categories' />
                      </button>
                    </Menu.Item>
                    {CategoryData.length > 0 && CategoryData.map((category: IMockCategory, index: number) => (
                      <Menu.Item key={index}>
                        <button
                          onClick={() => handleCategory(category)}
                          className='flex w-full items-center font-poppins-400 text-xs text-black-lighter leading-[98.3%] rounded-md px-2 py-2 hover:bg-purple hover:text-white'
                        >
                          {category.label}
                        </button>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>}
            {['top', 'watchlist'].includes(tab) && <div className='flex -sm:mb-4  flex-row  -sm:rounded-2xl -sm:w-full  items-center -sm:h-[40px]   h-[27px] bg-white rounded-[4px_10px_4px_4px]'>
              {TIME_RANGES.length > 0 && TIME_RANGES.map((time: ITab, index: number) => (
                <div key={index} onClick={() => handleTimeRange(time.slug as TimeRangeType)} className={`-sm:mx-auto flex flex-row justify-center items-center w-9 h-full cursor-pointer ${timeRange === time.slug? 'bg-[#F7F2FE] -sm:bg-[#52307C] ' : ''} `}>
                  <h5 className={`font-poppins-400 text-black text-xs leading-[98.3%] ${timeRange === time.slug? '-sm:text-white ' : ''}`}>
                    {time.name}
                  </h5>
                </div>
              ))}
            </div>}
          </div>
        </div>
      </div>
      {/* body */}
      
      {tab === 'top' && <TopRankings category={category.value} timeRange={timeRange} />}
      {tab === 'trending' && <TrendingRankings category={category.value} />}
      {tab === 'watchlist' && <Watchlist timeRange={timeRange} />}
    </section>
  )
}

export default Rankings
