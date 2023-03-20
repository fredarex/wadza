import React, { useEffect, useState } from 'react'
import { useAssets } from '../../contexts/Assets.context'
import { ICommonProps } from '../../types/types'
import NftCard from '../cards/NftCard'
import LoaderIcon from '../../assets/svg/loader.svg'
import Image from 'next/image'
import moment from 'moment'

interface IProps extends ICommonProps {
  listings?: any
}

const getWindowSize = () => {
  const { innerWidth } = window
  return { innerWidth }
}

const FilterResults = (props: IProps) => {
  const { className, listings } = props
  const { onFilterSidebar } = useAssets()
  const [_width, setWidth] = useState<string>('max-w-[959px] w-full')
  const [_listings, setListings] = useState<Array<any>>([])
  const [loadedTime, setLoadedTime] = useState<string>('')

  useEffect(() => {
    setListings(listings.filteredListings)

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
  }, [listings])

  useEffect(() => {
    if (!onFilterSidebar)
      setWidth('max-w-[1250px] w-full sm:grid-cols-3 md:grid-cols-4')
    else
      setWidth('max-w-[959px] w-full md:grid-cols-3')
  }, [onFilterSidebar])

  useEffect(() => {
    const now = new Date()

    const interval = setInterval(() => {
      const passed = moment(new Date()).diff(now)
      if (passed > 0) {
        const diffDuration = moment.duration(passed)

        const months = diffDuration.months()
        const days = diffDuration.days()
        const hours = diffDuration.hours()
        const minutes = diffDuration.minutes()
        const seconds = diffDuration.seconds()

        let _loadedTime: string = ''
        if (months > 0) {
          _loadedTime = `${months} months`
        } else if (days > 0) {
          _loadedTime = `${days} days`
        } else if (hours > 0) {
          _loadedTime = `${hours} hours`
        } else if (minutes > 0) {
          _loadedTime = `${minutes} minutes`
        } else if (seconds > 0) {
          _loadedTime = `${seconds} seconds`
        }

        setLoadedTime(_loadedTime)
      }
    }, 1000)
    
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={`${className} ${_width} bg-purple-lightest min-h-[calc(100vh-200px)] px-6 py-[17px] overflow-y-auto rounded`}>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex'>
          <Image
            src={LoaderIcon}
            alt='loader icon'
            className='mr-2 cursor-pointer'
          />
          <span className='font-poppins-400 text-xs text-black-lighter leading-[98.3%]'>
            {`Updated ${loadedTime} ago`}
          </span>
        </div>
        <span className='font-poppins-600 text-xs text-black-lighter leading-[98.3%]'>
          {`${_listings.length.toLocaleString('en-US')} items`}
        </span>
      </div>
      <div className={`${className} ${_width} grid justify-center all-nft-container grid-cols-2 gap-[9px]`}>
        {_listings?.length! > 0 && _listings?.map((listing: any, index: number) => (
          <NftCard key={index} listing={listing} collection={listing?.collectionId} />
        ))}
      </div>
    </div>
  )
}

export default FilterResults
