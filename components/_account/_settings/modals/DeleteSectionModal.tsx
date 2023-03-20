import React, { useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import Lottie from 'lottie-react'
import { IModal } from '../../../../types/types'
import { CloseSvgIcon } from '../../../icons'
import Loading from '../../../../assets/lotties/loading.json'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
  removeLoading: boolean
  remove: (featuredItemId: string) => void
  selectedItem: any  
}

const DeleteSectionModal = (props: IProps) => {
  const { isOpen, title, close, removeLoading, remove, selectedItem } = props
  const modalRef = useRef<HTMLDivElement>(null)

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
              className='max-w-[468px] w-full'
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
                <div className='flex flex-col items-center w-full p-[22px]'>
                  <h4 className='font-poppins-600 text-base text-black leading-6'>
                    <FormattedMessage id='page.account.settings.tab.featured_items.modal.delete_section.desc' />
                  </h4>
                  <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-5'>
                    <button onClick={close} className={`flex flex-row justify-center items-center w-full h-[58px] bg-purple-lightest rounded-[14px] mt-5 hover:bg-purple-lighter hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                      <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
                        <FormattedMessage id='page.nft_detail.offer.button.cancel' />
                      </h4>
                    </button>
                    <button onClick={() => remove(selectedItem?._id || '')} disabled={removeLoading} className={`flex flex-row justify-center items-center w-full h-[58px] ${removeLoading ? 'bg-purple-light' : 'bg-purple'} rounded-[14px] mt-5 hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                      {removeLoading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
                        <FormattedMessage id='page.button.confirm' />
                      </h4>}
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

export default DeleteSectionModal
