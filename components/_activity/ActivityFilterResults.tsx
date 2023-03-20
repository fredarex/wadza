import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { getActivityData } from '../../api/collection'
import { useActivity } from '../../contexts/Activity.context'
import { ICommonProps } from '../../types/types'
import { getCryptoPrice } from '../../utils/utils'
import ActivityCard from './ActivityCard'
import ActivityCardAnimation from './ActivityCardAnimation'

interface IProps extends ICommonProps {
  
}

const getWindowSize = () => {
  const { innerWidth } = window
  return { innerWidth }
}

const animations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const ActivityFilterResults = (props: IProps) => {
  const { className } = props
  const { onFilterSidebar, eventTypes, collectionFilterOptions } = useActivity()
  const [_width, setWidth] = useState<string>('max-w-[959px] w-full')
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [ethPrice, setEthPrice] = useState<string>('')

  const getETHPrice = async () => {
    const _usdPrice = await getCryptoPrice()
    if (_usdPrice) {
      setEthPrice(Number(_usdPrice).toFixed(2))
    }
  }

  useEffect(() => {
    getETHPrice()
  }, [])

  const getActivities = async (data: any) => {
    setLoading(true)
    const getResult = await getActivityData(data)
    if (!getResult?.data?.error && getResult?.data?.data) {
      const _activities = getResult.data.data as any[] || []
      if (_activities.length > 0) {
        const sortedActivities = _activities.sort((prev: any, next: any) => Number(new Date(next.updatedAt).getTime()) - Number(new Date(prev.updatedAt).getTime()))
        setActivities(sortedActivities)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    let types: string[] = []
    if (eventTypes.length > 0) {
      for (const eventType of eventTypes) {
        types = [
          ...types,
          eventType.value,
        ]
      }
    }

    getActivities({
      eventTypes: types,
      collections: collectionFilterOptions,
    })
  }, [eventTypes, collectionFilterOptions])

  useEffect(() => {
    const handleWindowResize = () => {
      const { innerWidth } = getWindowSize()
      if (innerWidth >= 1024)
        setWidth('max-w-[959px] w-full md:grid-cols-3')
      else
        setWidth('max-w-[1250px] w-full sm:grid-cols-3 md:grid-cols-4')
    }

    window.addEventListener('resize', handleWindowResize)
    
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    if (!onFilterSidebar)
      setWidth('max-w-[1250px] w-full sm:grid-cols-3 md:grid-cols-4')
    else
      setWidth('max-w-[959px] w-full md:grid-cols-3')
  }, [onFilterSidebar])

  return (
    <div className={`${className} ${_width} bg-purple-lightest min-h-[calc(100vh-200px)] px-6 pb-[17px] overflow-y-auto rounded`}>
      <div className='flex justify-between items-center w-full h-[52px] px-6 mb-[17px] border-b-2 border-solid border-[#DDD7E5] font-poppins-400 text-xs text-black leading-[98.3%]'>
        <div className='flex flex-row w-[12%] items-center'>
        </div>
        <div className='flex flex-row w-[26%] items-center'>
          <h5 className='first-letter:uppercase'>
            <FormattedMessage id='page.shopping_cart.modal.label.item' />
          </h5>
        </div>
        <div className='flex flex-row w-[14%] items-center'>
          <h5 className='first-letter:uppercase'>
            <FormattedMessage id='page.assets.filter.sidebar.price' />
          </h5>
        </div>
        <div className='flex flex-row w-[10%] items-center'>
          <h5 className='first-letter:uppercase'>
            <FormattedMessage id='page.assets.filter.sidebar.quantity' />
          </h5>
        </div>
        <div className='flex flex-row w-[12%] items-center'>
          <h5 className='first-letter:uppercase'>
            <FormattedMessage id='page.nft_detail.history.from' />
          </h5>
        </div>
        <div className='flex flex-row w-[12%] items-center'>
          <h5 className='first-letter:uppercase'>
            <FormattedMessage id='page.nft_detail.history.to' />
          </h5>
        </div>
        <div className='flex flex-row w-[14%] items-center'>
          <h5 className='first-letter:uppercase'>
            <FormattedMessage id='page.activity.results.header.label.time' />
          </h5>
        </div>
      </div>
      <div className={`${className} ${_width} flex flex-col`}>
        {activities?.length! > 0 && !loading? activities?.map((activity: any, index: number) => (
          <ActivityCard key={index} activity={activity} ethPrice={ethPrice} />
        )) : animations.map((a: number, index: number) => (
          <ActivityCardAnimation key={index} />
        ))}
      </div>
    </div>
  )
}

export default ActivityFilterResults
