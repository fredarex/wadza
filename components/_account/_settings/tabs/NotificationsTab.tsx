import React, { useState, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Lottie from 'lottie-react'
import { setNotificationPreferences, updateMinimumBidThreshold } from '../../../../api/user'
import { useMetamask } from '../../../../contexts/Metamask.context'
import { setUpdatedUser } from '../../../../redux/features/userSlice'
import { RootState } from '../../../../redux/store'
import { ITab } from '../../../../types/types'
import constants from '../../../../utils/constants'
import { abbreviationFormat } from '../../../../utils/utils'
import { CheckSvgIcon, EthereumAltSvgIcon } from '../../../icons'
import Loading from '../../../../assets/lotties/loading.json'

const NotificationsTab = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { account } = useMetamask()
  const { NOTIFICATION_OPTIONS } = constants()
  const _user: any = useSelector((state: RootState) => state.user.user)
  const [notifications, setNotifications] = useState<any>({})
  const [threshold, setThreshold] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setNotifications(_user?.notificationPreferences)
    setThreshold(_user?.minimumBidThreshold || '')    
    if (_user?.minimumBidThreshold && Number(_user?.minimumBidThreshold) > 0.00001) {
      setDisabled(false)
      setError('')
    } else {
      setDisabled(true)
    }
  }, [_user])

  const update = async (key: string) => {
    const _notifications = {
      ...notifications,
      [key]: !notifications[key]
    }
    const updateResult = await setNotificationPreferences({ notificationPreferences: _notifications, })
    if (!updateResult?.data?.error && updateResult?.data?.data) {
      toast.success('Saved!')
      dispatch(setUpdatedUser(updateResult.data.data))
    } else {
      toast.error(updateResult.data.error || 'Unexpected error occurred')
    }
  }

  const changeThreshold = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (Number(value) < 0.00001) {
      setThreshold(value)
      setDisabled(true)
      setError('Threshold should be greater than or equal to 0.00001')
    } else {
      setThreshold(value)
      setDisabled(false)
      setError('')
    }
  }

  const updateThreshold = async () => {
    setLoading(true)
    const updateResult = await updateMinimumBidThreshold({ threshold: Number(threshold) })
    if (!updateResult?.data?.error && updateResult?.data?.data) {
      toast.success('Updated successfully')
      dispatch(setUpdatedUser(updateResult.data.data))
      setLoading(false)
    } else {
      toast.error(updateResult.data.error || 'Unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <section className='w-full pt-[42px] px-[89px]'>
      {/* title */}
      <h2 className='font-poppins-600 text-[32px] text-purple-light leading-[98.3%]'>
        <FormattedMessage id='page.settings.sidebar.notifications' />
      </h2>
      <div className='max-w-[390px] w-full mt-[14px]'>
        <div className='font-poppins-400 text-sm text-black leading-[21px]'>
          <div className='inline' dangerouslySetInnerHTML={{ __html: intl.formatMessage({ 'id': 'page.account.settings.tab.notifications.desc' }) }} />&nbsp;
          <h4 className='inline'>
            {abbreviationFormat(account || '', 6, 4)}
          </h4>
        </div>
      </div>
      {/* options */}
      <div className='mt-7'>
        {NOTIFICATION_OPTIONS.length > 0 && NOTIFICATION_OPTIONS.map((option: ITab, index: number) => (
          <div key={index} className='flex flex-row items-center w-full h-[70px] bg-[#D6CCE4] rounded-md px-[26px] mb-[14px]'>
            <div onClick={() => update(option?.slug)} className='flex flex-row justify-center items-center w-[21px] h-[21px] bg-purple-light rounded-sm mr-5 cursor-pointer'>
              {notifications[option?.slug || ''] && <CheckSvgIcon color='#D6CCE4' width={15} height={10} />}
            </div>
            <div className='flex flex-col justify-center'>
              <h3 className='font-poppins-600 text-sm text-purple-lighter leading-[21px]'>
                {option?.name || ''}
              </h3>
              <h3 className='font-poppins-400 text-sm text-purple-lighter leading-[21px]'>
                {option?.description || ''}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {/* minimum bid threshold */}
      <h4 className='font-poppins-600 text-[22px] text-purple-light leading-[98.3%] mt-[72px]'>
        <FormattedMessage id='page.account.settings.tab.notifications.minimum_bid_threshold.title' />
      </h4>
      <div className='max-w-[460px] w-full mt-[14px]'>
        <h4 className='font-poppins-400 text-sm text-black leading-[21px]'>
          <FormattedMessage id='page.account.settings.tab.notifications.minimum_bid_threshold.desc' />
        </h4>
      </div>
      <div className='flex flex-row justify-between items-center w-full h-[70px] bg-[#D6CCE4] rounded-md pl-6 pr-2 mt-5'>
        <div className='flex flex-row items-center'>
          <EthereumAltSvgIcon color='#3C1361' width={21} height={35} />
          <div className='ml-5'>
            <h3 className='font-poppins-600 text-sm text-purple-lighter leading-[21px]'>
              {`ETH`}
            </h3>
            <h4 className='font-poppins-400 text-sm text-purple-lighter leading-[21px]'>
              {`Ethereum`}
            </h4>
          </div>
        </div>
        <input
          type={`number`}
          className='max-w-[627px] w-full h-[49px] pl-[18px] font-poppins-600 text-purple-lighter text-lg leading-[27px] bg-[#E8E0F3] rounded-[3px] outline-none'
          value={threshold || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeThreshold(e)}
        />
      </div>
      {error && <h5 className='font-poppins-400 text-xs text-red leading-6'>{error}</h5>}
      <button onClick={() => updateThreshold()} disabled={disabled} className={`flex flex-row justify-center items-center max-w-[213px] w-full h-[49px] ${!disabled? loading ? 'bg-purple-light' : 'bg-purple' : 'bg-purple-light'} rounded-md mt-[69px] ${!disabled? 'hover:bg-purple-light hover:scale-[1.02] hover:shadow-sm' : '' } transition ease-in duration-150 active:scale-[1]`}>
        {loading ? <Lottie animationData={Loading} style={{ width: 25, height: 40, }} /> : <h4 className='font-poppins-600 text-base text-white leading-[98.3%]'>
          <FormattedMessage id='page.nft.creation.add_property_modal.save' />
        </h4>}
      </button>
    </section>
  )
}

export default NotificationsTab
