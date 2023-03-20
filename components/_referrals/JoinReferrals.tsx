import React, { useCallback, useState, useEffect } from 'react'
import Lottie from 'lottie-react'
import { useDispatch } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { generate } from 'referral-codes'
import { MainInput } from '../form'
import Loading from '../../assets/lotties/loading.json'
import { createReferralCode } from '../../api/user'
import { setUpdatedUser } from '../../redux/features/userSlice'
import { toast } from 'react-toastify'

const JoinReferrals = () => {
  const intl = useIntl()
  const router = useRouter()
  const dispatch = useDispatch()
  const [code, setCode] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  
  useEffect(() => {
    const suggestedReferralCode = generate({
      length: 12,
      count: 1,
      charset: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    })

    if (suggestedReferralCode[0]) {
      setCode(suggestedReferralCode[0])
    }
  }, [])

  const changeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > 5) {
      setCode(value)
      setError('')
    } else {
      setCode(value)
      setError('Nickname length should be greater than 5')
    }
  }

  const createCode = useCallback(async () => {
    if (!error && code) {
      setLoading(true)
      const createLoading = toast.loading('Please wait while we create your referral code...')
      const createResult = await createReferralCode({referralCode: code})
      if (!createResult?.data?.error && createResult?.data?.data) {
        toast.update(createLoading, { render: 'A new referral code was created successfully', type: 'success', isLoading: false, autoClose: 3000 })

        const updatedUser = createResult.data.data
        dispatch(setUpdatedUser(updatedUser))
        setLoading(false)
        router.push({
          pathname: '/referrals/dashboard',
        })
      } else {
        toast.error(createResult?.data?.error)
        setLoading(false)
      }
    } else {
      if (!code) {
        setError('Referral code should not be empty!')
      }
      toast.error('Please check the error messages!')
    }
  }, [code, error, dispatch, router])

  return (
    <section className='flex flex-col w-full bg-[#DDD7E5] rounded-lg p-[50px]'>
      <h1 className='font-poppins-600 text-[24px] text-black leading-9'>
        <FormattedMessage id='page.referrals_join.subtitle' />
      </h1>
      <h2 className='max-w-[695px] w-full font-poppins-400 text-[18px] text-black leading-[27px] mt-[10px]'>
        <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({'id': 'page.referrals_join.subdesc'})}} />
      </h2>
      <h1 className='font-poppins-600 text-[24px] text-black leading-9 mt-[54px]'>
        <FormattedMessage id='page.referrals_join.label.create_code' />
      </h1>
      <MainInput
        type={`text`}
        value={code || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeCode(e)}
        placeholder={intl.formatMessage({'id': 'page.referrals_join.input_nickname.placeholder'})}
        errorMsg={error || ''}
        className='mt-[17px]'
        inputClassName='w-[306px] h-11 px-5 rounded-[6px] text-sm'
      />
      <h3 className='max-w-[414px] w-full font-poppins-400-italic text-sm text-black leading-[21px] mt-[13px]'>
        <FormattedMessage id='page.referrals_join.input_nickname.desc' />
      </h3>
      <button onClick={() => createCode()} disabled={loading} className={`flex flex-row justify-center items-center w-[243px] h-[58px] ${loading ? 'bg-purple-light' : 'bg-purple'} rounded-[6px] mt-[43px] hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
        {loading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
          <FormattedMessage id='page.home.navbar.menu.create' />
        </h4>}
      </button>
    </section>
  )
}

export default JoinReferrals
