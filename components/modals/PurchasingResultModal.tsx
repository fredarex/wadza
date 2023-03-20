import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import { ICommonProps, IUserState } from '../../types/types'
import { CheckSvgIcon, CloseSvgIcon } from '../icons'
import { abbreviationFormat } from '../../utils/utils'
import { useMetamask } from '../../contexts/Metamask.context'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { setPurchasingResultModal } from '../../redux/features/userSlice'

interface IProps extends ICommonProps {
  txHash?: any
}

const PurchasingResultModal = (props: IProps) => {
  const { txHash } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const _user: IUserState = useSelector((state: RootState) => state.user)
  const [user, setUser] = useState<IUserState>()
  const modalRef = useRef<HTMLDivElement>(null)
  const { chain } = useMetamask()

  useEffect(() => {
    setUser(_user)
  }, [_user])

  const close = useCallback(() => {
    dispatch(setPurchasingResultModal(false))
  }, [dispatch])

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

  const viewPurchase = () => {
    dispatch(setPurchasingResultModal(false))
    router.push({
      pathname: `/account`
    })
  }

  return (
    <>
      {user?.purchasingResultModal ? (
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
                    <FormattedMessage id='page.navbar.purchasing_result.modal.title' />
                  </span>
                  <button
                    onClick={close}
                  >
                    <CloseSvgIcon color='#3C1361' />
                  </button>
                </div>
                {/*body*/}
                <div className='p-9'>
                  {txHash.status && txHash.txHash && <div className='flex flex-col'>
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
                  {/* footer */}
                  <button onClick={() => viewPurchase()} className='flex flex-row justify-center items-center w-full h-[58px] bg-purple-light rounded-[14px] mt-5 hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]'>
                    <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
                      <FormattedMessage id='page.navbar.purchasing_result.modal.button.view_purchase' />
                    </h4>
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

export default PurchasingResultModal
