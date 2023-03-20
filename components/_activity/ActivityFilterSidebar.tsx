import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useActivity } from '../../contexts/Activity.context'
import constants from '../../utils/constants'
import { ICommonProps, IFilterOption, IMockCollection } from '../../types/types'
import { CollectionCheckbox, FilterSector, StatusCheckbox } from '../_assets/_filterSidebar'
import SearchBox from '../boxes/SearchBox'
import { getAllCollections } from '../../api/collection'
import { RootState } from '../../redux/store'
import { setAllCollections, setCollectionsBySearch } from '../../redux/features/collectionSlice'

const getWindowSize = () => {
  const { innerWidth } = window
  return { innerWidth }
}

interface IProps extends ICommonProps {

}

const ActivityFilterSidebar = (props: IProps) => {
  const { className } = props
  const intl = useIntl()
  const dispatch = useDispatch()
  const { onFilterSidebar, eventTypeFilterOptions, handleEventTypeFilter, collectionFilterOptions, handleCollectionOptionFilter } = useActivity()
  const [_show, setShow] = useState<string>('block')
  const { EVENTS_OPTIONS } = constants()
  const [filteredCollections, setFilteredCollections] = useState<any[]>([])
  const _filteredCollections: any[] = useSelector((state: RootState) => state.collection.filteredCollections)!

  useEffect(() => {
    const getCollections = async () => {
      try {
        if (_filteredCollections && _filteredCollections.length > 0) {
          setFilteredCollections(_filteredCollections)
        } else {
          const getResult = await getAllCollections()
          if (!getResult?.data?.error && getResult?.data?.data) {
            const _collections = getResult.data.data      
            setFilteredCollections(_collections)
            dispatch(setAllCollections(_collections))
          }
        }
      } catch (err: any) {
        console.log('error :: ', err)
      }
    }

    getCollections()

    const handleWindowResize = () => {
      const { innerWidth } = getWindowSize()
      if (innerWidth >= 1024)
        setShow('block')
      else
        setShow('hidden')
    }

    window.addEventListener('resize', handleWindowResize)
    
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [_filteredCollections, dispatch])

  useEffect(() => {
    setFilteredCollections(_filteredCollections)
  }, [_filteredCollections])

  useEffect(() => {
    if (!onFilterSidebar)
      setShow('hidden')
    else
      setShow('block')
  }, [onFilterSidebar])

  const searchCollection = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCollectionsBySearch(e.target.value))
  }

  return (
    <div className={`${_show} flex flex-col min-w-[282px] max-w-[282px] w-full rounded bg-purple-lightest mr-[9px] py-[9px] pl-[9px] pr-[3px] ${className}`}>
      <div className='min-h-[calc(100vh-200px)] max-h-[calc(100vh-200px)] overflow-y-auto'>
        {/* status filter */}
        <FilterSector title={intl.formatMessage({'id': 'page.activity.filter.sidebar.label.event_type'})} show={true}>
          {EVENTS_OPTIONS.length > 0 && EVENTS_OPTIONS.map((option: IFilterOption, index: number) => (
            <StatusCheckbox
              key={index}
              label={option.label}
              checked={eventTypeFilterOptions.includes(option.value)}
              id={`status-checkbox-${index + 1}`}
              name='status-checkbox'
              onClick={(e) => handleEventTypeFilter(e, option)}
            />
          ))}
        </FilterSector>
        {/* collections filter */}
        <FilterSector title={intl.formatMessage({'id': 'page.assets.filter.sidebar.collections'})} className='mt-3'>
          <div className='pt-[6px] px-2'>
            <SearchBox
              className='rounded-sm bg-[#F0F0F0]'
              searchButtonClass='p-2'
              searchIconClass='w-[18px] h-[18px]'
              inputBoxClass='bg-[#F0F0F0]'
              placeholder={intl.formatMessage({ id: 'page.assets.filter.sidebar.collections.filter' })}
              onChange={searchCollection}
            />
          </div>
          <div className='mt-[14px] max-h-[171px] overflow-y-auto'>
            {filteredCollections.length > 0 && filteredCollections.map((collection: IMockCollection, index: number) => (
              <CollectionCheckbox
                key={index}
                checked={collectionFilterOptions.includes(collection.slug!)}
                collection={collection}
                id={`collection-checkbox-${index + 1}`}
                name='collection-checkbox'
                onClick={(e) => handleCollectionOptionFilter(e, collection)}
              />
            ))}
          </div>
        </FilterSector>
      </div>
    </div>
  )
}

export default ActivityFilterSidebar
