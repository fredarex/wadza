import React, { useEffect, useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useMetamask } from '../../../contexts/Metamask.context'
import { IModal } from '../../../types/types'
import { CloseSvgIcon, FacebookSvgIcon, TelegramSvgIcon, TwitterSvgIcon, UnlinkSvgIcon } from '../../icons'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
  data: any
}

const styles = {
  shareBtn: 'flex flex-row justify-center items-center w-[35px] h-[35px] bg-[#FAF5FF] rounded mr-1 hover:bg-[F5EBFF] hover:scale-[1.001] hover:shadow-sm',
}

const MintedModal = (props: IProps) => {
  const { isOpen, title, close, data } = props
  const intl = useIntl()
  const router = useRouter()
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
              className='max-w-[578px] w-full'
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
                <div className={`flex flex-col items-center pt-10`}>
                  <picture>
                    <img
                      src={data?.image? data.image : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER}
                      alt='nft image'
                      className='w-[188px] h-[188px] object-cover rounded-[7px]'
                    />
                  </picture>
                  <h4 className='flex flex-row font-poppins-400 text-purple text-base leading-6 mt-[34px]'>
                    <FormattedMessage id='page.minted_modal.label.you_just_created' />&nbsp;
                    <span onClick={() => router.push({pathname: `/assets/${chain?.slug}/${data?.tokenAddress}/${data?.tokenId}`})} className='underline cursor-pointer'>
                      {data?.name}
                    </span>
                  </h4>
                </div>
                {/* footer */}
                <div className='flex flex-col items-center w-full mt-[29px] mb-12'>
                  <hr className='w-full h-[2px] bg-[#F0ECF5]' />
                  <h4 className='font-poppins-600 text-sm text-purple leading-6 mt-[29px]'>
                    {intl.formatMessage({ 'id': 'page.nft_detail.modal.purchase.label.share_to' }).toUpperCase()}...
                  </h4>
                  <div className='flex flex-row justify-center items-center mt-2'>
                    <CopyToClipboard text={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/${chain?.slug}/${data?.tokenAddress}/${data?.tokenId}`} onCopy={() => toast.success('Copied!')}>
                      <button className={styles.shareBtn}>
                        <UnlinkSvgIcon color='#3C1361' width={17} height={17} />
                      </button>
                    </CopyToClipboard>
                    <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_BASE_URL}/assets/${chain?.slug}/${data?.tokenAddress}/${data?.tokenId}/`, '_blank')} className={styles.shareBtn}>
                      <FacebookSvgIcon color='#3C1361' width={8} height={16} />
                    </button>
                    <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my new item on Wadza!`)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/assets/${chain?.slug}/${data?.tokenAddress}/${data?.tokenId}/`)}&via=wadza`, '_blank')} className={styles.shareBtn}>
                      <TwitterSvgIcon color='#3C1361' width={18} height={15} />
                    </button>
                    <button onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/assets/${chain?.slug}/${data?.tokenAddress}/${data?.tokenId}/`)}&text=${encodeURIComponent(`Check out my new item on Wadza!`)}`, '_blank')} className={styles.shareBtn}>
                      <TelegramSvgIcon color='#3C1361' width={17} height={14} />
                    </button>
                  </div>
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

export default MintedModal
