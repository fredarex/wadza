import React, {createContext, useCallback, useContext, useState} from 'react'
import { useRouter } from 'next/router'
import { IAssetsContextValue, IContextProviderProps, IMockCollection, IPriceFilterOption } from '../types/types'

const assetsCtxDefaultValue:IAssetsContextValue = {
  onFilterSidebar: true,
  setOnFilterSidebar: onFilterSidebar => {},
  filterParams: '',
  setFilterParams: filterParams => {},
  statusFilterOptions: [],
  setStatusFilterOptions: statusFilterOptions => {},
  handleStatusFilter: (e: React.MouseEvent<HTMLInputElement>, status: string) => {},
  priceFilterOptions: {
    currency: 'USD',
    min: '',
    max: '',
  },
  setPriceFilterOptions: priceFilterOptions => {},
  handlePriceFilter: () => {},
  quantityFilterOption: '',
  setQuantityFilterOption: quantityFilterOption => {},
  handleQuantityFilter: (quantityOption: string) => {},
  categoryFilterOptions: [],
  setCategoryFilterOptions: categoryFilterOptions => {},
  handleCategoryFilter: (e: React.MouseEvent<HTMLInputElement>, category: string) => {},
  collectionFilterOptions: [],
  setCollectionFilterOptions: collectionFilterOptions => {},
  handleCollectionFilter: (e: React.MouseEvent<HTMLElement>, collection: IMockCollection) => {},
}

const AssetsContext = createContext(assetsCtxDefaultValue)

