import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Menu, Transition } from '@headlessui/react'
import { useAssets } from '../../contexts/Assets.context'
import constants from '../../utils/constants'
import { CurrencyType, ICommonProps, IFilterOption, IMockCollection } from '../../types/types'
import { ArrowDownSvgIcon } from '../icons'
import { FilterSector, StatusCheckbox, QuantityRadio, CollectionCheckbox } from './_filterSidebar'
import SearchBox from '../boxes/SearchBox'
import MainInput from '../form/MainInput'
import { CategoryData } from '../../mock/CategoryData'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { getAllCollections } from '../../api/collection'
import { setAllCollections, setCollectionsBySearch } from '../../redux/features/collectionSlice'

interface IProps extends ICommonProps {}

interface IFilterError {
  price: string
}

const CURRENCYS: CurrencyType[] = [
  'USD',
  'ETH',
]

const getWindowSize = () => {
  const { innerWidth } = window
  return { innerWidth }
}

const FilterSidebar = (props: IProps) => {
  const { className } = props
  const intl = useIntl()
  const dispatch = useDispatch()
  const {
    onFilterSidebar,
    statusFilterOptions,
    handleStatusFilter,
    priceFilterOptions,
    setPriceFilterOptions,
    handlePriceFilter,
    quantityFilterOption,
    handleQuantityFilter,
    collectionFilterOptions,
    handleCollectionFilter,
    categoryFilterOptions,
    handleCategoryFilter
  } = useAssets()
  const [_show, setShow] = useState<string>('block')
  const { STATUS_OPTIONS, QUANTITY_OPTIONS } = constants()
  const [filterError, setFilterError] = useState<IFilterError>({
    price: '',
  })
  const [enableApplyPriceFilter, setEnableApplyPriceFilter] = useState<boolean>(false)

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

  const priceFilterValidation = (e: React.ChangeEvent<HTMLInputElement>, ov: any) => {
    if (isNaN(Number(e.target.value)) || isNaN(ov)) {
      setFilterError({
        ...filterError,
        price: 'Numeric inputs only'
      })
    } else {
      setFilterError({
        ...filterError,
        price: ''
      })

      if (Number(e.target.value) > 0  || Number(ov) > 0) {
        setEnableApplyPriceFilter(true)
      } else {
        setEnableApplyPriceFilter(false)
      }
    }
  }

  const searchCollection = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCollectionsBySearch(e.target.value))
  }

  return (
    <div className={`${_show} flex flex-col filter_sidebar_container min-w-[282px] max-w-[282px] w-full rounded bg-purple-lightest mr-[9px] py-[9px] pl-[9px] pr-[3px] ${className}`}>
      <div className='min-h-[calc(100vh-200px)] max-h-[calc(100vh-200px)] overflow-y-auto'>
        {/* status filter */}
        <FilterSector title={intl.formatMessage({'id': 'page.assets.filter.sidebar.status'})} show={true}>
          {STATUS_OPTIONS.length > 0 && STATUS_OPTIONS.map((option: IFilterOption, index: number) => (
            <StatusCheckbox
              key={index}
              label={option.label}
              checked={statusFilterOptions.includes(option.value)}
              id={`status-checkbox-${index + 1}`}
              name='status-checkbox'
              onClick={(e) => handleStatusFilter(e, option.value)}
            />
          ))}
        </FilterSector>
        {/* price filter */}
        <FilterSector title={intl.formatMessage({'id': 'page.assets.filter.sidebar.price'})} className='mt-3'>
          <div className='flex flex-row justify-center items-center p-2'>
            <Menu as={'div'} className='relative inline-block'>
              <Menu.Button className='flex flex-row justify-center items-center w-[61px] h-[31px] bg-[#F0F0F0] rounded-[21px] mr-[7px]'>
                <span className='font-poppins-700 text-xs text-black-lighter leading-[98.3%] mr-1'>
                  {priceFilterOptions.currency}
                </span>
                <ArrowDownSvgIcon color='#FFFFFF' width={7} height={4} />
              </Menu.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className='absolute mt-2 left-0 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className="p-3">
                    {CURRENCYS.length > 0 && CURRENCYS.map((currency: CurrencyType, index: number) => (
                      <Menu.Item key={index}>
                        <button
                          className='flex w-full items-center font-poppins-400 text-xs text-black-lighter leading-[98.3%] rounded-md px-2 py-2 hover:bg-purple hover:text-white'
                          onClick={() => setPriceFilterOptions({
                            ...priceFilterOptions,
                            currency: currency,
                          })}
                        >
                          {currency}
                        </button>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <MainInput
              type='text'
              placeholder={intl.formatMessage({'id': 'page.assets.filter.sidebar.price.min'})}
              value={priceFilterOptions.min}
              onChange={(e:any) => {
                setPriceFilterOptions({
                  ...priceFilterOptions,
                  min: e.target.value
                })
                priceFilterValidation(e, priceFilterOptions.max)
              }}
              className='flex flex-row justify-center items-center w-[70px] h-[31px] bg-[#F0F0F0] rounded-[21px]'
              inputClassName='bg-[#F0F0F0] text-xs py-[7px] px-6 rounded-[21px] placeholder:font-poppins-400 placeholder:text-xs placeholder:text-[#BEBEBE] placeholder:leading-[98.3%] placeholder:uppercase'
            />
            <span className='font-poppins-400 text-xs text-black-lighter leading-[98.3%] mx-2'>
              <FormattedMessage id='page.assets.filter.sidebar.price.to' />
            </span>
            <MainInput
              type='text'
              placeholder={intl.formatMessage({'id': 'page.assets.filter.sidebar.price.max'})}
              value={priceFilterOptions.max}
              onChange={(e) => {
                setPriceFilterOptions({
                  ...priceFilterOptions,
                  max: e.target.value
                })
                priceFilterValidation(e, priceFilterOptions.min)
              }}
              className='flex flex-row justify-center items-center w-[70px] h-[31px] bg-[#F0F0F0] rounded-[21px]'
              inputClassName='bg-[#F0F0F0] text-xs py-[7px] pl-6 pr-5 rounded-[21px] placeholder:font-poppins-400 placeholder:text-xs placeholder:text-[#BEBEBE] placeholder:leading-[98.3%] placeholder:uppercase'
            />
          </div>
          {filterError.price && (<span className='font-poppins-400 text-[9px] text-red-600 leading-4 px-2'>
            {filterError.price}
          </span>)}
          <div className='p-2 mb-1'>
            <button
              className={`w-full ${enableApplyPriceFilter? 'bg-purple hover:bg-purple-light ease-in duration-100' : 'bg-[#C4B2DA]'}  font-poppins-600 text-xs text-white leading-[98.3%] py-[10px] rounded-[19px]`}
              onClick={() => enableApplyPriceFilter? handlePriceFilter() : null}
            >
              <FormattedMessage id='page.assets.filter.sidebar.price.button.apply' />
            </button>
          </div>
        </FilterSector>
        {/* quantity filter */}
        <FilterSector title={intl.formatMessage({'id': 'page.assets.filter.sidebar.quantity'})} className='mt-3'>
          {QUANTITY_OPTIONS.length > 0 && QUANTITY_OPTIONS.map((option: IFilterOption, index: number) => (
            <QuantityRadio
              key={index}
              label={option.label}
              checked={quantityFilterOption === option.value}
              id={`quantity-radio-${index + 1}`}
              name='qunatity-radio'
              onClick={() => handleQuantityFilter(option.value)}
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
                onClick={(e) => handleCollectionFilter(e, collection)}
              />
            ))}
          </div>
        </FilterSector>
        {/* category filter */}
        <FilterSector title={intl.formatMessage({'id': 'page.assets.filter.sidebar.category'})} className='mt-3'>
          {CategoryData.length > 0 && CategoryData.map((category: IFilterOption, index: number) => (
            <StatusCheckbox
              key={index}
              label={category.label}
              checked={categoryFilterOptions.includes(category.value)}
              id={`category-checkbox-${index + 1}`}
              name='category-checkbox'
              onClick={(e) => handleCategoryFilter(e, category.value)}
            />
          ))}
        </FilterSector>
      </div>
    </div>
  )
}

export default FilterSidebar
