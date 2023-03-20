import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Lottie from 'lottie-react'
import { IModal } from '../../../types/types'
import { CloseSvgIcon, InfoCircleSvgIcon } from '../../icons'
import NftItem from './NftItem'
import Loading from '../../../assets/lotties/loading.json'
import { convertCryptoToCash } from '../../../utils/utils'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
  accept: () => void
  data: any
  offerData: any
  loading: boolean
}

const AcceptModal = (props: IProps) => {
  const { isOpen, title, close, accept, data, loading, offerData } = props
  const modalRef = useRef<HTMLDivElement>(null)
  const [totalEarnings, setTotalEarnings] = useState<any>({ price: '', usdPrice: '', })
  const [checked, setChecked] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<any>({ terms: '', })

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
  }, [close])

  useEffect(() => {
    const getTotalEarnings = async () => {
      const serviceFee = Number(offerData?.serviceFee || 0)
      const creatorFee = Number(data?.collection?.creatorFee || 0)
      const _totalEarnings = (100 - serviceFee - creatorFee) * Number(offerData.price) / 100
      setTotalEarnings({
        price: _totalEarnings.toFixed(4),
        usdPrice: await convertCryptoToCash(Number(_totalEarnings))
      })
    }

    getTotalEarnings()
  }, [offerData, data])

  const acceptOffer = useCallback( async () => {
    try {
      if (checked) {
        accept()
      } else {
        setErrorMsg((e: any) => ({ ...e, terms: 'You should check the terms of service', }))
      }
    } catch (err) {
      console.log(err)
    }
  }, [checked, accept])

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
                    item={{...offerData, currency: 'WETH'}}
                    royalities={false}
                  />
                  {/* fees, total earning */}
                  <div className='flex flex-col mt-[22px]'>
                    {/* fees */}
                    <div className='w-full pt-[17px] pb-6 pl-6 pr-[22px] border border-solid border-[#F0ECF5] rounded-t-md'>
                      <div className='flex flex-row items-center'>
                        <h2 className='font-poppins-600 text-purple text-[17px] leading-6 mr-[6px]'>
                          <FormattedMessage id='page.nft_detail.modal.accept_offer.label.fees' />
                        </h2>
                        <span className='cursor-pointer'>
                          <InfoCircleSvgIcon color='#D7CCE4' width={16} height={16} />
                        </span>
                      </div>
                      <div className='flex flex-row items-end mt-2'>
                        <h3 className='font-poppins-400 text-base text-[#8D8D8D] leading-6 whitespace-nowrap'>
                          <FormattedMessage id='page.nft_detail.modal.accept_offer.label.wadza_fee' />
                        </h3>
                        <span className='w-full border-b border-solid border-[#E7E5E9] mx-[10px]'></span>
                        <h3 className='font-poppins-400 text-base text-[#8D8D8D] leading-6'>
                          {`${offerData.serviceFee}%`}
                        </h3>
                      </div>
                      <div className='flex flex-row items-end mt-2'>
                        <h3 className='font-poppins-400 text-base text-[#8D8D8D] leading-6 whitespace-nowrap'>
                          <FormattedMessage id='page.collection.creation.creator_fee.label' />
                        </h3>
                        <span className='w-full border-b border-solid border-[#E7E5E9] mx-[10px]'></span>
                        <h3 className='font-poppins-400 text-base text-[#8D8D8D] leading-6'>
                          {`${data?.collection?.creatorFee? `${data.collection.creatorFee}%` : '--'}`}
                        </h3>
                      </div>
                    </div>
                    {/* total earning */}
                    <div className='flex flex-row justify-between w-full pt-[15px] pb-6 pl-6 pr-[22px] border-x border-b border-solid border-[#F0ECF5] rounded-b-md'>
                      <h2 className='font-poppins-600 text-purple text-[17px] leading-6'>
                        <FormattedMessage id='page.nft_detail.modal.accept_offer.label.total_earnings' />
                      </h2>
                      <div className='flex flex-col items-end'>
                        <h2 className='font-poppins-600 text-purple text-base leading-6'>
                          {`${totalEarnings?.usdPrice} USD`}
                        </h2>
                        <h3 className='font-poppins-400 text-[#707070] text-sm leading-6'>
                          {`(${totalEarnings?.price} WETH)`}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* terms of service */}
                  <label htmlFor={'terms_of_service'} onClick={() => {
                    if (!checked)
                      setErrorMsg({ ...errorMsg, terms: '', })
                    else 
                      setErrorMsg({ ...errorMsg, terms: 'You should check the terms of service', })
                    setChecked(!checked)
                  }} className='flex flex-row items-center cursor-pointer mt-[31px]'>
                    <input type={'checkbox'} id={'terms_of_service'} checked={checked} readOnly={true} className='form-check-input appearance-none w-[19px] h-[19px] border-none rounded-sm bg-[#F5F5F5] checked:bg-purple transition duration-200 cursor-pointer mr-[10px]' />
                    <span className='font-poppins-400 text-[13px] text-purple leading-5'>
                      <FormattedMessage id='page.nft_detail.modal.accept_offer.label.terms_of_service' />
                    </span>
                  </label>
                  {errorMsg.terms && <span className='font-poppins-400 text-[9px] text-red-600 mt-1 leading-4'>
                    {errorMsg.terms}
                  </span>}
                  {/* button */}
                  <button onClick={() => acceptOffer()} disabled={loading} className={`flex flex-row justify-center items-center w-full h-[58px] ${loading ? 'bg-purple-light' : 'bg-purple'} rounded-[14px] mt-[45px] hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                    {loading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
                      <FormattedMessage id='page.nft_detail.offer.button.accept' />
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

export default AcceptModal
