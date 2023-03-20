import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Lottie from 'lottie-react'
import { IContractConfig, IModal } from '../../../types/types'
import { ArrowDownSvgIcon, BookmarkSvgIcon, CloseSvgIcon, WalletSvgIcon } from '../../icons'
import NftItem from './NftItem'
import Loading from '../../../assets/lotties/loading.json'
import Web3 from '../../../helpers/web3'
import { contracts } from '../../../config'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { convertCryptoToCash } from '../../../utils/utils'

import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'
import NavbarDropdown from '../../dropdowns/NavbarDropdown'
import { addDays } from 'date-fns'
import { useMetamask } from '../../../contexts/Metamask.context'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
  accept: () => void
  data: any
  offerData: any
  setOfferData: Dispatch<SetStateAction<any>>
  loading: boolean
}

const dateOptions = [
  1,
  3,
  7,
  30,
]

const OfferModal = (props: IProps) => {
  const { isOpen, title, close, accept, data, loading, offerData, setOfferData } = props
  const intl = useIntl()
  const modalRef = useRef<HTMLDivElement>(null)
  const calRef = useRef<any>(null)
  const calBtnRef = useRef<any>(null)
  const durationRef = useRef<any>(null)
  const _user: any = useSelector((state: RootState) => state.user.user)
  const { account, signMessage } = useMetamask()

  const [WETHBalance, setWETHBalance] = useState<any>({ balance: '--', usdPrice: '--', })
  const [usdPrice, setUsdPrice] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<any>({ price: '', })
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [date, setDate] = useState<any>(addDays(new Date(), 3))
  const [duration, setDuration] = useState<number>(3)
  const [showDuration, setShowDuration] = useState<boolean>(false)
  
  useEffect(() => {
    if (Number(offerData?.price) > Number(WETHBalance.balance)) {
      setErrorMsg((e: any) => ({ ...e, price: 'You do not have enough WETH' }))
      return
    } else {
      setErrorMsg((e: any) => ({ ...e, price: '' }))
    }
    const getUsdPrice = async () => {
      const _usdPrice = await convertCryptoToCash(offerData?.price)
      setUsdPrice(_usdPrice || '')
    }

    getUsdPrice()
  }, [offerData, WETHBalance])

  useEffect(() => {
    const handler = (event: any) => {
      if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
        close()
      }

      if (calRef.current !== null && calBtnRef.current !== null && !calRef.current.contains(event.target) && !calBtnRef.current.contains(event.target)) {
        setShowCalendar(false)
      }

      if (durationRef.current !== null && !durationRef.current.contains(event.target)) {
        setShowDuration(false)
      }
    }
    window.addEventListener('mousedown', handler)

    return () => {
      window.removeEventListener('mousedown', handler)
    }
  }, [close, setShowCalendar])

  useEffect(() => {
    const getWETHBalnce = async () => {
      try {
        const web3 = Web3.instance
        const erc20 = contracts.filter((contract: IContractConfig, index: number) => contract.name === 'ERC20')
        const erc20Contract = new web3.eth.Contract(erc20[0].abi, process.env.NEXT_PUBLIC_ETHEREUM_WETH)
        if (erc20Contract && _user) {
          const balanceResult = await erc20Contract.methods.balanceOf(_user.walletAddress!).call()
          setWETHBalance({
            balance: (Number(balanceResult) / 10 ** 18).toFixed(2),
            usdPrice: await convertCryptoToCash(Number(balanceResult) / 10 ** 18)
          })
        }
      } catch (err) {
        console.log(err)
      }
    }

    getWETHBalnce()
  }, [_user])

  const makeOffer = useCallback( async () => {
    try {
      if (Number(offerData?.price) > 0) {
        setErrorMsg({ ...errorMsg, price: ''})    
        accept()
      } else {
        setErrorMsg({ ...errorMsg, price: 'Please enter valid amount.'})
      }
    } catch (err) {
      console.log(err)
    }
  }, [accept, errorMsg, offerData])

  return (
    <>
      {isOpen ? (
        <>
          <div
            className='flex fixed justify-center items-center inset-0 z-50'
          >
            <div
              ref={modalRef}
              className='max-w-[768px] w-full'
            >
              {/*content*/}
              <div className='flex flex-col w-full bg-white rounded-[15px]'>
                {/*header*/}
                <div className='flex items-start justify-between pt-[23px] pb-5 px-[26px] border-b-2 border-solid border-[rgba(139,110,174,0.13)] rounded-t'>
                  <span className='w-[23px]'>&nbsp;</span>
                  <span className='font-poppins-600 text-lg text-purple leading-6'>
                    {title}
                  </span>
                  <button
                    onClick={close}
                  >
                    <CloseSvgIcon color='#3C1361' />
                  </button>
                </div>
                {/*body*/}
                <div className='py-9 px-[34px]'>
                  {/* item */}
                  <NftItem
                    nft={data?.nft}
                    collection={data?.collection}
                    item={data?.item}
                    royalities={false}
                  />
                  {/* balance, floor price */}
                  <div className='flex flex-col mt-[22px]'>
                    {/* balance */}
                    <div className='flex flex-row justify-between items-start h-[87px] px-[26px] py-5 border border-solid border-[#F0ECF5] rounded-t-[6px]'>
                      <div className='flex items-center'>
                        <WalletSvgIcon color='#3C1361' width={22} height={20} />
                        <h4 className='font-poppins-400 text-[17px] text-purple leading-6 ml-3'>
                          <FormattedMessage id='page.nft_detail.modal.offer.label.your_balance' />
                        </h4>
                      </div>
                      <div className='flex flex-col items-end'>
                        <h4 className='font-poppins-600 text-base text-purple leading-6'>
                          {`${WETHBalance.usdPrice} USD`}
                        </h4>
                        <h5 className='font-poppins-400 text-sm text-[#707070] leading-6'>
                          {`(${WETHBalance.balance} WETH)`}
                        </h5>
                      </div>
                    </div>
                    {/* floor price */}
                    <div className='flex flex-row justify-between items-start h-[87px] px-[26px] py-5 border-x border-b border-solid border-[#F0ECF5] rounded-b-[6px]'>
                      <div className='flex items-center'>
                        <BookmarkSvgIcon color='#3C1361' width={15} height={20} />
                        <h4 className='font-poppins-400 text-[17px] text-purple leading-6 ml-3'>
                          <FormattedMessage id='page.nft_detail.modal.offer.label.floor_price' />
                        </h4>
                      </div>
                      <div className='flex flex-col items-end'>
                        <h4 className='font-poppins-600 text-base text-purple leading-6'>
                          {`${data?.collection?.floorUSDPrice || '--'} USD`}
                        </h4>
                        <h5 className='font-poppins-400 text-sm text-[#707070] leading-6'>
                          {`(${data?.collection?.floorPrice || '--'} WETH)`}
                        </h5>
                      </div>
                    </div>
                  </div>
                  {/* price */}
                  <div className='flex flex-col mt-6'>
                    <h3 className='font-poppins-400 text-base text-purple leading-6'>
                      <FormattedMessage id='page.nft_detail.modal.offer.label.price' />
                    </h3>
                    <div className='flex flex-row justify-between h-[58px] bg-[#F5F5F5] pl-6 rounded-md mt-2'>
                      <input
                        type={`text`}
                        className='w-full bg-[#F5F5F5] rounded font-poppins-400 text-base text-black placeholder:text-[#BCBCBC] focus:outline-none'
                        placeholder={intl.formatMessage({'id': 'page.nft_detail.modal.offer.input.placeholder.enter_the_price'})}
                        value={offerData?.price}
                        onChange={(e) => setOfferData({ ...offerData, price: e.target.value })}
                      />
                      <div className='flex flex-row items-center min-w-[70px] py-3'>
                        <div className='flex justify-center w-full border-l-2 border-solid border-[#E0E0E0]'>
                          <h3 className='font-poppins-400 text-sm text-[#BCBCBC] leading-[21px]'>
                            {`WETH`}
                          </h3>
                        </div>
                      </div>
                    </div>
                    {errorMsg.price? <span className='font-poppins-400 text-[9px] text-red-600 mt-1 leading-4'>
                      {errorMsg.price}
                    </span> : <div className='flex flex-row justify-between items-center mt-3'>
                      {usdPrice? <h4 className='flex font-poppins-400 text-base text-[#999999] leading-6'>
                        {`$${usdPrice} `}<FormattedMessage id='page.nft_detail.modal.purchase.total' />
                      </h4> : <>&nbsp;</>}
                      <h4 className='flex font-poppins-400 text-base text-[#999999] leading-6'>
                        <FormattedMessage id='page.nft_detail.modal.offer.label.total_offer_amount' />:&nbsp;
                        {`${offerData?.price? offerData.price : '0'} WETH`}
                        {`${usdPrice? `($${usdPrice})` : ''}`}
                      </h4>
                    </div>}                    
                  </div>
                  {/* duration */}
                  <div className='flex flex-col mt-6'>
                    <h3 className='font-poppins-400 text-base text-purple leading-6'>
                      <FormattedMessage id='page.nft_detail.modal.offer.label.duration' />
                    </h3>
                    <div className='flex flex-row justify-between mt-[10px]'>
                      <div ref={durationRef} className='relative flex max-w-[180px] w-full h-[58px] mr-[17px]'>
                        <NavbarDropdown show={showDuration}>
                          <ul className={`absolute w-full bg-white mt-[-190px] p-2 divide-y divide-gray-100 rounded-md max-h-52 overflow-y-auto`}>
                            {dateOptions.length > 0 ? dateOptions.map((date: number, index: number, arr: Array<any>) => (
                              <li key={index} onClick={() => {
                                setDuration(date)
                                setDate(addDays(new Date(), date))
                                setOfferData({ ...offerData, expiry: moment(addDays(new Date(), date)).unix()})
                                setShowDuration(false)
                              }} className='flex flex-row items-center font-poppins-400 text-[#BCBCBC] hover:bg-purple hover:text-white py-2 px-4 ease-in duration-200 cursor-pointer'>
                                {`${date} ${date > 1 ? 'days' : 'day'}`}
                              </li>
                            )) : <li className='px-4 py-2 text-gray-lighter'>No results</li>}
                          </ul>
                        </NavbarDropdown>
                        <button onClick={() => setShowDuration(!showDuration)} className={`flex flex-row justify-between items-center w-full h-full bg-[#F5F5F5] px-5 rounded-md`}>
                          <h4 className='font-poppins-400 text-base text-[#BCBCBC] leading-[98.3%]'>
                            {`${duration} ${duration > 1? 'days' : 'day'}`}
                          </h4>
                          <ArrowDownSvgIcon color='#BCBCBC' width={13} height={8} />
                        </button>
                      </div>
                      <div className='relative max-w-[503px] w-full'>
                        {showCalendar && <div ref={calRef}><Calendar
                          onChange={item => {
                            console.log('item :: ', item)
                            setDate(item)
                            setOfferData({ ...offerData, expiry: moment(item).unix(), })
                            setShowCalendar(false)
                          }}
                          date={date}
                          className={`absolute top-[-300px] font-poppins-400 z-[1]`}
                        /></div>}
                        <div ref={calBtnRef} onClick={() => setShowCalendar(!showCalendar)} className='flex flex-row justify-between items-center h-[58px] bg-[#F5F5F5] rounded-md px-5'>
                          <h4 className='font-poppins-400 text-base text-[#BCBCBC] leading-6'>
                            {moment(date).format('MMM DD, YYYY')}
                          </h4>
                          <h4 className='font-poppins-400 text-base text-[#BCBCBC] leading-6'>
                            {moment(new Date()).format('hh:mm A')}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* button */}
                  <button onClick={() => makeOffer()} disabled={loading || errorMsg.price} className={`flex flex-row justify-center items-center w-full h-[58px] ${loading ? 'bg-purple-light' : 'bg-purple'} rounded-[14px] mt-5 hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                    {loading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
                      <FormattedMessage id='page.nft_detail.modal.offer.button.make_offer' />
                    </h4>}
                  </button>
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

export default OfferModal
