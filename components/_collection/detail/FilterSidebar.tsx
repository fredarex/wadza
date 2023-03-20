import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'
import { Menu, Transition } from '@headlessui/react'
import { useCollection } from '../../../contexts/Collection.context'
import constants from '../../../utils/constants'
import { CurrencyType, ICommonProps, IFilterOption } from '../../../types/types'
import { ArrowDownSvgIcon } from '../../icons'
import { FilterSector, StatusCheckbox, QuantityRadio } from '../../_assets/_filterSidebar'
import MainInput from '../../form/MainInput'

interface IProps extends ICommonProps {
  slug: string
}

interface IPriceFilterOption {
  currency: CurrencyType
  min: string
  max: string
}

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
  const { className, slug } = props
  const router = useRouter()
  const intl = useIntl()
  const { onFilterSidebar } = useCollection()
  const [_show, setShow] = useState<string>('block')
  const { STATUS_OPTIONS, QUANTITY_OPTIONS } = constants()
  const [filterError, setFilterError] = useState<IFilterError>({
    price: '',
  })
  const [enableApplyPriceFilter, setEnableApplyPriceFilter] = useState<boolean>(false)

  const [filterParams, setFilterParams] = useState<string>('') // Whole filter params

  const [statusFilterOptions, setStatusFilterOptions] = useState<Array<string>>([]) // Array of status options
  const [priceFilterOptions, setPriceFilterOptions] = useState<IPriceFilterOption>({
    currency: 'USD',
    min: '',
    max: '',
  })
  const [quantityFilterOption, setQuantityFilterOption] = useState<string>('single_items')

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (!onFilterSidebar)
      setShow('hidden')
    else
      setShow('block')
  }, [onFilterSidebar])

  const priceFilterValidation = (e: React.ChangeEvent<HTMLInputElement>, ov: any, div: string) => {
    if (isNaN(Number(e.target.value)) || isNaN(ov)) {
      setFilterError({
        ...filterError,
        price: 'Numeric inputs only'
      })
      setEnableApplyPriceFilter(false)
    } else {
      if (Number(e.target.value) > 0 || Number(ov) > 0) {
        if (Number(ov) > 0 && e.target.value === '') {
          setFilterError({
            ...filterError,
            price: ''
          })
          setEnableApplyPriceFilter(true)
        } else {
          if (div === 'max') {
            if (Number(e.target.value) < Number(ov)) {
              setFilterError({
                ...filterError,
                price: 'Minimum must be less than maximum'
              })
              setEnableApplyPriceFilter(false)
            } else {
              setFilterError({
                ...filterError,
                price: ''
              })
              setEnableApplyPriceFilter(true)
            }
          } else if (div === 'min') {
            if (Number(e.target.value) > Number(ov) && ov !== '') {
              setFilterError({
                ...filterError,
                price: 'Minimum must be less than maximum'
              })
              setEnableApplyPriceFilter(false)
            } else {
              setFilterError({
                ...filterError,
                price: ''
              })
              setEnableApplyPriceFilter(true)
            }
          }
        }
      } else {
        setEnableApplyPriceFilter(false)
      }
    }
  }

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
      pathname: `/collection/${slug}`,
      query: _params
    }, undefined, { scroll: false })
  }, [slug, statusFilterOptions, quantityFilterOption, filterParams, router])

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
      pathname: `/collection/${slug}`,
      query: _params
    }, undefined, { scroll: false })
  }, [slug, priceFilterOptions, quantityFilterOption, filterParams, router])

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
      pathname: `/collection/${slug}`,
      query: _params
    }, undefined, { scroll: false })
  }, [slug, filterParams, router])

  return (
    <div className={`${_show} flex flex-col min-w-[282px] max-w-[282px] w-full rounded bg-purple-lightest mr-[9px] py-[9px] pl-[9px] pr-[3px] ${className}`}>
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
              onChange={(e) => {
                setPriceFilterOptions({
                  ...priceFilterOptions,
                  min: e.target.value
                })
                priceFilterValidation(e, priceFilterOptions.max, 'min')
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
                priceFilterValidation(e, priceFilterOptions.min, 'max')
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
      </div>
    </div>
  )
}

export default FilterSidebar
