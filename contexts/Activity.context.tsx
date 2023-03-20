import React, {createContext, useCallback, useContext, useState} from 'react'
import { IActivityContextValue, IContextProviderProps, IFilterOption, IMockCollection } from '../types/types'
import { useRouter } from 'next/router'

const activityCtxDefaultValue:IActivityContextValue = {
  onFilterSidebar: true,
  setOnFilterSidebar: onFilterSidebar => {},
  eventTypes: [],
  setEventTypes: eventTypes => {},
  filterParams: '',
  setFilterParams: filterParams => {},
  eventTypeFilterOptions: [],
  setEventTypeFilterOptions: eventTypeFilterOptions => {},
  handleEventTypeFilter: (e: React.MouseEvent<HTMLElement>, filterOption: IFilterOption) => {},
  collectionOptions: [],
  setCollectionOptions: collectionOptions => {},
  handleCollectionOptionFilter: (e: React.MouseEvent<HTMLElement>, collection: IMockCollection) => {},
  collectionFilterOptions: [],
  setCollectionFilterOptions: collectionFilterOptions => {},
}

const ActivityContext = createContext(activityCtxDefaultValue)

const ActivityProvider = (props: IContextProviderProps) => {
  const { children } = props
  const router = useRouter()
  const [onFilterSidebar, setOnFilterSidebar] = useState(activityCtxDefaultValue.onFilterSidebar)
  const [eventTypes, setEventTypes] = useState(activityCtxDefaultValue.eventTypes)
  const [collectionOptions, setCollectionOptions] = useState(activityCtxDefaultValue.collectionOptions)
  const [filterParams, setFilterParams] = useState(activityCtxDefaultValue.filterParams) // Whole filter params
  const [eventTypeFilterOptions, setEventTypeFilterOptions] = useState(activityCtxDefaultValue.eventTypeFilterOptions) // Array of event type options
  const [collectionFilterOptions, setCollectionFilterOptions] = useState(activityCtxDefaultValue.collectionFilterOptions) // Array of collection type options

  const handleEventTypeFilter = useCallback((e: React.MouseEvent<HTMLElement>, filterOption: IFilterOption) => {
    e.preventDefault()
    e.stopPropagation()

    // add event type to eventTypes to show on the navbar
    if (eventTypes?.length > 0) {
      const _eventTypes = eventTypes.filter((type: IFilterOption) => type.value === filterOption.value)
      if (_eventTypes.length > 0) {
        const _changedTypes = eventTypes.filter((type: IFilterOption) => type.value !== filterOption.value)
        setEventTypes(_changedTypes)
      } else {
        setEventTypes([
          ...eventTypes,
          filterOption,
        ])
      }
    } else {
      setEventTypes([
        ...eventTypes,
        filterOption,
      ])
    }

    let _params = filterParams

    if (eventTypeFilterOptions.includes(filterOption.value)) {
      // remove from eventTypeFilterOptions
      const _options = eventTypeFilterOptions.filter(option => option !== filterOption.value)
      setEventTypeFilterOptions([..._options])

      // remove from filterParams
      let _pA = _params.split('&')
      _pA = _pA.filter(p => !p.includes(filterOption.value))
      _params = _pA.join('&')
      setFilterParams(_params)
    } else {
      // add to eventTypeFilterOptions
      const _options = [
        ...eventTypeFilterOptions,
        filterOption.value
      ]
      setEventTypeFilterOptions([..._options])

      // add to filterParams
      if (_params === '') {
        _options.map((option: string, index: number) => {
          _params = `search[eventType][${index}]=${option}`
        })
      } else {
        // remove from event type filter params
        let _pA = _params.split('&')
        _pA = _pA.filter(p => !p.includes('search[eventType]'))

        _params = _pA.join('&')
        
        // add new event type filter params
        _options.map((option: string, index: number) => {
          _params = _params === ''? `search[eventType][${index}]=${option}` : _params + `&search[eventType][${index}]=${option}`
        })
      }
  
      setFilterParams(_params)
    }

    router.push({
      pathname: `/activity`,
      query: _params
    }, undefined, { scroll: false })
  }, [eventTypeFilterOptions, filterParams, router])

  const handleCollectionOptionFilter = useCallback((e: React.MouseEvent<HTMLElement>, collection: IMockCollection) => {
    e.preventDefault()
    e.stopPropagation()

    let _params = filterParams

    if (collectionFilterOptions.includes(collection.slug!)) {
      // remove from collectionFilterOptions
      const _options = collectionFilterOptions.filter(option => option !== collection.slug)
      setCollectionFilterOptions([..._options])

      // remove from filterParams
      let _pA = _params.split('&')
      _pA = _pA.filter(p => !p.includes(collection.slug!))
      _params = _pA.join('&')
      setFilterParams(_params)
    } else {
      // add to collectionFilterOptions
      const _options = [
        ...collectionFilterOptions,
        collection.slug!,
      ]
      setCollectionFilterOptions([..._options])

      // add to filterParams
      if (_params === '') {
        _options.map((option: string, index: number) => {
          _params = `search[collection][${index}]=${option}`
        })
      } else {
        // remove from event type filter params
        let _pA = _params.split('&')
        _pA = _pA.filter(p => !p.includes('search[collection]'))

        _params = _pA.join('&')
        
        // add new event type filter params
        _options.map((option: string, index: number) => {
          _params = _params === ''? `search[collection][${index}]=${option}` : _params + `&search[collection][${index}]=${option}`
        })
      }
  
      setFilterParams(_params)
    }

    router.push({
      pathname: `/activity`,
      query: _params
    }, undefined, { scroll: false })
  }, [collectionFilterOptions, filterParams, router])
  
  const value = {
    onFilterSidebar,
    setOnFilterSidebar,
    eventTypes,
    setEventTypes,
    filterParams,
    setFilterParams,
    eventTypeFilterOptions,
    setEventTypeFilterOptions,
    handleEventTypeFilter,
    collectionOptions,
    setCollectionOptions,
    handleCollectionOptionFilter,
    collectionFilterOptions,
    setCollectionFilterOptions,
  }
  
  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  )
}

export const useActivity = () => useContext(ActivityContext) as IActivityContextValue
export default ActivityProvider
