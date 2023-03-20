import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMetamask } from '../../contexts/Metamask.context'
import { IModal } from '../../types/types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CloseSvgIcon, EthereumAltSvgIcon, WalletAltSvgIcon } from '../icons'
import { toast } from 'react-toastify'
import { abbreviation } from '../../utils/utils'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
}

const showOnlyCurrencies = 'ape,avax_cchain,bat,dai,enj,eth,eth_arbitrum,eth_optimism,eth_polygon,klay,link,mana,matic,matic_polygon,sand,sol,uni,usdc,usdc_polygon,weth'

const AddFundsModal = (props: IProps) => {
  const { isOpen, title, close } = props
  const modalRef = useRef<HTMLDivElement>(null)
  const { account } = useMetamask()
  const [option, setOption] = useState<string>('')

  useEffect(() => {
    const handler = (event: any) => {
      if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
        setOption('')
        close()
      }
    }
    window.addEventListener('mousedown', handler)

    return () => {
      window.removeEventListener('mousedown', handler)
    }
  }, [close])

  return (
    <>
      {isOpen ? (
        <>
          <div
            className='flex fixed justify-center items-center inset-0 z-50'
          >
            <div
              ref={modalRef}
              className='max-w-[568px] w-full'
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
                <div className='px-[34px]'>
                  {/* general */}
                  {option === '' && <section className='flex flex-col items-center justify-center pt-[51px] pb-[38px]'>
                    <div className='flex flex-row justify-center items-center w-[109px] h-[109px] rounded-full bg-[#F0ECF5]'>
                      <WalletAltSvgIcon color='#C8B6DE' width={49} height={40} />
                    </div>
                    <div className='max-w-[609px] w-full mt-7'>
                      <h3 className='font-poppins-400 text-[19px] text-purple-light leading-[28px] text-center'>
                        <FormattedMessage id='page.modal.add_funds.desc' />
                      </h3>
                    </div>
                    <div className='w-full mt-[54px]'>
                      <button onClick={() => setOption('card')} className='flex flex-row justify-center items-center w-full h-[58px] bg-purple hover:bg-purple-light hover:shadow-sm rounded-md duration-150'>
                        <h4 className='font-poppins-400 text-[19px] text-white leading-[98.3%]'>
                          <FormattedMessage id='page.modal.add_funds.button.buy_with_card' />
                        </h4>
                      </button>
                      <button onClick={() => setOption('deposit')} className='flex flex-row justify-center items-center w-full h-[58px] bg-purple hover:bg-purple-light hover:shadow-sm rounded-md mt-[14px] duration-150'>
                        <h4 className='font-poppins-400 text-[19px] text-white leading-[98.3%]'>
                          <FormattedMessage id='page.modal.add_funds.button.deposit_crypto' />
                        </h4>
                      </button>
                    </div>
                  </section>}

                  {/* deposit crypto */}
                  {option === 'deposit' && <section className='flex flex-col items-center justify-center pt-[51px] pb-[38px]'>
                    <div className='flex flex-row justify-center items-center w-[183px] h-[183px] rounded-full bg-[#F0ECF5]'>
                      <EthereumAltSvgIcon color='#C8B6DE' width={67} height={112} />
                    </div>
                    <div className='max-w-[609px] w-full mt-7'>
                      <h3 className='font-poppins-400 text-[19px] text-purple-light leading-[28px] text-center'>
                        <FormattedMessage id='page.modal.add_funds.deposit_crypto.desc' />
                      </h3>
                    </div>
                    <div className='flex flex-row w-full mt-10 space-x-2'>
                      <div className='flex flex-row items-center w-3/4 h-[58px] pl-6 bg-[#F5F5F5] rounded-md'>
                        <h4 className='font-poppins-400 text-base text-[#BCBCBC] leading-6'>
                          {abbreviation(account || '', 24)}
                        </h4>
                      </div>
                      <CopyToClipboard text={account || ''} onCopy={() => toast.success('Copied!')}>
                        <button className='flex flex-row justify-center items-center w-1/4 h-[58px] bg-purple hover:bg-purple-light hover:shadow-sm rounded-md duration-150'>
                          <h4 className='font-poppins-400 text-[19px] text-white leading-[98.3%]'>
                            <FormattedMessage id='page.nft_detail.collection.nft_detail.tooltip.copy' />
                          </h4>
                        </button>
                      </CopyToClipboard>
                    </div>
                    <button onClick={() => setOption('card')} className='flex flex-row justify-center items-center w-full h-[58px] bg-purple hover:bg-purple-light hover:shadow-sm rounded-md duration-150 mt-4'>
                      <h4 className='font-poppins-400 text-[19px] text-white leading-[98.3%]'>
                        <FormattedMessage id='page.modal.add_funds.button.buy_with_card' />
                      </h4>
                    </button>
                  </section>}

                  {/* buy with card */}
                  {option === 'card' && <section className='flex flex-col items-center justify-center w-full h-full'>
                    <iframe
                      allow='accelerometer; autoplay; camera; gyroscope; payment'
                      width={'100%'}
                      height={480}
                      src={`${process.env.NEXT_PUBLIC_MOONPAY_API_URL}?baseCurrencyCode=USD&apiKey=${process.env.NEXT_PUBLIC_MOONPAY_API_KEY}&showOnlyCurrencies=${showOnlyCurrencies}&colorCode=#8B6EAE&showWalletAddressForm=true&walletAddress=${account || ''}&externalCustomerId=${process.env.NEXT_PUBLIC_MOONPAY_EXTERNAL_CUSTOMER_ID}`}
                      title="Buy with Moonpay"
                    ></iframe>
                    <button onClick={() => setOption('deposit')} className='flex flex-row justify-center items-center bg-btn-primary w-full h-[58px] bg-purple hover:bg-purple-light hover:shadow-sm rounded-md my-5 duration-150'>
                      <h4 className='font-poppins-400 text-[19px] text-white leading-[98.3%]'>
                        <FormattedMessage id='page.modal.add_funds.button.deposit_crypto' />
                      </h4>
                    </button>
                  </section>}
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

export default AddFundsModal
