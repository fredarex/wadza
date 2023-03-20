import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'
import { ArrowDownSvgIcon, ArrowLeftSvgIcon, ArrowUpSvgIcon, CalendarAltSvgIcon } from '../icons'
import useNftDetail from '../../hooks/useNftDetail'
import { AuctionMethodType, ICommonProps, TypeOfSale } from '../../types/types'
import { ItemRadio, MoreOption } from './_list'
import NavbarDropdown from '../dropdowns/NavbarDropdown'
import { contractAddresses, currencies as usefullCurrencies } from '../../config'

import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { addDays } from 'date-fns'
import moment from 'moment'

import { getTreasuryPercentage, listingNFT } from '../../api/contracts/sale'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { approve } from '../../api/contracts/nftBuilder'
import { convertDateToUnixTimestamp } from '../../utils/utils'
import { saveItem } from '../../api/item'
import Lottie from 'lottie-react'
import Loading from '../../assets/lotties/loading.json'
import { useMetamask } from '../../contexts/Metamask.context'
import { approveERC721NFTs } from '../../api/contracts/erc721'

interface IProps extends ICommonProps {
  img: string
  name: string
  collectionName: string
}

const ListSection = (props: IProps) => {
  const { img, name, collectionName, className } = props
  const [user, setUser] = useState<any>({})
  const _user = useSelector((state: RootState) => state.user.user)
  const router = useRouter()
  const intl = useIntl()
  const params = useMemo(() => (router.query.params as string[]) || [], [router])
  const ref = useRef<HTMLDivElement>(null)
  const calRef = useRef<any>(null)
  const { nft, collection, creator, owner } = useNftDetail(params)
  const { account, signMessage } = useMetamask()
  const [typeOfSale, setTypeOfSale] = useState<TypeOfSale>('fixed')
  const [auctionMethod, setAuctionMethod] = useState<AuctionMethodType>('highest_bidder')
  const [currencies, setCurrencies] = useState<any[]>([])
  const [showCurrencies, setShowCurrencies] = useState<boolean>(false)
  const [currency, setCurrency] = useState<string>(`ETH`)
  const [ranges, setRanges] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      key: 'selection',
    },
  ])
  const [duration, setDuration] = useState<string>('7 days')
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [bundle, setBundle] = useState<boolean>(false)
  const [reserve, setReserve] = useState<boolean>(false)
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false)
  const [serviceFee, setServiceFee] = useState<number>(0)
  const [listingPrice, setListingPrice] = useState<number>(0)
  const [earning, setEarning] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<any>({
    price: '',
  })

  const selectCurrency = async (cur: string) => {
    if (collection && collection.paymentTokens && collection.paymentTokens.length > 0) {
      const _currencies = collection.paymentTokens.filter((_currency: any) => _currency.symbol !== cur)
      setCurrencies(_currencies)
    }
    const c = usefullCurrencies.filter((c) => c.name === cur)
    const { data } = await getTreasuryPercentage(c[0]?.address || '0x0000000000000000000000000000000000000000')
    setServiceFee(Number((Number(data) / 100).toFixed(1)))
    setCurrency(cur)
    setShowCurrencies(false)
  }

  useEffect(() => {
    setUser(_user)
  }, [_user])

  useEffect(() => {
    const getServiceFee = async () => {
      const c = usefullCurrencies.filter((c) => c.name === currency)
      const { data } = await getTreasuryPercentage(c[0]?.address!)
      setServiceFee(Number((Number(data) / 100).toFixed(1)))
    }

    getServiceFee()
  }, [currency])

  useEffect(() => {
    const handler = (event: any) => {
      if (ref.current !== null && !ref.current.contains(event.target)) {
        setShowCurrencies(false)
      }

      if (calRef.current !== null && !calRef.current.contains(event.target)) {
        setShowCalendar(false)
      }
    }
    window.addEventListener('mousedown', handler)

    return () => {
      window.removeEventListener('mousedown', handler)
    }
  }, [setShowCurrencies, setShowCalendar])

  useEffect(() => {
    if (collection && collection.paymentTokens && collection.paymentTokens.length > 0) {
      const _currencies = collection.paymentTokens.filter((_currency: any) => _currency.symbol !== currency)
      setCurrencies(_currencies)
    }
  }, [collection, currency])

  const changeDatePicker = (item: any) => {
    const selection = item.selection
    const remaining = moment(new Date(selection?.endDate)).diff(new Date(selection?.startDate))

    const diffDuration = moment.duration(remaining)

    const months = diffDuration.months()
    const days = diffDuration.days()

    setDuration(`${months > 0 ? `${months} months ` : ``} ${days > 0 ? `${days} days` : ``}`)
    setRanges([item.selection])
  }

  const changeListingPrice = (price: string) => {
    if (Number(price) > 0) {
      setErrorMsg({ ...errorMsg, price: '' })
      setListingPrice(Number(price))
      const _earning = (Number(price) * (100 - Number(serviceFee) - Number(collection?.creatorFee)) / 100).toFixed(3)
  
      setEarning(Number(_earning))
    } else {
      setErrorMsg({ ...errorMsg, price: 'Please enter valid price.' })
    }
  }

  const listing = useCallback( async () => {
    if (!account) {
      const message = 'Welcome to Wadza! Sign for listing NFT'
      await signMessage(message)
    }

    if (Number(listingPrice) > 0) {
      setErrorMsg({ ...errorMsg, price: '' })
      try {
        setLoading(true)
        const listLoading = toast.loading('Please wait while we list your NFT...')
        const c = usefullCurrencies.filter((c) => c.name === currency)
        
        /** approve */
        const approveResult: any = await approveERC721NFTs(
          user?.walletAddress,
          contractAddresses.NFTSALE!,
          nft?.tokenAddress,
        )
        if (approveResult?.data && !approveResult?.data?.err) {
          /** saving item data */
          const data = {
            listing: nft?._id ? nft._id : null,
            price: listingPrice,
            startingDate: convertDateToUnixTimestamp(ranges[0]?.startDate).toString(),
            expiryDate: convertDateToUnixTimestamp(ranges[0]?.endDate).toString(),
            isFixedPrice: typeOfSale === 'fixed' ? true : false,
            isTimedAuction: typeOfSale === 'auction' ? true : false,
            isSold: false,
            owner: owner?._id ? owner._id : null,
            seller: user?._id,
            currency: currency
          }

          await saveItem(data)
          toast.update(listLoading, { render: 'NFT was listed successfully', type: 'success', isLoading: false, autoClose: 3000 })
          setLoading(false)
        } else {
          if (approveResult?.data?.err?.code === 4001) {
            toast.update(listLoading, { render: approveResult?.data?.err?.message, type: 'info', isLoading: false, autoClose: 3000 })
          }
          setLoading(false)
        }
      } catch (err) {
        console.log('listing error :: ', err)
      }
    } else {
      setErrorMsg({ ...errorMsg, price: 'Please enter valid price.' })
    }
  }, [nft, owner, account, currency, errorMsg, ranges, signMessage, typeOfSale, user, listingPrice])

  return (
    <div className='flex flex-col max-w-[1250px] w-full'>
      {/* header */}
      <div className='flex flex-row justify-start items-center max-w-[351px] w-full bg-[#DFDBE4] pl-[62px] pr-[75px] py-[26px] rounded-t-[15px]'>
        <button onClick={() => router.push({ pathname: `/assets/${params[0]}/${params[1]}/${params[2]}` })} className='flex flex-row justify-center items-center w-[35px] h-[35px] border border-solid border-[#8B6EAE] rounded mr-[35px] hover:scale-[1.04] hover:shadow-sm active:scale-[1]'>
          <ArrowLeftSvgIcon color='#8B6EAE' width={8} height={14} />
        </button>
        <span className='font-poppins-700 text-[25px] text-black-lighter leading-[98.3%]'>
          <FormattedMessage id='page.nft_detail.list.title' />
        </span>
      </div>
      {/* body */}
      <div className='w-full bg-purple-lightest pl-[62px] pr-11 pt-[61px] pb-[90px] rounded-[0px_15px_15px_15px]'>
        <div className='flex flex-col md:flex-row md:justify-between'>
          {/* left side */}
          <div className='max-w-[612px] w-full'>
            {/* type of sale */}
            <div>
              <h2 className='font-poppins-700 text-md text-black leading-[98.3%]'>
                <FormattedMessage id='page.nft_detail.list.label.choose_type' />
              </h2>
              <div className='flex flex-col mt-[26px]'>
                <ItemRadio
                  onClick={() => setTypeOfSale('fixed')}
                  checked={typeOfSale === 'fixed'}
                  id='fixed'
                  name='type_of_sale'
                  label={intl.formatMessage({ 'id': 'page.nft_detail.list.type_of_sale.fixed_price.label' })}
                  description={intl.formatMessage({ 'id': 'page.nft_detail.list.type_of_sale.fixed_price.desc' })}
                />
                <ItemRadio
                  onClick={() => setTypeOfSale('auction')}
                  checked={typeOfSale === 'auction'}
                  id='auction'
                  name='type_of_sale'
                  label={intl.formatMessage({ 'id': 'page.nft_detail.list.type_of_sale.timed_auction.label' })}
                  description={intl.formatMessage({ 'id': 'page.nft_detail.list.type_of_sale.timed_auction.desc' })}
                  className='mt-[9px]'
                />
              </div>
            </div>
            {/* auction method */}
            {typeOfSale === 'auction' && <div className='mt-[62px]'>
              <h2 className='font-poppins-700 text-md text-black leading-[98.3%]'>
                <FormattedMessage id='page.nft_detail.list.label.choose_method' />
              </h2>
              <div className='flex flex-col mt-[26px]'>
                <ItemRadio
                  onClick={() => setAuctionMethod('highest_bidder')}
                  checked={auctionMethod === 'highest_bidder'}
                  id='highest_bidder'
                  name='auction_method'
                  label={intl.formatMessage({ 'id': 'page.nft_detail.list.choose_method.highest_bidder.label' })}
                  description={intl.formatMessage({ 'id': 'page.nft_detail.list.choose_method.highest_bidder.desc' })}
                />
                <ItemRadio
                  onClick={() => setAuctionMethod('declining_price')}
                  checked={auctionMethod === 'declining_price'}
                  id='declining_price'
                  name='auction_method'
                  label={intl.formatMessage({ 'id': 'page.nft_detail.list.choose_method.declining_price.label' })}
                  description={intl.formatMessage({ 'id': 'page.nft_detail.list.choose_method.declining_price.desc' })}
                  className='mt-[9px]'
                />
              </div>
            </div>}
            {/* starting price */}
            <div className='mt-[62px]'>
              <h2 className='font-poppins-700 text-md text-black leading-[98.3%]'>
                <FormattedMessage id='page.nft_detail.list.starting_price.label' />
              </h2>
              <div className='flex flex-row h-[56px] border border-solid border-[#D7CDE5] rounded-[17px] mt-[21px]'>
                <input
                  type='text'
                  className={`w-full rounded bg-purple-lightest font-poppins-400 text-base text-black focus:outline-none pl-[27px] py-5 rounded-l-[17px] leading-[98.3%]`}
                  placeholder={intl.formatMessage({ 'id': 'page.nft_detail.list.starting_price.placeholder' })}
                  onChange={(e) => changeListingPrice(e.target.value)}
                />
                <div className='relative flex max-w-[140px] w-full' ref={ref}>
                  <button onClick={() => setShowCurrencies(!showCurrencies)} className={`flex w-full h-full bg-[#D7CDE5] justify-center items-center rounded-r-[15px]`}>
                    <h4 className='font-poppins-700 text-base text-black leading-[98.3%] mr-4'>
                      {currency}
                    </h4>
                    <ArrowDownSvgIcon color='#393939' width={10} height={6} />
                  </button>
                  <NavbarDropdown show={showCurrencies}>
                    <ul className={`absolute max-w-[140px] w-full bg-white mt-[60px] p-2 divide-y divide-gray-100 rounded-md max-h-52 overflow-y-auto`}>
                      {currencies.length > 0 ? currencies.map((currency: any, index: number, arr: Array<any>) => (
                        <li key={index} onClick={() => selectCurrency(currency.symbol)} className='flex flex-row items-center text-black hover:bg-purple hover:text-white py-2 px-4 ease-in duration-200 cursor-pointer'>
                          {currency.symbol}
                        </li>
                      )) : <li className='px-4 py-2 text-gray-lighter'>No results</li>}
                    </ul>
                  </NavbarDropdown>
                </div>
              </div>
              {errorMsg.price && (<span className='font-poppins-400 text-[9px] text-red-600 mt-1 leading-4'>
                {errorMsg.price}
              </span>)}
            </div>
            {/* set duration */}
            <div className='mt-[48px]'>
              <h2 className='font-poppins-700 text-md text-black leading-[98.3%]'>
                <FormattedMessage id='page.nft_detail.list.set_duration.label' />
              </h2>
              <button onClick={() => setShowCalendar(!showCalendar)} className='flex flex-row justify-between items-center w-full h-[56px] border border-solid border-[#D7CDE5] rounded-[15px] hover:bg-[#D7CDE5] mt-[21px] pl-[23px] pr-[30px] py-5'>
                <div className='flex'>
                  <span className='mr-5'>
                    <CalendarAltSvgIcon color='#393939' />
                  </span>
                  <h3 className='font-poppins-400 text-base text-black leading-[98.3%]'>
                    {duration}
                  </h3>
                </div>
                {showCalendar ? <ArrowUpSvgIcon color='#393939' /> : <ArrowDownSvgIcon color='#393939' />}
              </button>
              {showCalendar && <div ref={calRef}><DateRangePicker
                onChange={item => changeDatePicker(item)}
                showPreview={false}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={ranges}
                direction='horizontal'
                className='absolute mt-1 font-poppins-400 z-[1]'
                inputRanges={[]}
              /></div>}
            </div>
            {/* more options */}
            <div className='mt-[52px]'>
              <div onClick={() => setShowMoreOptions(!showMoreOptions)} className='flex flex-row justify-between items-center w-full cursor-pointer'>
                <h2 className='font-poppins-700 text-md text-black leading-[98.3%]'>
                  <FormattedMessage id='page.nft_detail.list.more_options.label' />
                </h2>
                {showMoreOptions ? <ArrowUpSvgIcon color='#393939' /> : <ArrowDownSvgIcon color='#393939' />}
              </div>
              {showMoreOptions && <div className='w-full mt-[23px]'>
                <MoreOption checked={bundle} onChange={() => setBundle(!bundle)} label={intl.formatMessage({ 'id': 'page.nft_detail.list.more_options.set_bundle.label' })} />
                <MoreOption checked={reserve} onChange={() => setReserve(!reserve)} className='mt-[14px]' label={intl.formatMessage({ 'id': 'page.nft_detail.list.more_options.set_reserve.label' })} description={intl.formatMessage({ 'id': 'page.nft_detail.list.more_options.set_reserve.desc' })} />
              </div>}
            </div>
          </div>
          {/* right side */}
          <div className='relative max-w-[461px] w-full'>
            <div className='md:absolute md:top-[-138px] w-full'>
              <div className='relative flex-col w-full bg-white rounded-[15px]'>
                <div className='p-[13px]'>
                  <div className='relative w-full h-full px-[13px] pt-[13px] overflow-hidden rounded-[7px] pb-[100%]'>
                    <picture><img
                      src={img? String(img).includes('ipfs://')? String(img).replace('ipfs://', 'https://ipfs.io/ipfs/') : img : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
                      alt='nft image'
                      className='absolute rounded-[7px] max-h-[436px] h-full inset-0 max-w-full min-w-full min-h-full object-cover'
                    /></picture>
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <div className='w-full px-9 pt-[13px] pb-[42px]'>
                    <h1 className='font-poppins-700 text-[24px] text-purple-light leading-[98.3%]'>
                      {name}
                    </h1>
                    <h2 className='font-poppins-400 text-base text-purple-light leading-[98.3%] mt-[14px]'>
                      {collectionName}
                    </h2>
                    <div className='flex flex-row justify-between w-full h-[46px] px-5 py-4 mt-[38px] border border-solid border-[#F2F0F5] rounded-t-[9px]'>
                      <h4 className='font-poppins-700 text-sm text-black leading-[98.3%]'>
                        <FormattedMessage id='page.nft_detail.list.nft_data.listing_price.label' />
                      </h4>
                      <h4 className='font-poppins-400 text-sm text-black leading-[98.3%]'>
                        {`${listingPrice} ${currency.toUpperCase()}`}
                      </h4>
                    </div>
                    <div className='flex flex-row justify-between w-full h-[46px] px-5 py-4 border-x border-b border-solid border-[#F2F0F5]'>
                      <h4 className='font-poppins-700 text-sm text-black leading-[98.3%]'>
                        <FormattedMessage id='page.nft_detail.list.nft_data.service_fee.label' />
                      </h4>
                      <h4 className='font-poppins-400 text-sm text-black leading-[98.3%]'>
                        {`${serviceFee}%`}
                      </h4>
                    </div>
                    <div className='flex flex-row justify-between w-full h-[46px] px-5 py-4 border-x border-solid border-[#F2F0F5]'>
                      <h4 className='font-poppins-700 text-sm text-black leading-[98.3%]'>
                        <FormattedMessage id='page.collection.creation.creator_fee.label' />
                      </h4>
                      <h4 className='font-poppins-400 text-sm text-black leading-[98.3%]'>
                        {`${collection?.creatorFee}%`}
                      </h4>
                    </div>
                    <div className='flex flex-row justify-between items-center w-full h-[55px] bg-[#F2F0F5] px-5 rounded-b-[9px]'>
                      <h4 className='font-poppins-700 text-base text-black leading-[98.3%]'>
                        <FormattedMessage id='page.nft_detail.list.nft_data.potential_earning.label' />
                      </h4>
                      <h4 className='font-poppins-400 text-base text-black leading-[98.3%]'>
                        {`${earning} ${currency}`}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => loading? {} : listing()} disabled={loading} className={`flex flex-row justify-center items-center max-w-[289px] w-full h-[68px] ${loading? 'bg-purple-light' : 'bg-purple'} rounded-[14px] mt-[51px] hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
          {loading? <Lottie animationData={Loading} style={{width: 30, height: 50, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
            <FormattedMessage id='page.nft_detail.list.button.complete_listing' />
          </h4>}
        </button>
      </div>
    </div>
  )
}

export default ListSection
