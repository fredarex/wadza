import React, { useEffect, useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Lottie from 'lottie-react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import { IModal } from '../../../types/types'
import { CheckSvgIcon, CloseSvgIcon, FacebookSvgIcon, TelegramSvgIcon, TwitterSvgIcon, UnlinkSvgIcon } from '../../icons'
import NftItem from './NftItem'
import Loading from '../../../assets/lotties/loading.json'
import { abbreviationFormat } from '../../../utils/utils'
import { useMetamask } from '../../../contexts/Metamask.context'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
  accept?: () => void
  data: any
  loading?: boolean
  txHash?: any
}

const styles = {
  shareBtn: 'flex flex-row justify-center items-center w-[35px] h-[35px] bg-[#FAF5FF] rounded mr-1 hover:bg-[F5EBFF] hover:scale-[1.001] hover:shadow-sm',
}

const PurchaseModal = (props: IProps) => {
  const { isOpen, title, close, accept, data, loading, txHash } = props
  const intl = useIntl()
  const modalRef = useRef<HTMLDivElement>(null)
  const { chain } = useMetamask()

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
                <div className={`pt-9 ${!txHash.status? 'pb-9' : ''} px-[34px]`}>
                  {/* item */}
                  <NftItem
                    nft={data?.nft}
                    collection={data?.collection}
                    item={data?.item}
                    royalities={!txHash.status? true : false}
                    showPrice={!txHash.status? true : false}
                  />
                  {/* total */}
                  {!txHash.status && !txHash.txHash && <div className='flex flex-col justify-center items-start w-full h-[85px] border border-solid border-[#F0ECF5] rounded-md mt-4 px-[14px]'>
                    <h3 className='font-poppins-400 text-[17px] text-[#D1CBD9] leading-6'>
                      <FormattedMessage id='page.nft_detail.modal.purchase.total' />
                    </h3>
                    <div className='flex flex-row justify-start items-center mt-2'>
                      <h1 className='font-poppins-600 text-[24px] text-purple leading-6 mr-[14px]'>
                        {`$${data?.item?.usdPrice} USD`}
                      </h1>
                      <h3 className='font-poppins-400 text-[17px] text-[#D1CBD9] leading-6'>
                        {`${data?.item?.price} ${data?.item?.currency}`}
                      </h3>
                    </div>
                  </div>}
                  {/* button */}
                  {!txHash.status && !txHash.txHash && <button onClick={accept} disabled={loading} className={`flex flex-row justify-center items-center w-full h-[58px] ${loading ? 'bg-purple-light' : 'bg-purple'} rounded-[14px] mt-5 hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                    {loading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
                      <FormattedMessage id='page.nft_detail.modal.purchase.button.checkout' />
                    </h4>}
                  </button>}
                  {txHash.status && txHash.txHash && <div className='flex flex-col mt-[42px]'>
                    <div className='flex flex-row items-center w-full h-[46px] border border-solid border-[#F0ECF5] rounded-t-[6px] px-[15px]'>
                      <h3 className='w-[40%] font-poppins-400 text-[17px] text-[#D1CBD9] leading-6'>
                        <FormattedMessage id='page.assets.filter.sidebar.status' />
                      </h3>
                      <h3 className='w-[60%] font-poppins-400 text-[17px] text-[#D1CBD9] leading-6'>
                        <FormattedMessage id='page.nft_detail.modal.purchase.label.transaction_hash' />
                      </h3>
                    </div>
                    <div className='flex flex-row items-center w-full h-[68px] border-x border-b border-solid border-[#F0ECF5] rounded-b-[6px] px-[15px]'>
                      {txHash.status === 'success' && <div className='flex flex-row items-center w-[40%]'>
                        <div className='flex flex-row justify-center items-center w-[39px] h-[39px] bg-[#DFF2E8] rounded-[100%] mr-[11px]'>
                          <CheckSvgIcon color='#098F4B' width={13} height={9} />
                        </div>
                        <h3 className='font-poppins-400 text-[19px] text-purple leading-6'>
                          <FormattedMessage id='page.nft_detail.modal.purchase.label.complete' />
                        </h3>
                      </div>}
                      {txHash.status === 'failed' && <div className='flex flex-row items-center w-[40%]'>
                        <div className='flex flex-row justify-center items-center w-[39px] h-[39px] bg-[#FFE9DB] rounded-[100%] mr-[11px]'>
                          <CloseSvgIcon color='#FF5F00' width={13} height={13} />
                        </div>
                        <h3 className='font-poppins-400 text-[19px] text-purple leading-6'>
                          <FormattedMessage id='page.nft_detail.modal.purchase.label.failed' />
                        </h3>
                      </div>}
                      <div className='flex items-center w-[60%]'>
                        <h3 onClick={() => window.open(`${chain?.blockExplorerUrl}/tx/${txHash.txHash}`, '_blank')} className='font-poppins-400 text-[19px] text-purple leading-6 underline cursor-pointer'>
                          {abbreviationFormat(txHash.txHash, 6, 4)}
                        </h3>
                      </div>
                    </div>
                  </div>}
                </div>
                {/* footer */}
                {txHash.status && <div className='flex flex-col items-center w-full mt-[68px] mb-12'>
                  <hr className='w-full h-[2px] bg-[#F0ECF5]' />
                  <h4 className='font-poppins-600 text-sm text-purple leading-6 mt-[29px]'>
                    {intl.formatMessage({'id': 'page.nft_detail.modal.purchase.label.share_to'}).toUpperCase()}...
                  </h4>
                  <div className='flex flex-row justify-center items-center mt-2'>
                    <CopyToClipboard text={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/${chain?.slug}/${data?.nft?.tokenAddress}/${data?.nft?.tokenId}`} onCopy={() => toast.success('Copied!')}>
                      <button className={styles.shareBtn}>
                        <UnlinkSvgIcon color='#3C1361' width={17} height={17} />
                      </button>
                    </CopyToClipboard>
                    <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_BASE_URL}/assets/${chain?.slug}/${data?.nft?.tokenAddress}/${data?.nft?.tokenId}/`, '_blank')} className={styles.shareBtn}>
                      <FacebookSvgIcon color='#3C1361' width={8} height={16} />
                    </button>
                    <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my new item on Wadza!`)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/assets/${chain?.slug}/${data?.nft?.tokenAddress}/${data?.nft?.tokenId}/`)}&via=wadza`, '_blank')} className={styles.shareBtn}>
                      <TwitterSvgIcon color='#3C1361' width={18} height={15} />
                    </button>
                    <button onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/assets/${chain?.slug}/${data?.nft?.tokenAddress}/${data?.nft?.tokenId}/`)}&text=${encodeURIComponent(`Check out my new item on Wadza!`)}`, '_blank')} className={styles.shareBtn}>
                      <TelegramSvgIcon color='#3C1361' width={17} height={14} />
                    </button>
                  </div>
                </div>}
              </div>
            </div>
          </div>
          <div className='opacity-70 fixed inset-0 z-40 bg-purple'></div>
        </>
      ) : null}
    </>
  )
}

export default PurchaseModal
