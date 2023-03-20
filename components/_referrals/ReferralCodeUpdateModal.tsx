import React, { useEffect, useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Lottie from 'lottie-react'
import { IModal } from '../../types/types'
import { CloseSvgIcon } from '../icons'
import { MainInput } from '../form'
import Loading from '../../assets/lotties/loading.json'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  code: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  close: () => void
  accept: () => void
  error: string
  loading: boolean
}

const ReferralCodeUpdateModal = (props: IProps) => {
  const intl = useIntl()
  const { isOpen, title, close, accept, code, onChange, error, loading } = props
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
                <div className='pt-5 px-[39px] pb-[26px]'>
                  <MainInput
                    type={`text`}
                    value={code || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
                    placeholder={intl.formatMessage({ 'id': 'page.referrals_join.input_nickname.placeholder' })}
                    errorMsg={error || ''}
                    className='mt-[17px]'
                    inputClassName='w-full h-11 px-5 rounded-[6px] text-sm border border-solid border-[#BCBCBC]'
                  />
                  <h3 className='max-w-[414px] w-full font-poppins-400-italic text-sm text-black leading-[21px] mt-[13px]'>
                    <FormattedMessage id='page.referrals_join.input_nickname.desc' />
                  </h3>
                  <button onClick={() => accept()} disabled={loading} className={`flex flex-row justify-center items-center w-full h-[48px] ${loading ? 'bg-purple-light' : 'bg-purple'} rounded-[6px] mt-[43px] hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                    {loading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
                      <FormattedMessage id='page.collection_edit.button.update' />
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
  );
}

export default ReferralCodeUpdateModal
