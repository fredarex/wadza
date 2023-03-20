import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment'
import Lottie from 'lottie-react'
import { FormattedMessage } from 'react-intl'
import { useCollection } from '../../../contexts/Collection.context'
import { ICommonProps } from '../../../types/types'
import NftCard from '../../cards/NftCard'
import NftCardSweepMode from '../../cards/NftCardSweepMode'
import LoaderIcon from '../../../assets/svg/loader.svg'
import { ArrowRightAltSvgIcon, CloseSvgIcon } from '../../icons'
import ReactSlider from 'react-slider'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { setPurchasingResultModal, setShoppingCarts } from '../../../redux/features/userSlice'
import { convertCryptoToCash, getCryptoPrice } from '../../../utils/utils'
import { useMetamask } from '../../../contexts/Metamask.context'
import { toast } from 'react-toastify'
import { currencies as usefullCurrencies } from '../../../config'
import { multiPurchaseNFT } from '../../../api/contracts/sale'
import { newMultipleSale } from '../../../api/sale'
import PurchasingResultModal from '../../modals/PurchasingResultModal'
import Loading from '../../../assets/lotties/loading.json'

interface IProps extends ICommonProps {
  listings?: any
  collection?: any
}

const MAX_SWEEPABLE: number = 30

const getWindowSize = () => {
  const { innerWidth } = window
  return { innerWidth }
}

