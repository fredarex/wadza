import Lottie from 'lottie-react'
import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { IModal } from '../../types/types'
import { CloseSvgIcon } from '../icons'
import Loading from '../../assets/lotties/loading.json'
import { signinWithEmail } from '../../api/auth'
import { loginSuccess } from '../../redux/features/userSlice'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
  accept?: () => void
  openWalletsModal?: () => void
}

const EmailLoginModal = (props: IProps) => {
  const { isOpen, title, close, accept, openWalletsModal } = props
  const modalRef = useRef<HTMLDivElement>(null)
  const intl = useIntl()
  const router = useRouter()
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState<any>({
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState<any>({
    email: '',
    password: '',
  })
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

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    return email.toLowerCase()
      .match(re)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name
    const value: string = e.target.value

    let err: any = errorMsg

    if (name === 'email') {
      if (!value) {
        err.email = 'Email can not be empty'
      } else if (!validateEmail(value)) {
        err.email = 'Invalid email'
      } else {
        err.email = ''
      }

      setLoginData({
        ...loginData,
        email: value,
      })
    } else if (name === 'password') {
      if (!value) {
        err.password = 'Password can not be empty'
      } else {
        err.password = ''
      }

      setLoginData({
        ...loginData,
        password: value,
      })
    }
  }

  const validation = () => {
    let err: any = {...errorMsg}

    if (!loginData?.email) {
      err.email = 'Email can not be empty'
    } else if (!validateEmail(loginData?.email)) {
      err.email = 'Invalid email'
    } else {
      err.email = ''
    }

    if (!loginData?.password) {
      err.password = 'Password can not be empty'
    } else {
      err.password = ''
    }

    setErrorMsg(err)

    if (err.email || err.password)
      return false
    else 
      return true
  }

  const login = async () => {
    if (validation()) {
      setLoading(true)

      const loginResult = await signinWithEmail(loginData)
      if (!loginResult?.data.error && loginResult?.data?.data) {
        toast.success('Logged in successfully')
        dispatch(loginSuccess(loginResult))
        setLoading(false)
        close()
        router.push({
          pathname: '/',
        })
      } else {
        toast.error(loginResult?.data?.error || 'Unexpected error occurred')
        setLoading(false)
      }
    } else {
      toast.info('Please check the login form again!')
      return
    }
  }

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
                <div className='py-7 px-[39px]'>
                  {/* email */}
                  <div className='flex flex-col'>
                    <label className='font-poppins-400 text-base text-purple leading-6'>
                      <FormattedMessage id='page.navbar.email_login.modal.email.label' />
                    </label>
                    <input
                      type='email'
                      name='email'
                      placeholder={intl.formatMessage({'id': 'page.navbar.email_login.modal.email.placeholder'})}
                      className='w-full h-11 bg-[#F5F5F5] font-poppins-400 text-sm text-black placeholder:text-[#BCBCBC] leading-[21px] pl-[19px] mt-1 rounded-md focus:outline-none autofill:bg-[#F5F5F5]'
                      value={loginData?.email || ''}
                      autoComplete='new-email'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
                    />
                    {errorMsg?.email && <h4 className='font-poppins-400 text-[11px] text-red leading-6'>{errorMsg?.email}</h4>}
                  </div>
                  <div className='flex flex-col mt-6'>
                    <label className='font-poppins-400 text-base text-purple leading-6'>
                      <FormattedMessage id='page.navbar.email_login.modal.password.label' />
                    </label>
                    <input
                      type='password'
                      name='password'
                      placeholder={intl.formatMessage({'id': 'page.navbar.email_login.modal.password.placeholder'})}
                      className='w-full h-11 bg-[#F5F5F5] font-poppins-400 text-sm text-black placeholder:text-[#BCBCBC] leading-[21px] pl-[19px] mt-1 rounded-md focus:outline-none autofill:bg-[#F5F5F5]'
                      value={loginData?.password || ''}
                      autoComplete='new-password'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
                    />
                    {errorMsg?.password && <h4 className='font-poppins-400 text-[11px] text-red leading-6'>{errorMsg?.password}</h4>}
                  </div>
                  <h3 className='font-poppins-600 text-[15px] text-purple leading-6 underline mt-3'>
                    <FormattedMessage id='page.navbar.email_login.modal.forgot_your_password.label' />
                  </h3>
                  <button onClick={() => login()} disabled={loading} className={`flex flex-row justify-center items-center w-full h-[58px] ${loading ? 'bg-purple-light' : 'bg-purple'} rounded-md mt-9 hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                    {loading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-[19px] text-white leading-[98.3%]'>
                      <FormattedMessage id='page.home.navbar.login' />
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

export default EmailLoginModal
