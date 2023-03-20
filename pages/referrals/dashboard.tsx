import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { AnalysisReferrals, JoinReferrals } from '../../components/_referrals'
import { RootState } from '../../redux/store'

const ReferralDashboard = () => {
  const _user = useSelector((state: RootState) => state.user.user)
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    setUser(_user)
  }, [_user])

  return (
    <section className='flex flex-row justify-center mt-[136px]'>
      <div className='flex flex-col max-w-[1250px] w-full'>
        <div className='flex flex-row justify-center items-center max-w-[474px] w-full bg-[#DFDBE4] px-13 py-8 rounded-t-[15px]'>
          <span className='font-poppins-700 text-3xl text-black-lighter'>
            <FormattedMessage id='page.referrals_join.title' />
          </span>
        </div>
        <div className='w-full bg-purple-lightest p-7 rounded-[0px_15px_15px_15px]'>
          {user?.referralCode? <AnalysisReferrals referralCode={user?.referralCode} /> : <JoinReferrals />}
        </div>
      </div>
    </section>
  )
}

export default ReferralDashboard