const FilterResults = (props: IProps) => {
  const { className, listings, collection } = props
  const [updatedListings, setUpdatedListings] = useState<any[]>([])
  const dispatch = useDispatch()
  const { onFilterSidebar, onSweepMode, setOnSweepMode } = useCollection()
  const [_width, setWidth] = useState<string>('max-w-[959px] w-full')
  const [loadedTime, setLoadedTime] = useState<string>('')
  const [selectOption, setSelectOption] = useState<string>('items')
  const [range, setRange] = useState<number>(3)
  const _user: any = useSelector((state: RootState) => state.user)
  const [user, setUser] = useState<any>({})
  const [items, setItems] = useState<any[]>([])
  const [totalPrice, setTotalPrice] = useState<any>({})
  const { account, signMessage } = useMetamask()
  const [loading, setLoading] = useState<boolean>(false)
  const [purchaseTxHash, setPurchaseTxHash] = useState<any>({ status: '', txHash: '', })
  const [ethPrice, setEthPrice] = useState<number>(0)

  useEffect(() => {
    setUser(_user)
  }, [_user])

  useEffect(() => {
    const initData = async () => {
      let _listings: any[] = []
      let _items: any[] = []
      let _totalPrice: number = 0
      let __max: number = 0 // increase the sweepable amount - ceil: MAX_SWEEPABLE
      let __range: number = range // decrease the range to select the sweepable amount
  
      if (listings && listings?.length > 0) {
        _listings = listings.map((listing: any, index: number) => {
          let checkEnable: any = {
            listed: true, // check listed or not
            owned: false, // check owned by the current user or not
          }
  
          let __item: any
  
          if (listing?.items) {
            const items = listing.items
            if (items && items.length > 0) {
              for (const _item of items) {
                if (!_item.isSold && _item.isActive && Number(_item.expiryDate) > Math.round(new Date().getTime() / 1000)) {
                  __item = _item
                  checkEnable.listed = true
                } else {
                  checkEnable.listed = false
                }
              }
            } else {
              checkEnable.listed = false
            }
          } else {
            checkEnable.listed = false
          }
  
          if (_user?.user && _user?.user?.walletAddress) {
            if (_user?.user?.walletAddress?.toLowerCase() === listing?.owner?.walletAddress?.toLowerCase()) {
              checkEnable.owned = true
            } else {
              checkEnable.owned = false
            }
          }
  
          if (!checkEnable.listed || checkEnable.owned) {
            // if not listed or owned by the current user, it can not be sweepable.
            return {
              ...listing,
              selected: false, // not selected
              disabled: true, // can not be sweepable
            }
          } else {
            __max ++ // increase the max amount sweepable
  
            if (__range > 0) {
              __range -- // decrease the range to meet the sweepable
  
              // sum total price for the items
              _totalPrice += Number(__item.price)
  
              // push items to purchase them
              _items = [
                ..._items,
                {
                  ...__item,
                  listing: listing,
                  index: __max,
                },
              ]
  
              return {
                ...listing,
                selected: true,
                disabled: false,
                index: __max,
              }
            } else {
              if (__max > MAX_SWEEPABLE) {
                return {
                  ...listing,
                  selected: false,
                  disabled: true,
                  index: __max,
                }
              } else {
                return {
                  ...listing,
                  selected: false,
                  disabled: false,
                  index: __max,
                }
              }
            }
          }
        })
      }
  
      setUpdatedListings(_listings)
      setItems(_items)
      const _totalPriceUSD = await convertCryptoToCash(_totalPrice)
      setTotalPrice({
        price: _totalPrice,
        usdPrice: _totalPriceUSD,
      })
    }

    initData()
  }, [listings, _user, range])

  useEffect(() => {
    const getETHPrice = async () => {
      const ethPrice = await getCryptoPrice('ETH/USD')
      setEthPrice(Number(ethPrice || 0))
    }
    getETHPrice()

    const handleWindowResize = () => {
      const { innerWidth } = getWindowSize()
      if (innerWidth >= 1024)
        setWidth('max-w-[959px] w-full md:grid-cols-3')
      else
        setWidth('max-w-[1250px] w-full sm:grid-cols-3 md:grid-cols-4')
    }

    window.addEventListener('resize', handleWindowResize)
    
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
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    if (!onFilterSidebar && !onSweepMode)
      setWidth('max-w-[1250px] w-full sm:grid-cols-3 md:grid-cols-4')
    else if ((!onFilterSidebar && onSweepMode) || (onFilterSidebar && !onSweepMode))
      setWidth('max-w-[959px] w-full md:grid-cols-3')
    else if (onFilterSidebar && onSweepMode) 
      setWidth('max-w-[622px] w-full md:grid-cols-2')
  }, [onFilterSidebar, onSweepMode])

  const changeRange = async (value: any) => {
    let _range: number
    if (!isNaN(value)) {
      if (Number(value) > MAX_SWEEPABLE) {
        _range = MAX_SWEEPABLE
      } else {
        _range = Number(value)
      }
      
      setRange(_range)

      let _listings: any[] = []
      let _items: any[] = []
      let _totalPrice: number = 0
      let __max: number = 0 // increase the sweepable amount - ceil: MAX_SWEEPABLE
      let __range: number = _range // decrease the range to select the sweepable amount

      if (listings && listings?.length > 0) {
        _listings = listings.map((listing: any, index: number) => {
          let checkEnable: any = {
            listed: true, // check listed or not
            owned: false, // check owned by the current user or not
          }

          let __item: any
  
          if (listing?.items) {
            const items = listing.items
            if (items && items.length > 0) {
              for (const _item of items) {
                if (!_item.isSold && _item.isActive && Number(_item.expiryDate) > Math.round(new Date().getTime() / 1000)) {
                  __item = _item
                  checkEnable.listed = true
                } else {
                  checkEnable.listed = false
                }
              }
            } else {
              checkEnable.listed = false
            }
          } else {
            checkEnable.listed = false
          }
  
          if (_user?.user && _user?.user?.walletAddress) {
            if (_user?.user?.walletAddress?.toLowerCase() === listing?.owner?.walletAddress?.toLowerCase()) {
              checkEnable.owned = true
            } else {
              checkEnable.owned = false
            }
          }
  
          if (!checkEnable.listed || checkEnable.owned) {
            // if not listed or owned by the current user, it can not be sweepable.
            return {
              ...listing,
              selected: false, // not selected
              disabled: true, // can not be sweepable
            }
          } else {
            __max ++ // increase the max amount sweepable

            if (__range > 0) {
              __range -- // decrease the range to meet the sweepable

              // sum total price for the items
              _totalPrice += Number(__item.price)

              // push items to purchase them
              _items = [
                ..._items,
                {
                  ...__item,
                  listing: listing,
                  index: __max,
                },
              ]

              return {
                ...listing,
                selected: true,
                disabled: false,
                index: __max,
              }
            } else {
              if (__max > MAX_SWEEPABLE) {
                return {
                  ...listing,
                  selected: false,
                  disabled: true,
                  index: __max,
                }
              } else {
                return {
                  ...listing,
                  selected: false,
                  disabled: false,
                  index: __max,
                }
              }
            }
          }
        })
      }

      setUpdatedListings(_listings)
      setItems(_items)
      const _totalPriceUSD = await convertCryptoToCash(_totalPrice)
      setTotalPrice({
        price: _totalPrice,
        usdPrice: _totalPriceUSD,
      })
    }
  }

  const selectListing = (index: number) => {
    changeRange(index)
  }

  const purchase = async () => {
    try {
      if (!account) {
        const message = 'Welcome to Wadza! Sign for purchasing NFT'
        await signMessage(message)
      }
      
      setLoading(true)
      const purchaseLoading = toast.loading('Please wait while for purchasing...')

      let purchaseData: any[] = []
      let saveData: any[] = []
      for (const item of items) {
        let creatorAddresses: string[] = []
        let creatorFeePercentages: number[] =[]
        
        const creatorFees: any[] = item.collectionId?.creatorFees || []
        if (creatorFees.length > 0) {
          for (const fee of creatorFees) {
            creatorAddresses = [
              ...creatorAddresses,
              fee.address,
            ]
            creatorFeePercentages = [
              ...creatorFeePercentages,
              fee.percentage,
            ]
          }
        }

        const _currency = usefullCurrencies.filter((_c: any) => _c.name === item?.currency)
  
        const data = {
          tokenAddress: item?.listing?.tokenAddress,
          tokenId: item?.listing?.tokenId,
          seller: item?.seller?.walletAddress,
          price: item?.price,
          currency: _currency[0]?.address!,
          creatorAddresses,
          creatorFeePercentages
        }
  
        purchaseData = [
          ...purchaseData,
          data,
        ]

        saveData = [
          ...saveData,
          {
            value: item?.price,
            currency: item?.currency,
            itemId: item?._id,
          }
        ]
      }
  
      const purchaseResult = await multiPurchaseNFT(
        purchaseData, 
        user?.user?.walletAddress,
        true,
        totalPrice?.price
      )
      
      if (purchaseResult?.data && !purchaseResult?.data?.err) {
        const txHash = purchaseResult?.data?.transactionHash || ''
        const saveResult = await newMultipleSale({data: saveData}, txHash)
        if (!saveResult?.data?.error) {
          setPurchaseTxHash({ status: 'success', txHash, })
          toast.update(purchaseLoading, { render: 'Purchased successfully', type: 'success', isLoading: false, autoClose: 3000 })
          setLoading(false)

          if (txHash) {
            dispatch(setPurchasingResultModal(true))
          }
        }
      } else {
        setPurchaseTxHash({ status: 'failed', txHash: '', })
        toast.update(purchaseLoading, { render: purchaseResult?.data?.err?.message || purchaseResult?.err, type: 'info', isLoading: false, autoClose: 3000 })
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-row justify-between w-full bg-purple-lightest px-6 py-[17px] rounded'>
      <div className={`${className} ${_width} ${onSweepMode? 'pr-5' : ''}`}>
        {/* navbar */}
        <div className={`flex justify-between items-center mb-6`}>
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
            {`${listings?.length.toLocaleString('en-US')} items`}
          </span>
        </div>
        {/* listings */}
        <div className='flex flex-row'>
          {onSweepMode? <div className={`${className} ${_width} grid justify-center grid-cols-2 gap-[9px] max-h-[100vh] min-h-[calc(100vh-200px)] overflow-y-auto`}>
            {updatedListings?.length! > 0 && updatedListings?.map((listing: any, index: number) => (
              <NftCardSweepMode key={index} listing={listing} collection={collection} selectListing={selectListing} />
            ))}
          </div> : <div className={`${className} ${_width} grid justify-center grid-cols-2 gap-[9px] max-h-[100vh] min-h-[calc(100vh-200px)] overflow-y-auto`}>
            {updatedListings?.length! > 0 && updatedListings?.map((listing: any, index: number) => (
              <NftCard key={index} listing={listing} collection={collection} />
            ))}
          </div>}
        </div>
      </div>
      {/* sweep mode */}
      {onSweepMode && <div className='w-[293px] h-[100vh] bg-white rounded pl-6 py-5'>
        <div className='flex flex-row justify-between'>
          <h4 className='font-poppins-600 text-lg text-black leading-[98.3%]'>
            <FormattedMessage id='page.collection_detail.button.sweep_mode' />
          </h4>
          <button onClick={() => setOnSweepMode(false)} className='flex flex-row justify-center items-center w-[27px] h-[27px] bg-[#E4E4E4] rounded-l'>
            <ArrowRightAltSvgIcon color='#424242' />
          </button>
        </div>
        <div className='pr-6 mt-5'>
          {/* alternative options ETH/Items */}
          <div className='flex flex-row w-full'>
            <button onClick={() => setSelectOption('eth')} className={`flex flex-row justify-center items-center w-1/2 h-8 ${selectOption === 'eth'? 'bg-[#52307C]' : 'bg-[#F0F0F0]'} rounded-l`}>
              <h4 className={`font-poppins-400 text-xs ${selectOption === 'eth'? 'text-white' : 'text-black'} leading-[98.3%]`}>
                {`ETH`}
              </h4>
            </button>
            <button onClick={() => setSelectOption('items')} className={`flex flex-row justify-center items-center w-1/2 h-8 ${selectOption === 'items'? 'bg-[#52307C]' : 'bg-[#F0F0F0]'} rounded-r`}>
              <h4 className={`font-poppins-400 text-xs ${selectOption === 'items'? 'text-white' : 'text-black'} leading-[98.3%]`}>
                <FormattedMessage id='page.collection_detail.label.items' />
              </h4>
            </button>
          </div>
          {/* total items/amount slider option */}
          <div className='mt-5'>
            <h4 className='font-poppins-600 text-xs text-black-light'>
              <FormattedMessage id='page.collection_detail.sweep_mode.label.total_items' />
            </h4>
            <ReactSlider
              step={1}
              min={0}
              max={MAX_SWEEPABLE}
              className='flex justify-center items-center w-full h-4 mt-4 bg-[#E7E0EF] rounded-[11px] cursor-grab'
              thumbClassName='absolute w-7 h-7 border-[6px] border-solid border-white cursor-grab bg-purple rounded-full focus:outline-none focus:ring-2 focus:ring-purple -top-2px'
              value={range}
              onChange={(value: any) => {
                changeRange(value)
              }}
            />
            <div className='flex flex-row justify-between items-center w-full h-8 bg-[#F0F0F0] rounded-[21px] px-4 mt-5'>
              <input
                className='bg-[#F0F0F0] font-poppins-400 text-xs text-black leading-[98.3%] focus:outline-none'
                value={range}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeRange(e.target.value)}
                max={MAX_SWEEPABLE}
                min={0}
              />
              <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                <FormattedMessage id='page.collection_detail.label.items' />
              </h4>
            </div>
            {/* items list */}
            <div className='mt-7'>
              {/* header */}
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center'>
                  <h4 className='font-poppins-600 text-xs text-black-light leading-[98.3%] mr-2'>
                    <FormattedMessage id='page.collection_detail.sweep_mode.label.my_cart' />
                  </h4>
                  <div className='flex flex-row justify-center items-center w-[30px] h-[21px] bg-purple rounded-[5px]'>
                    <h4 className='font-poppins-600 text-xs text-white leading-[98.3%]'>
                      {range}
                    </h4>
                  </div>
                </div>
                <h4 onClick={() => changeRange(0)} className='font-poppins-400 text-xs text-[#808080] leading-[140.3%] underline cursor-pointer'>
                  <FormattedMessage id='page.collection_detail.sweep_mode.label.clear' />
                </h4>
              </div>
              {/* list */}
              <div className='mt-4 max-h-[320px] overflow-y-auto pt-2'>
                {items.length > 0 && items.map((item: any, index: number) => {
                  return (
                    <div key={index} className='flex flex-row justify-between items-center mb-[19px]'>
                      <div className='flex flex-row items-center'>
                        <div className='relative'>
                          <picture>
                            <img
                              src={item?.listing?.image ? String(item?.listing?.image).includes('ipfs://') ? String(item?.listing?.image).replace('ipfs://', 'https://ipfs.io/ipfs/') : item?.listing?.image : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
                              alt='listing image'
                              className='w-[46px] h-[46px] rounded-[7px] object-cover'
                            />
                          </picture>
                          <div onClick={() => changeRange(item?.index - 1)} className='absolute top-[-6px] right-[-6px] flex flex-row justify-center items-center w-[17px] h-[17px] bg-white border border-solid border-[#E6E6E6] rounded-full cursor-pointer'>
                            <CloseSvgIcon color='#808080' width={5} height={5} />
                          </div>
                        </div>
                        <div className='ml-[9px]'>
                          <h4 className='font-poppins-600 text-xs text-black leading-[140.3%]'>
                            {collection?.name || ''}
                          </h4>
                          <h4 className='font-poppins-400 text-xs text-black leading-[140.3%]'>
                            {item?.listing?.name || ''}
                          </h4>
                        </div>
                      </div>
                      <div className='flex flex-col justify-center items-end'>
                        <h4 className='font-poppins-600 text-xs text-black leading-[140.3%]'>
                          {`${Number(item?.price).toFixed(3)} ${item?.currency}`}
                        </h4>
                        <h4 className='font-poppins-400 text-xs text-black leading-[140.3%]'>
                          ${(Number(item?.price) * Number(ethPrice)).toFixed(3)}
                        </h4>
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* options */}
              <div>
                <div className='flex flex-row justify-between items-center'>
                  <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                    <FormattedMessage id='page.collection_detail.sweep_mode.label.skip_pending' />
                  </h4>
                  <input
                    type={'checkbox'}
                    readOnly={true}
                    className='form-check-input appearance-none w-[18px] h-[18px] border-none rounded-sm bg-[#F0F0F0] checked:bg-purple transition duration-200 cursor-pointer'
                  />
                </div>
                <div className='flex flex-row justify-between items-center mt-[13px]'>
                  <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                    <FormattedMessage id='page.collection_detail.sweep_mode.label.skip_suspicious' />
                  </h4>
                  <input
                    type={'checkbox'}
                    readOnly={true}
                    className='form-check-input appearance-none w-[18px] h-[18px] border-none rounded-sm bg-[#F0F0F0] checked:bg-purple transition duration-200 cursor-pointer'
                  />
                </div>
              </div>
              {/* buttons */}
              <div>
                <button onClick={() => purchase()} disabled={loading} className={`flex flex-row justify-center items-center w-full h-[38px] ${loading ? 'bg-purple-light' : 'bg-purple'} rounded-[19px] mt-5 hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                  {loading ? <Lottie animationData={Loading} style={{ width: 20, height: 35, }} /> : <h4 className='font-poppins-600 text-[15px] text-white leading-[22px]'>
                    <FormattedMessage id='page.nft_detail.modal.purchase.button.checkout' />
                  </h4>}
                </button>
                <button onClick={() => {}} className={`flex flex-row justify-center items-center w-full h-[38px] bg-purple-light rounded-[19px] mt-[13px] hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                  <h4 className='font-poppins-600 text-[15px] text-white leading-[22px]'>
                    <FormattedMessage id='page.collection_detail.sweep_mode.button.pay_with_visa' />
                  </h4>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>}
      <PurchasingResultModal txHash={purchaseTxHash} />
    </div>
  )
}

export default FilterResults