const AssetsProvider = (props: IContextProviderProps) => {
  const { children } = props
  const router = useRouter()
  const [onFilterSidebar, setOnFilterSidebar] = useState(assetsCtxDefaultValue.onFilterSidebar)

  const [filterParams, setFilterParams] = useState<string>('') // Whole filter params

  const [statusFilterOptions, setStatusFilterOptions] = useState<string[]>([]) // Array of status options
  const [priceFilterOptions, setPriceFilterOptions] = useState<IPriceFilterOption>({
    currency: 'USD',
    min: '',
    max: '',
  })
  const [quantityFilterOption, setQuantityFilterOption] = useState<string>('single_items')
  const [categoryFilterOptions, setCategoryFilterOptions] = useState<string[]>([]) // Array of category options
  const [collectionFilterOptions, setCollectionFilterOptions] = useState<string[]>([])

  const handleStatusFilter = useCallback((e: React.MouseEvent<HTMLInputElement>, status: string) => {
    e.preventDefault()
    e.stopPropagation()

    let _params = filterParams

    if (statusFilterOptions.includes(status)) {
      // remove from statusFilterOptions
      const _options = statusFilterOptions.filter(option => option !== status)
      setStatusFilterOptions([..._options])

      // remove from filterParams
      let _pA = _params.split('&')
      _pA = _pA.filter(p => !p.includes(status))
      _params = _pA.join('&')
      setFilterParams(_params)
    } else {
      // add to statusFilterOptions
      const _options = [
        ...statusFilterOptions,
        status
      ]
      setStatusFilterOptions([..._options])

      // add to filterParams
      if (_params === '') {
        _params = `search[quantity]=${quantityFilterOption}` // Quantity: Single items => default filter option

        _options.map((option: string, index: number) => {
          _params = _params + `&search[status][${index}]=${option}`
        })
      } else {
        // remove from status filter params
        let _pA = _params.split('&')
        _pA = _pA.filter(p => !p.includes('search[status]'))

        _params = _pA.join('&')
        
        // add new status filter params
        _options.map((option: string, index: number) => {
          _params = _params + `&search[status][${index}]=${option}`
        })
      }
  
      setFilterParams(_params)
    }

    router.push({
      pathname: '/assets',
      query: _params
    }, undefined, { scroll: false })
  }, [statusFilterOptions, quantityFilterOption, filterParams, router])

  const handlePriceFilter = useCallback(() => {
    let _params = filterParams

    if (_params === '') {
      _params = `search[quantity]=${quantityFilterOption}` // Quantity: Single items => default filter option
    } else {
      let _pA = _params.split('&')
      _pA = _pA.filter(p => !p.includes('search[price]'))
      _params = _pA.join('&')
    }
    
    _params = _params + `&search[price][currency]=${priceFilterOptions.currency}`

    if (Number(priceFilterOptions.min) > 0) {
      _params = _params + `&search[price][min]=${priceFilterOptions.min}`
    }
    if (Number(priceFilterOptions.max) > 0) {
      _params = _params + `&search[price][max]=${priceFilterOptions.max}`
    }

    setFilterParams(_params)

    router.push({
      pathname: '/assets',
      query: _params
    }, undefined, { scroll: false })
  }, [priceFilterOptions, quantityFilterOption, filterParams, router])

  const handleQuantityFilter = useCallback((quantityOption: string) => {
    setQuantityFilterOption(quantityOption)

    let _params = filterParams
    
    let _pA = _params.split('&')
    _pA = _pA.filter(p => !p.includes('search[quantity]'))
    _params = _pA.join('&')
    
    if (_params === '') {
      _params = _params + `search[quantity]=${quantityOption}`
    } else {
      _params = _params + `&search[quantity]=${quantityOption}`
    }

    setFilterParams(_params)

    router.push({
      pathname: '/assets',
      query: _params
    }, undefined, { scroll: false })
  }, [filterParams, router])

  const handleCategoryFilter = useCallback((e: React.MouseEvent<HTMLInputElement>, category: string) => {
    e.preventDefault()
    e.stopPropagation()

    let _params = filterParams

    if (categoryFilterOptions.includes(category)) {
      // remove from categoryFilterOptions
      const _options = categoryFilterOptions.filter(option => option !== category)
      setCategoryFilterOptions([..._options])

      // remove from filterParams
      let _pA = _params.split('&')
      _pA = _pA.filter(p => !p.includes(category))
      _params = _pA.join('&')
      setFilterParams(_params)
    } else {
      // add to categoryFilterOptions
      const _options = [
        ...categoryFilterOptions,
        category
      ]
      setCategoryFilterOptions([..._options])

      // add to filterParams
      if (_params === '') {
        _params = `search[quantity]=${quantityFilterOption}` // Quantity: Single items => default filter option

        _options.map((option: string, index: number) => {
          _params = _params + `&search[category][${index}]=${option}`
        })
      } else {
        // remove from category filter params
        let _pA = _params.split('&')
        _pA = _pA.filter(p => !p.includes('search[category]'))

        _params = _pA.join('&')
        
        // add new category filter params
        _options.map((option: string, index: number) => {
          _params = _params + `&search[category][${index}]=${option}`
        })
      }
  
      setFilterParams(_params)
    }

    router.push({
      pathname: '/assets',
      query: _params
    }, undefined, { scroll: false })
  }, [categoryFilterOptions, quantityFilterOption, filterParams, router])

  const handleCollectionFilter = useCallback((e: React.MouseEvent<HTMLElement>, collection: IMockCollection) => {
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
      pathname: `/assets`,
      query: _params
    }, undefined, { scroll: false })
  }, [collectionFilterOptions, filterParams, router])
  
  const value = {
    onFilterSidebar,
    setOnFilterSidebar,
    filterParams,
    setFilterParams,
    statusFilterOptions,
    setStatusFilterOptions,
    priceFilterOptions,
    setPriceFilterOptions,
    quantityFilterOption,
    setQuantityFilterOption,
    categoryFilterOptions,
    setCategoryFilterOptions,
    collectionFilterOptions,
    setCollectionFilterOptions,
    handleStatusFilter,
    handlePriceFilter,
    handleQuantityFilter,
    handleCategoryFilter,
    handleCollectionFilter,
  }
  
  return (
    <AssetsContext.Provider value={value}>
      {children}
    </AssetsContext.Provider>
  )
}

export const useAssets = () => useContext(AssetsContext) as IAssetsContextValue
export default AssetsProvider
