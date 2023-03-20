import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { IModal } from '../../types/types'
import { CloseSvgIcon } from '../icons'
import Lottie from 'lottie-react'
import Loading from '../../assets/lotties/loading.json'
import { verifyEmail } from '../../api/auth'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/features/userSlice'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
  email: string
}

const VerifyEmailModal = (props: IProps) => {
  const { isOpen, title, close, email } = props
  const dispatch = useDispatch()
  const modalRef = useRef<HTMLDivElement>(null)
  const intl = useIntl()
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

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

  const verify = async () => {
    if (code) {
      setLoading(true)
      const verifyResult = await verifyEmail({
        email,
        code,
      })

      if (!verifyResult?.data?.error && verifyResult?.data?.data) {
        toast.success('Email Verified successfully! Please login with your email')
        setCode('')
        setLoading(false)        
        close()
      } else {
        setLoading(false)
        toast.info(verifyResult?.data?.error || 'Unexpected error occurred')
      }
    } else {
      toast.info('Please enter a verification code')
      return
    }
  }

  return (
    <>
      {isOpen && email ? (
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
                <div className='pt-6 pb-11 px-[39px] inlin'>
                  <div className='inline font-poppins-400 text-[15px] text-purple leading-6'>
                    <h4 className='inline'>
                      <FormattedMessage id='page.navbar.verify_email.modal.desc.1' />
                    </h4>&nbsp;
                    <h4 className='inline'>
                      <b>
                        {email || ''}
                      </b>
                    </h4>&nbsp;
                    <h4 className='inline'>
                      <FormattedMessage id='page.navbar.verify_email.modal.desc.2' />
                    </h4>
                  </div>
                  <div className='mt-5'>
                    <h4 className='font-poppins-400 text-base text-purple leading-6'>
                      <FormattedMessage id='page.navbar.verify_email.modal.code.label' />
                    </h4>
                    <input
                      type={`text`}
                      placeholder={intl.formatMessage({'id': 'page.navbar.verify_email.modal.code.placeholder'})}
                      className='w-full font-poppins-400 text-sm leading-[21px] text-black bg-[#F5F5F5] rounded-md px-5 py-3 placeholder:text-[#BCBCBC] mt-1 focus:outline-none'
                      value={code || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                    />
                  </div>
                  <div className='font-poppins-400 text-[15px] text-purple leading-6 mt-8'>
                    <h4 className='inline'>
                      <FormattedMessage id='page.navbar.verify_email.modal.tip.1' />
                    </h4>&nbsp;
                    <h4 className='inline'>
                      <b className='underline cursor-pointer'>
                        <FormattedMessage id='page.navbar.verify_email.modal.tip.2' />
                      </b>
                    </h4>&nbsp;
                    <h4 className='inline'>
                      <FormattedMessage id='page.navbar.verify_email.modal.tip.3' />
                    </h4>
                  </div>
                  <button onClick={() => verify()} disabled={loading} className={`flex flex-row justify-center items-center w-full h-[58px] ${loading ? 'bg-purple-light' : 'bg-purple'} rounded-md mt-10 hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                    {loading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-[19px] text-white leading-[98.3%]'>
                      <FormattedMessage id='page.navbar.verify_email.modal.button.confirm' />
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

export default VerifyEmailModal
