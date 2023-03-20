import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { ArrowDownSvgIcon, ArrowUpSvgIcon } from '../icons'
import { getTrendingRankingsCollections } from '../../api/collection'
import RankingCollectionCard from './cards/RankingCollectionCard'
import { ICommonProps, IMockCollection } from '../../types/types'
import RankingCollectionAnimationCard from './cards/RankingCollectionAnimationCard'

interface IProps extends ICommonProps {
  category: string
}

const animations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const TrendingRankings = (props: IProps) => {
  const { category, className } = props
  const [collections, setCollections] = useState<any[]>([])
  const staticCollections = useRef(collections)
  const [sortedCollections, setSortedCollections] = useState<any[]>([])

  const [sortBy, setSortBy] = useState<any>({
    volume: true,
    change: false,
    floorPrice: false,
    sales: false,
  })
  const [volumeSort, setVolumeSort] = useState<boolean>(true) // true: sorting from big to small, false: sorting from small to big
  const [changeSort, setChangeSort] = useState<boolean>(true) // true: sorting from big to small, false: sorting from small to big
  const [floorPriceSort, setFloorPriceSort] = useState<boolean>(true) // true: sorting from big to small, false: sorting from small to big
  const [salesSort, setSalesSort] = useState<boolean>(true) // true: sorting from big to small, false: sorting from small to big
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getCollections = async () => {
      setLoading(true)
      const collectionResults = await getTrendingRankingsCollections({
        category,
      })
      if (!collectionResults?.data?.error && collectionResults?.data?.data) {
        const _collections: any[] = collectionResults?.data?.data
        setCollections((prev: any[]) => (
          staticCollections.current = _collections,
          _collections
        ))
        setSortedCollections(_collections)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

    getCollections()
  }, [category])

  const sortByVolume = useCallback(() => {
    setSortBy({
      volume: true,
      change: false,
      floorPrice: false,
      sales: false,
    })
    const _sortedCollections = staticCollections.current.sort((prev, next) => {
      if (volumeSort) {
        return Number(next.rank) - Number(prev.rank)
      } else {
        return Number(prev.rank) - Number(next.rank)
      }
    })
    setSortedCollections(_sortedCollections)
    setVolumeSort((prev) => !prev)
  }, [volumeSort])

  const sortByChange = () => {
    setSortBy({
      volume: false,
      change: true,
      floorPrice: false,
      sales: false,
    })
    let _sortedCollections = staticCollections.current.sort((prev, next) => {
      return Number(prev.rank) - Number(next.rank)
    })
    _sortedCollections = staticCollections.current.sort((prev, next) => {
      if (changeSort) {
        return Number(prev.change) - Number(next.change)
      } else {
        return Number(next.change) - Number(prev.change)
      }
    })
    setSortedCollections(_sortedCollections)
    setChangeSort(!changeSort)
  }

  const sortByFloorPrice = () => {
    setSortBy({
      volume: false,
      change: false,
      floorPrice: true,
      sales: false,
    })
    let _sortedCollections = staticCollections.current.sort((prev, next) => {
      return Number(prev.rank) - Number(next.rank)
    })
    _sortedCollections = _sortedCollections.sort((prev, next) => {
      if (floorPriceSort) {
        return Number(prev.floorPrice) - Number(next.floorPrice)
      } else {
        return Number(next.floorPrice) - Number(prev.floorPrice)
      }
    })
    setSortedCollections(_sortedCollections)
    setFloorPriceSort(!floorPriceSort)
  }

  const sortBySales = () => {
    setSortBy({
      volume: false,
      change: false,
      floorPrice: false,
      sales: true,
    })
    let _sortedCollections = staticCollections.current.sort((prev, next) => {
      return Number(prev.rank) - Number(next.rank)
    })
    _sortedCollections = _sortedCollections.sort((prev, next) => {
      if (salesSort) {
        return Number(prev.sales) - Number(next.sales)
      } else {
        return Number(next.sales) - Number(prev.sales)
      }
    })
    setSortedCollections(_sortedCollections)
    setSalesSort(!salesSort)
  }

  return (
    <div className='flex flex-col max-w-[1250px] w-full mt-2'>
      {/* header */}
      <div className='flex flex-row items-center w-full h-[45px] rounded-t bg-[#DDD7E7] font-poppins-400 text-[13px] text-black leading-[98.3%] pl-[49px]'>
        <div className=' w-4/12'>
          <FormattedMessage id='page.home.featured.tabs.section.label.collection' />
        </div>
        <div className={`flex flex-row items-center w-2/12 cursor-pointer ${sortBy.volume? 'text-black' : 'text-[#878787]'}`} onClick={() => sortByVolume()}>          
          <FormattedMessage id='page.home.featured.tabs.section.label.volume' />
          {sortBy.volume? <span className='ml-2'>
            {volumeSort? <ArrowDownSvgIcon color='#424242' width={10} height={6} /> : <ArrowUpSvgIcon color='#424242' width={10} height={6} />}            
          </span> : <div className='flex flex-col ml-2'>
            <span className='mb-1'>
              <ArrowUpSvgIcon color='#424242' width={5} height={3} />
            </span>
            <span>
              <ArrowDownSvgIcon color='#424242' width={5} height={3} />
            </span>
          </div>}
        </div>
        <div className={`flex flex-row items-center w-2/12 cursor-pointer ${sortBy.change? 'text-black' : 'text-[#878787]'}`} onClick={() => sortByChange()}>
          <span className='mr-1'>
            %
          </span>
          <FormattedMessage id='page.rankings.label.change' />
          {sortBy.change? <span className='ml-2'>
            {changeSort? <ArrowDownSvgIcon color='#424242' width={10} height={6} /> : <ArrowUpSvgIcon color='#424242' width={10} height={6} />}            
          </span> : <div className='flex flex-col ml-2'>
            <span className='mb-1'>
              <ArrowUpSvgIcon color='#424242' width={5} height={3} />
            </span>
            <span>
              <ArrowDownSvgIcon color='#424242' width={5} height={3} />
            </span>
          </div>}
        </div>
        <div className={`flex flex-row items-center w-2/12 cursor-pointer ${sortBy.floorPrice? 'text-black' : 'text-[#878787]'}`} onClick={() => sortByFloorPrice()}>
          <FormattedMessage id='page.nft_detail.modal.offer.label.floor_price' />
          {sortBy.floorPrice? <span className='ml-2'>
            {floorPriceSort? <ArrowDownSvgIcon color='#424242' width={10} height={6} /> : <ArrowUpSvgIcon color='#424242' width={10} height={6} />}            
          </span> : <div className='flex flex-col ml-2'>
            <span className='mb-1'>
              <ArrowUpSvgIcon color='#424242' width={5} height={3} />
            </span>
            <span>
              <ArrowDownSvgIcon color='#424242' width={5} height={3} />
            </span>
          </div>}
        </div>
        <div className={`flex flex-row items-center w-2/12 cursor-pointer ${sortBy.sales? 'text-black' : 'text-[#878787]'}`} onClick={() => sortBySales()}>
          <FormattedMessage id='page.rankings.label.sales' />
          {sortBy.sales? <span className='ml-2'>
            {salesSort? <ArrowDownSvgIcon color='#424242' width={10} height={6} /> : <ArrowUpSvgIcon color='#424242' width={10} height={6} />}            
          </span> : <div className='flex flex-col ml-2'>
            <span className='mb-1'>
              <ArrowUpSvgIcon color='#424242' width={5} height={3} />
            </span>
            <span>
              <ArrowDownSvgIcon color='#424242' width={5} height={3} />
            </span>
          </div>}
        </div>
      </div>
      {/* body */}
      <div className='w-full bg-[#E6E2EC] p-[0_10px_48px_24px] rounded-b-[15px]'>
        {sortedCollections.length > 0 && !loading? collections.map((collection: IMockCollection, index: number) => (
          <RankingCollectionCard
            key={index}
            collection={collection}
          />
        )) : animations.map((a: any, index: number) => (
          <RankingCollectionAnimationCard
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default TrendingRankings
