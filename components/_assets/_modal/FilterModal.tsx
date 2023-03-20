import Lottie from 'lottie-react'
import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { ArrowDownSvgIcon, CloseSvgIcon } from '../../icons'
import FilterSidebar from '../FilterSidebar';
import { CollectionCheckbox, FilterSector, QuantityRadio, StatusCheckbox } from '../_filterSidebar'
import MobileFilterSector from '../_filterSidebar/MobileFilterSector'
import constants from '../../../utils/constants'
import { useAssets } from '../../../contexts/Assets.context'
import { CurrencyType, ICommonProps, IFilterOption, IMockCollection } from '../../../types/types'
import { MainInput } from '../../form';
import SearchBox from '../../boxes/SearchBox';
import { setAllCollections, setCollectionsBySearch } from '../../../redux/features/collectionSlice';
import { RootState } from '../../../redux/store';
import { getAllCollections } from '../../../api/collection';
import { CategoryData } from '../../../mock/CategoryData';

interface IProps extends ICommonProps {}

interface IFilterError {
  price: string
}

const CURRENCYS: CurrencyType[] = [
  'USD',
  'ETH',
]

const FilterModal = (props: any) => {
  const { isOpen, close } = props;
  const modalRef = useRef<HTMLDivElement>(null)
  const intl = useIntl()
  const router = useRouter()
  const dispatch = useDispatch()
  const { STATUS_OPTIONS, QUANTITY_OPTIONS } = constants();
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

  }, [_filteredCollections, dispatch])

  useEffect(() => {
    setFilteredCollections(_filteredCollections)
  }, [_filteredCollections])

  
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
  useEffect(() => {
    const handler = (event: any) => {
      if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
        close()
      }
    }
    window.addEventListener('mousedown', handler)

    return () => {
      window.removeEventListener('mousedown', handler)
    }
  }, [close]);

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
    dispatch(setCollectionsBySearch(e.target.value));
  }

  return (
    <>
      {isOpen ? (
        <>
          <div
            className='w-full h-full flex fixed justify-center items-center inset-0 z-50'
          >
            <div
              ref={modalRef}
              className='w-full h-full'
            >
              {/*content*/}
              <div className='mt-[60px] flex flex-col w-full pb-[120px] bg-[#ECECEC] rounded-[15px] max-h-[100vh] overflow-y-auto'>
                {/*header*/}
                <div className='flex sticky bottom-[2px] items-start justify-between pt-[23px] pb-5 px-[26px] bg-[#F2F2F2] border-b-2 border-solid border-[rgba(139,110,174,0.13)] rounded-t'>
                  <span className="text-[16px] text-[#3C1361] font-semibold underline">Clear all</span>
                  <span className='font-poppins-600 text-lg text-purple leading-6'>
                    Filters
                  </span>
                  <button
                    onClick={close}
                  >
                    <CloseSvgIcon color='#3C1361' />
                  </button>
                </div>
                {/*body*/}
                <div className='min-h-[100vh] overflow-y-auto  py-7 px-[39px] bg-[#ECECEC]'>
                  {/* status filter */}
                  <MobileFilterSector title={intl.formatMessage({'id': 'page.assets.filter.sidebar.status'})} show={true}>
                  {STATUS_OPTIONS.length > 0 && STATUS_OPTIONS.map((option: IFilterOption, index: number) => (
                    <StatusCheckbox
                      key={index}
                      label={option.label}
                      checked={statusFilterOptions.includes(option.value)}
                      id={`status-checkbox-${index + 1}`}
                      name='status-checkbox'
                      onMobile={true}
                      onClick={(e) => handleStatusFilter(e, option.value)}
                    />
                  ))}
                  </MobileFilterSector>
                  {/* price filter */}
                  <MobileFilterSector title={intl.formatMessage({'id': 'page.assets.filter.sidebar.price'})} className='mt-3'>
                    <div className='flex flex-row justify-center items-center p-2'>
                      <Menu as={'div'} className='relative inline-block'>
                        <Menu.Button className='flex flex-row justify-center items-center w-[61px] h-[31px] bg-white rounded-[21px] mr-[7px]'>
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
                          priceFilterValidation(e, priceFilterOptions.max)
                        }}
                        className='flex flex-row justify-center items-center w-[70px] h-[31px] bg-white rounded-[21px]'
                        inputClassName='bg-white text-xs py-[7px] px-6 rounded-[21px] placeholder:font-poppins-400 placeholder:text-xs placeholder:text-[#BEBEBE] placeholder:leading-[98.3%] placeholder:uppercase'
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
                        className='flex flex-row justify-center items-center w-[70px] h-[31px] bg-white rounded-[21px]'
                        inputClassName='bg-white text-xs py-[7px] pl-6 pr-5 rounded-[21px] placeholder:font-poppins-400 placeholder:text-xs placeholder:text-[#BEBEBE] placeholder:leading-[98.3%] placeholder:uppercase'
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
                  </MobileFilterSector>
                  {/* quantity filter */}
                  <MobileFilterSector title={intl.formatMessage({'id': 'page.assets.filter.sidebar.quantity'})} className='mt-3'>
                    {QUANTITY_OPTIONS.length > 0 && QUANTITY_OPTIONS.map((option: IFilterOption, index: number) => (
                      <QuantityRadio
                        key={index}
                        label={option.label}
                        checked={quantityFilterOption === option.value}
                        id={`quantity-radio-${index + 1}`}
                        name='qunatity-radio'
                        onMobile={true}
                        onClick={() => handleQuantityFilter(option.value)}
                      />
                    ))}
                  </MobileFilterSector>
                  {/* collections filter */}
                  <MobileFilterSector title={intl.formatMessage({'id': 'page.assets.filter.sidebar.collections'})} className='mt-3'>
                    <div className='pt-[6px] px-2'>
                      <SearchBox
                        className='rounded-sm bg-[#fff]'
                        searchButtonClass='p-2'
                        searchIconClass='w-[18px] h-[18px]'
                        inputBoxClass='bg-[#fff]'
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
                          onMobile={true}
                          onClick={(e) => handleCollectionFilter(e, collection)}
                        />
                      ))}
                    </div>
                  </MobileFilterSector>
                  {/* category filter */}
                  <MobileFilterSector title={intl.formatMessage({'id': 'page.assets.filter.sidebar.category'})} className='mt-3'>
                    {CategoryData.length > 0 && CategoryData.map((category: IFilterOption, index: number) => (
                      <StatusCheckbox
                        key={index}
                        label={category.label}
                        checked={categoryFilterOptions.includes(category.value)}
                        id={`category-checkbox-${index + 1}`}
                        name='category-checkbox'
                        onMobile={true}
                        onClick={(e) => handleCategoryFilter(e, category.value)}
                      />
                    ))}
                  </MobileFilterSector>
                  <div className="w-full h-[60px] bg-[#512D72] mt-[78px] text-white rounded-[15px] flex justify-center items-center">Confirm</div>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-70 fixed inset-0 z-40 bg-purple'></div>
        </>
      ) : null}
    </>
  )
}

export default FilterModal
