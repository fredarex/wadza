import React, { useCallback, useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Lottie from 'lottie-react'
import { ICommonProps } from '../../types/types'
import ReferralCodeUpdateModal from './ReferralCodeUpdateModal'
import { claimReferralCommission, getReferralCommissionData, updateReferralCode } from '../../api/user'
import { setUpdatedUser } from '../../redux/features/userSlice'
import Loading from '../../assets/lotties/loading.json'
import constants from '../../utils/constants'
import { convertCryptoToCash } from '../../utils/utils'

interface IProps extends ICommonProps {
  referralCode: string
}

const AnalysisReferrals = (props: IProps) => {
  const { referralCode } = props
  const intl = useIntl()
  const dispatch = useDispatch()
  const router = useRouter()
  const [code, setCode] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [claimLoading, setClaimLoading] = useState<boolean>(false)
  const [referralData, setReferralData] = useState<any>({
    attractedUsers: 0,
    claimableAmount: 0,
    soldNFtsCount: 0,
    usdPrice: 0,
  })
  const { REFERRAL_COMMISSION_MINIMUM_AMOUNT } = constants()

  const getReferralData = async () => {
    const getResult = await getReferralCommissionData()
    if (!getResult?.data?.error && getResult?.data?.data) {
      const data = getResult?.data?.data
      if (data.claimableAmount && data.claimableAmount > 0) {
        const _usd = await convertCryptoToCash(data.claimableAmount, 'ETH/USD')
        setReferralData({
          ...data,
          usdPrice: Number(_usd),
        })
      } else {
        setReferralData({
          ...data,
          usdPrice: 0,
        })
      }
    }
  }

  useEffect(() => {
    if (referralCode !== '') {
      getReferralData()
    }
  }, [referralCode])

  const showUpdateModal = async () => {
    setCode(referralCode)
    setError('')
    setOpenModal(true)
  }

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

  const updateCode = useCallback(async () => {
    if (!error && code) {
      setLoading(true)
      const updateLoading = toast.loading('Please wait while we update your referral code...')
      const updateResult = await updateReferralCode({referralCode: code})
      if (!updateResult?.data?.error && updateResult?.data?.data) {
        toast.update(updateLoading, { render: 'Your referral code was updated successfully', type: 'success', isLoading: false, autoClose: 3000 })

        const updatedUser = updateResult.data.data
        dispatch(setUpdatedUser(updatedUser))
        setLoading(false)
        router.push({
          pathname: '/referrals/dashboard',
        })
        setOpenModal(false)
      } else {
        toast.error(updateResult?.data?.error)
        setLoading(false)
      }
    } else {
      if (!code) {
        setError('Referral code should not be empty!')
      }
      toast.error('Please check the error messages!')
    }
  }, [code, error, dispatch, router])

  const claimCommission = async () => {
    setClaimLoading(true)
    const tClaimLoading = toast.loading('Please wait while claiming the referral commission...')
    const claimedResult = await claimReferralCommission()
    if (!claimedResult?.data?.error && claimedResult?.data?.data) {
      getReferralData()
      
      toast.update(tClaimLoading, { render: 'You claimed your referral commission successfully, please check your wallet', type: 'success', isLoading: false, autoClose: 3000 })
      setClaimLoading(false)
    } else {
      toast.error(claimedResult?.data?.error)
      setClaimLoading(false)
    }
  }
  
  return (
    <section>
      <div className='flex flex-col w-full bg-[#DDD7E5] rounded-lg p-[50px]'>
        <h1 className='font-poppins-600 text-[24px] text-black leading-9'>
          <FormattedMessage id='page.referrals_analysis.subtitle' />
        </h1>
        <h2 className='max-w-[818px] w-full font-poppins-400 text-[18px] text-black leading-[27px] mt-[10px]'>
          <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ 'id': 'page.referrals_analysis.subdesc' }) }} />
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[57px] mt-[29px] pr-[115px]'>
          <div className='flex flex-col'>
            <h1 className='font-poppins-600 text-[24px] text-black leading-9'>
              <FormattedMessage id='page.referrals_analysis.label.unique_referral_link' />
            </h1>
            <div className='flex flex-row justify-between items-center w-full h-11 p-2 bg-white rounded-md mt-[17px]'>
              <input className='w-[calc(100%-120px)] h-full pl-3 font-poppins-400 text-sm text-[#BCBCBC] leading-[21px] outline-none' readOnly value={referralCode? `${process.env.NEXT_PUBLIC_BASE_URL}?ref=${referralCode}` : ''} />
              <CopyToClipboard text={referralCode? `${process.env.NEXT_PUBLIC_BASE_URL}?ref=${referralCode}` : ''} onCopy={() => toast.success('Copied!')}>
                <button className='flex flex-row justify-center items-center w-[113px] h-[27px] bg-[#EDE8F3] rounded-[3px]'>
                  <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                    <FormattedMessage id='page.referrals_analysis.button.copy_link' />
                  </h4>
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <div className='flex flex-col'>
            <h1 className='font-poppins-600 text-[24px] text-black leading-9'>
              <FormattedMessage id='page.referrals_analysis.label.unique_promo_code' />
            </h1>
            <div className='flex flex-row justify-between items-center w-full h-11 p-2 bg-white rounded-md mt-[17px]'>
              <input className='w-[calc(100%-120px)] h-full pl-3 font-poppins-400 text-sm text-[#BCBCBC] leading-[21px] outline-none' readOnly value={referralCode? referralCode : ''} />
              <CopyToClipboard text={referralCode? referralCode : ''} onCopy={() => toast.success('Copied!')}>
                <button className='flex flex-row justify-center items-center w-[113px] h-[27px] bg-[#EDE8F3] rounded-[3px]'>
                  <h4 className='font-poppins-400 text-xs text-black leading-[98.3%]'>
                    <FormattedMessage id='page.nft_detail.collection.nft_detail.tooltip.copy' />
                  </h4>
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <button onClick={() => showUpdateModal()} className='flex flex-row justify-center items-center w-[213px] h-[49px] bg-[#D6CCE4] rounded-md mt-[37px] hover:scale-[1.02] hover:shadow-sm active:scale-[1] active:shadow-none duration-150 ease-in-out'>
          <h4 className='font-poppins-600 text-base text-purple-lighter leading-[98.3%]'>
            <FormattedMessage id='page.referrals_analysis.button.edit_your_nickname' />
          </h4>
        </button>
      </div>
      <div className='flex flex-col w-full bg-[#DDD7E5] rounded-lg p-[50px] mt-6'>
        <h1 className='font-poppins-600 text-[24px] text-black leading-9'>
          <FormattedMessage id='page.profile.tabs.activity' />
        </h1>
        <h2 className='max-w-[818px] w-full font-poppins-400 text-[18px] text-black leading-[27px] mt-[10px]'>
          <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ 'id': 'page.referrals_analysis.activity.desc' }) }} />
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-[29px] w-full bg-[#D7CEE1] rounded-lg mt-8 px-[35px] py-7'>
          <div className='flex flex-col justify-center'>
            <h5 className='font-poppins-400 text-[11px] text-black leading-4'>
              <FormattedMessage id='page.referrals_analysis.activity.label.absolutely_payments' />:
            </h5>
            <div className='flex flex-row justify-between w-full h-12 bg-[rgba(255,255,255,0.17)] shadow-[0px_10px_10px_rgba(0,0,0,0.05)] rounded-lg px-5 py-2 mt-2'>
              <div className='flex flex-row items-end'>
                <h2 className='font-poppins-800 text-[25px] text-purple-light leading-[104.3%] mr-2'>
                  {referralData?.usdPrice > 0 ? referralData?.usdPrice : '---'}
                </h2>
                <div className='flex h-full py-2'>
                  <h4 className='font-poppins-600 text-[18px] text-purple-light leading-[27px]'>
                    {`USD`}
                  </h4>
                </div>
              </div>
              <div className='flex flex-row items-end'>
                <h2 className='font-poppins-400 text-lg text-[#BCBCBC] leading-[104.3%] mr-1'>
                  {referralData?.claimableAmount > 0 ? referralData?.claimableAmount : '---'}
                </h2>
                <div className='flex h-full py-2'>
                  <h4 className='font-poppins-400 text-xs text-[#BCBCBC] leading-[27px]'>
                    {`ETH`}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center'>
            <h5 className='font-poppins-400 text-[11px] text-black leading-4'>
              <FormattedMessage id='page.referrals_analysis.activity.label.referrals_attracted' />:
            </h5>
            <div className='flex flex-row items-end w-full h-12 bg-[rgba(255,255,255,0.17)] shadow-[0px_10px_10px_rgba(0,0,0,0.05)] rounded-lg px-5 py-2 mt-2'>
              <h2 className='font-poppins-800 text-[25px] text-purple-light leading-[104.3%] mr-2'>
                {referralData?.attractedUsers > 0? referralData?.attractedUsers : '---'}
              </h2>
              <div className='flex h-full py-2'>
                <h4 className='font-poppins-600 text-[18px] text-purple-light leading-[27px]'>
                  {`Users`}
                </h4>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center'>
            <h5 className='font-poppins-400 text-[11px] text-black leading-4'>
              <FormattedMessage id='page.referrals_analysis.activity.label.nfts_count' />:
            </h5>
            <div className='flex flex-row items-end w-full h-12 bg-[rgba(255,255,255,0.17)] shadow-[0px_10px_10px_rgba(0,0,0,0.05)] rounded-lg px-5 py-2 mt-2'>
              <h2 className='font-poppins-800 text-[25px] text-purple-light leading-[104.3%] mr-2'>
                {referralData?.soldNFtsCount > 0? referralData?.soldNFtsCount : '---'}
              </h2>
              <div className='flex h-full py-2'>
                <h4 className='font-poppins-600 text-[18px] text-purple-light leading-[27px]'>
                  {`NFTs`}
                </h4>
              </div>
            </div>
          </div>
        </div>        
        {referralData?.claimableAmount > REFERRAL_COMMISSION_MINIMUM_AMOUNT && <button onClick={() => claimCommission()} disabled={claimLoading} className={`flex flex-row justify-center items-center w-[243px] h-[58px] ${claimLoading ? 'bg-purple-light' : 'bg-purple'} rounded-[6px] mt-8 hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm transition ease-in duration-150 active:scale-[1]`}>
          {claimLoading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
            <FormattedMessage id='page.referrals_analysis.button.claim' />
          </h4>}
        </button>}
      </div>
      <ReferralCodeUpdateModal
        isOpen={openModal}
        title={intl.formatMessage({'id': 'page.referrals_analysis.modal.update_referral_code.title'})}
        close={() => setOpenModal(false)}
        accept={() => updateCode()}
        code={code}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeCode(e)}
        error={error}
        loading={loading}
      />
    </section>
  )
}

export default AnalysisReferrals
