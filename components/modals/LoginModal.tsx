import React, { useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import { IModal } from '../../types/types'
import LoginOptionBtn from '../buttons/LoginOptionBtn'
import { CloseSvgIcon, EmailSvgIcon, GoogleSvgIcon, WalletSvgIcon } from '../icons'
import { useGoogleLogin } from '@react-oauth/google'
import { signinWithGoogle } from '../../api/auth'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/features/userSlice'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
  accept?: () => void
  openWalletsModal?: () => void
  openEmailLoginModal?: () => void
  openEmailSignupModal?: () => void
}

const LoginModal = (props: IProps) => {
  const { isOpen, title, close, accept, openWalletsModal, openEmailLoginModal, openEmailSignupModal } = props
  const modalRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

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

  const signinGoogle = async (access_token: string) => {
    const signinResult = await signinWithGoogle({ access_token, })
    if (!signinResult?.data?.error && signinResult?.data?.data) {
      dispatch(loginSuccess(signinResult))
      close()
    } else {
      toast.error(signinResult?.data?.error || 'Unexpected error occurred')      
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      const { access_token } = response
      if (access_token) {
        signinGoogle(access_token)
      }
    },
    onError: (errorResponse: any) => {
      console.log('error response :: ', errorResponse)
    }
  })

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
                <div className='py-9 px-[39px]'>
                  <LoginOptionBtn title='Connect your wallet' className='mb-[19px]' onClick={openWalletsModal}>
                    <WalletSvgIcon color='#FFFFFF' width={19} height={17} />
                  </LoginOptionBtn>
                  <LoginOptionBtn title='Login using your email' className='mb-[19px]' onClick={openEmailLoginModal}>
                    <EmailSvgIcon color='#FFFFFF' width={18} height={15} />
                  </LoginOptionBtn>
                  <LoginOptionBtn title='Login using your Google account' className='mb-[21px]' onClick={() => googleLogin()}>
                    <GoogleSvgIcon color='#FFFFFF' width={18} height={18} />
                  </LoginOptionBtn>
                  <div className='inline font-poppins-400 text-[15px] text-purple leading-6'>
                    <h4 className='inline mr-1'>
                      <FormattedMessage id='page.login.modal.desc.1' />
                    </h4>
                    <h4 onClick={openWalletsModal} className='inline mr-1 underline cursor-pointer'>
                      <b><FormattedMessage id='page.login.modal.desc.2' /></b>
                    </h4>
                    <h4 className='inline mr-1'>
                      <FormattedMessage id='page.login.modal.desc.3' />
                    </h4>
                    <h4 onClick={openEmailSignupModal} className='inline underline cursor-pointer'>
                      <b><FormattedMessage id='page.login.modal.desc.4' /></b>
                    </h4>
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

export default LoginModal
