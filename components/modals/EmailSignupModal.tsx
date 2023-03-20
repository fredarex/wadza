import Lottie from 'lottie-react'
import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { IModal } from '../../types/types'
import { CloseSvgIcon } from '../icons'
import Loading from '../../assets/lotties/loading.json'
import { referralCodeVerify, signupWithEmail } from '../../api/auth'
import { loginSuccess, setUpdatedUser } from '../../redux/features/userSlice'
import { toast } from 'react-toastify'

interface IProps extends IModal {
  isOpen: boolean
  title: string
  close: () => void
  openVerifyEmailModal: React.Dispatch<React.SetStateAction<boolean>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

const EmailSignupModal = (props: IProps) => {
  const { isOpen, title, close, openVerifyEmailModal, setEmail } = props
  const modalRef = useRef<HTMLDivElement>(null)
  const intl = useIntl()
  const dispatch = useDispatch()
  const [signupData, setSignupData] = useState<any>({
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    checked: '',
  })
  const [errorMsg, setErrorMsg] = useState<any>({
    email: '',
    password: '',
    confirmPassword: '',
    checked: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [verifyStatus, setVerifyStatus] = useState<any>({
    status: '',
    message: '',
  })
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false)

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
      setSignupData({
        ...signupData,
        email: value,
      })
    } else if (name === 'password') {
      if (!value) {
        err.password = 'Password can not be empty'
      } else if (!validatePassword(value)) {
        err.password = 'Invalid password'
      } else {
        err.password = ''
      }
      setSignupData({
        ...signupData,
        password: value,
      })
    } else if (name === 'confirm-password') {
      if (!value) {
        err.confirmPassword = 'Confirm password can not be empty'
      } else if (!validateConfirmPassword(value)) {
        err.confirmPassword = 'Confirm password should match with password'
      } else {
        err.confirmPassword = ''
      }
      setSignupData({
        ...signupData,
        confirmPassword: value,
      })
    } else if (name === 'referral-code') {
      setSignupData({
        ...signupData,
        referralCode: value,
      })
    }
  }

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    return email.toLowerCase()
      .match(re)
  }

  const validatePassword = (password: string) => {
    const re = /^[A-Za-z]+$/

    return password.toLowerCase()
      .match(re)
  }

  const validateConfirmPassword = (confirmPassword: string) => {
    if (signupData?.password === confirmPassword)
      return true
    else
      return false
  }

  const verifyReferralCode = async () => {
    setVerifyLoading(true)
    if (!signupData?.referralCode) {
      setVerifyLoading(false)
      return
    }

    const verifyResult = await referralCodeVerify({ referralCode: signupData?.referralCode })
    if (!verifyResult?.data?.error && verifyResult?.data?.data) {
      setVerifyStatus({
        status: verifyResult.data.data || '',
        message: intl.formatMessage({'id': 'page.navbar.email_signup.modal.verified.desc'})
      })
      setVerifyLoading(false)
    } else {
      setVerifyStatus({
        status: verifyResult.data.data || '',
        message: intl.formatMessage({'id': 'page.navbar.email_signup.modal.not_verified.desc'})
      })
      setVerifyLoading(false)
    }
  }

  const validation = () => {
    let err: any = {...errorMsg}

    if (!signupData?.email) {
      err.email = 'Email can not be empty'
    } else if (!validateEmail(signupData?.email)) {
      err.email = 'Invalid email'
    } else {
      err.email = ''
    }

    if (!signupData?.password) {
      err.password = 'Password can not be empty'
    } else if (!validatePassword(signupData?.password)) {
      err.password = 'Invalid password'
    } else {
      err.password = ''
    }

    if (!signupData?.confirmPassword) {
      err.confirmPassword = 'Confirm password can not be empty'
    } else if (!validateConfirmPassword(signupData?.confirmPassword)) {
      err.confirmPassword = 'Confirm password should match with password'
    } else {
      err.confirmPassword = ''
    }

    if (!signupData?.checked) {
      err.checked = 'You should check the terms of service'
    } else {
      err.checked = ''
    }

    setErrorMsg(err)

    if (err.email || err.password || err.confirmPassword || err.checked)
      return false
    else 
      return true
  }

  const singup = async () => {
    if (validation()) {
      setLoading(true)

      const singupResult = await signupWithEmail(signupData)
      if (!singupResult?.data.error && singupResult?.data?.data) {
        setLoading(false)
        setSignupData({
          email: '',
          password: '',
          confirmPassword: '',
          referralCode: '',
          checked: '',
        })
        close()
        setEmail(signupData?.email)
        openVerifyEmailModal(true)
      } else {
        toast.error(singupResult?.data?.error || 'Unexpected error occurred')
        setLoading(false)
        close()
      }
    } else {
      toast.info('Please check the signup form again!')
      return
    }
  }

  const checkTerms = () => {
    if (!signupData?.checked)
      setErrorMsg({ ...errorMsg, checked: '', })
    else 
      setErrorMsg({ ...errorMsg, checked: 'You should check the terms of service', })
    setSignupData({ ...signupData, checked: !signupData.checked})
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
                  {/* description */}
                  <h3 className='font-poppins-400 text-[15px] text-purple leading-6'>
                    <FormattedMessage id='page.navbar.email_signup.modal.desc' />
                  </h3>
                  {/* email */}
                  <div className='flex flex-col mt-5'>
                    <label className='font-poppins-400 text-base text-purple leading-6'>
                      <FormattedMessage id='page.navbar.email_login.modal.email.label' />
                    </label>
                    <input
                      type='email'
                      name='email'
                      placeholder={intl.formatMessage({'id': 'page.navbar.email_login.modal.email.placeholder'})}
                      className='w-full h-11 bg-[#F5F5F5] font-poppins-400 text-sm text-black placeholder:text-[#BCBCBC] leading-[21px] pl-[19px] mt-1 rounded-md focus:outline-none autofill:bg-[#F5F5F5]'
                      value={signupData?.email || ''}
                      autoComplete='new-email'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
                    />
                    {errorMsg?.email && <h4 className='font-poppins-400 text-[11px] text-red leading-6'>{errorMsg?.email}</h4>}
                  </div>
                  {/* password */}
                  <div className='flex flex-col mt-6'>
                    <label className='font-poppins-400 text-base text-purple leading-6'>
                      <FormattedMessage id='page.navbar.email_login.modal.password.label' />
                    </label>
                    <input
                      type='password'
                      name='password'
                      placeholder={intl.formatMessage({'id': 'page.navbar.email_login.modal.password.placeholder'})}
                      className='w-full h-11 bg-[#F5F5F5] font-poppins-400 text-sm text-black placeholder:text-[#BCBCBC] leading-[21px] pl-[19px] mt-1 rounded-md focus:outline-none autofill:bg-[#F5F5F5]'
                      value={signupData?.password || ''}
                      autoComplete='new-password'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
                    />
                    {errorMsg?.password && <h4 className='font-poppins-400 text-[11px] text-red leading-6'>{errorMsg?.password}</h4>}
                    <h5 className='font-poppins-400 text-[13px] text-purple leading-6 mt-2'>
                      <FormattedMessage id='page.navbar.email_signup.modal.password.desc' />
                    </h5>
                  </div>
                  {/* confirm password */}
                  <div className='flex flex-col mt-6'>
                    <label className='font-poppins-400 text-base text-purple leading-6'>
                      <FormattedMessage id='page.navbar.email_signup.modal.confirm_password.label' />
                    </label>
                    <input
                      type='password'
                      name='confirm-password'
                      placeholder={intl.formatMessage({'id': 'page.navbar.email_signup.modal.confirm_password.placeholder'})}
                      className='w-full h-11 bg-[#F5F5F5] font-poppins-400 text-sm text-black placeholder:text-[#BCBCBC] leading-[21px] pl-[19px] mt-1 rounded-md focus:outline-none autofill:bg-[#F5F5F5]'
                      value={signupData?.confirmPassword || ''}
                      autoComplete='new-password'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
                    />
                    {errorMsg?.confirmPassword && <h4 className='font-poppins-400 text-[11px] text-red leading-6'>{errorMsg?.confirmPassword}</h4>}
                  </div>
                  {/* referral code */}
                  <div className='flex flex-col mt-6'>
                    <label className='font-poppins-400 text-base text-purple leading-6'>
                      <FormattedMessage id='page.navbar.email_signup.modal.referral_code.label' />
                    </label>
                    <div className='flex flex-row justify-between items-center w-full h-11 bg-[#F5F5F5] py-2 pr-2 mt-1 rounded-md'>
                      <input
                        type='text'
                        name='referral-code'
                        placeholder='aYPYtIZZnNZX'
                        className='w-full h-full bg-[#F5F5F5] font-poppins-400 text-sm text-black placeholder:text-[#BCBCBC] leading-[21px] pl-[19px] rounded-md focus:outline-none autofill:bg-[#F5F5F5]'
                        value={signupData?.referralCode || ''}
                        autoComplete='new-referral-code'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
                      />
                      <button onClick={() => verifyReferralCode()} className='flex flex-row justify-center items-center w-[113px] h-[27px] bg-[#E7E7E7] rounded-[3px]'>
                        {verifyLoading ? <Lottie animationData={Loading} style={{ width: 15, height: 25, }} /> : <h5 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                          {verifyStatus?.status !== 'valid'? <FormattedMessage id='page.navbar.email_signup.modal.button.verify' /> : <FormattedMessage id='page.navbar.email_signup.modal.button.verified' />}
                        </h5>}
                      </button>
                    </div>
                    {verifyStatus?.message && <h4 className={`font-poppins-400 text-xs ${verifyStatus?.status === 'valid'? 'text-[#9C9C9C]' : 'text-red' } leading-6`}>{verifyStatus.message}</h4>}
                  </div>
                  {/* terms of service */}
                  <label htmlFor={'terms_of_service'} onClick={() => checkTerms()} className='flex flex-row items-start cursor-pointer mt-7'>
                    <input type={'checkbox'} id={'terms_of_service'} checked={signupData?.checked} readOnly={true} className='form-check-input appearance-none w-[19px] h-[19px] border-none rounded-sm bg-[#F5F5F5] checked:bg-purple transition duration-200 cursor-pointer mr-[13px]' />
                    <div className='inline max-w-[387px] w-full font-poppins-400 text-[13px] text-purple leading-6'>
                      <h4 className='inline mr-1'>
                        <FormattedMessage id='page.navbar.email_signup.modal.check.desc.1' />
                      </h4>
                      <h4 className='inline mr-1 cursor-pointer'>
                        <b><FormattedMessage id='page.navbar.email_signup.modal.check.desc.2' /></b>
                      </h4>
                      <h4 className='inline mr-1'>
                        <FormattedMessage id='page.navbar.email_signup.modal.check.desc.3' />
                      </h4>
                      <h4 className='inline mr-1 cursor-pointer'>
                        <b><FormattedMessage id='page.navbar.email_signup.modal.check.desc.4' />.</b>
                      </h4>
                    </div>
                  </label>
                  {errorMsg?.checked && <span className='font-poppins-400 text-[9px] text-red mt-1 leading-4'>
                    {errorMsg?.checked}
                  </span>}
                  <button onClick={() => singup()} disabled={loading} className={`flex flex-row justify-center items-center w-full h-[58px] ${loading ? 'bg-purple-light' : 'bg-purple'} rounded-md mt-9 hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
                    {loading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-[19px] text-white leading-[98.3%]'>
                      <FormattedMessage id='page.navbar.email_signup.modal.button.create_account' />
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

export default EmailSignupModal
