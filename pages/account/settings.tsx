import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { ProfileSettingsTabsType } from '../../types/types'
import constants from '../../utils/constants'
import { RootState } from '../../redux/store'
import { getConnectTwitter, getRemoveTwitter, getTwitterRequestToken, updateProfile } from '../../api/user'
import { Sidebar, ProfileTab, FeaturedItemsTab, NotificationsTab, OffersTab } from '../../components/_account/_settings'
import { setConnectWalletsModal, setUpdatedUser } from '../../redux/features/userSlice'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'
import queryString from 'query-string'

const styles = {
  previewBtn: 'group group/preview flex flex-row justify-center items-center max-w-[110px] w-full h-[26px] bg-[#D6CCE4] hover:bg-violet-300 hover:shadow-md hover:scale-x-110 rounded-md ease-in duration-150 active:shadow-none active:scale-100',
}

const Settings = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const twitterRan = useRef(false)
  const { query } = router
  const { PROFILE_SETTINGS_TABS } = constants()
  const _user: any = useSelector((state: RootState) => state.user.user)
  const [user, setUser] = useState<any>({})
  const [tab, setTab] = useState<ProfileSettingsTabsType>('profile')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (query.tab) {
      setTab(query.tab as ProfileSettingsTabsType)
    }

    setUser(_user)
  }, [query, _user])

  const updateProfileData = useCallback(
    async () => {
      try {
        const uP = toast.loading('Please wait while the profile is being updated...')
        setLoading(true)

        const formData: any = new FormData()
        formData.append('profileImage', user.profileImage)
        formData.append('bannerImage', user.bannerImage)
        formData.append('username', user.username || '')
        formData.append('bio', user.bio || '')
        formData.append('email', user.email || '')
        formData.append('links', user.links || '')

        updateProfile(formData)
          .then((data) => {
            console.log('saveResult data :: ', data)
            dispatch(setUpdatedUser(data.data.data))
            toast.update(uP, { render: 'Profile data was updated successfully', type: 'success', isLoading: false, autoClose: 3000 })
            setLoading(false)
          })
          .catch((error) => {
            toast.update(uP, { render: 'Profile data was not updated', type: 'error', isLoading: false, autoClose: 3000 })
            setLoading(false)
            console.error(error)
          })
      } catch (error) {
        return console.log(error)
      }
    }, [user, dispatch]
  )

  useEffect(() => {
    if (twitterRan.current === false) {
      const loginTwitter = async () => {
        const { oauth_token, oauth_verifier } = queryString.parse(window.location.search)
        const oauthTokenSecret = getCookie('oauth_token')!
  
        if (oauth_token && oauth_verifier && oauthTokenSecret) {
          try {
            const payload = {
              oauth_token,
              oauth_verifier,
              oauth_token_secret: oauthTokenSecret,
            }
            const response = await getConnectTwitter(payload)
            if (response?.data?.data) {
              toast.success('Connected to your twitter account successfully')
              dispatch(setUpdatedUser(response.data.data))

              deleteCookie('oauth_token')
              router.replace('/account/settings', undefined, { shallow: true })
            }
          } catch (error) {
            console.error(error)
          }
        }
      }

      loginTwitter()

      return () => {
        twitterRan.current = true
      }
    }
  }, [dispatch, router])

  const connectTwitter = async () => {
    try {
      const response = await getTwitterRequestToken()
      const { url, oauth_token } = response.data.data
      setCookie('oauth_token', oauth_token, {
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      
      window.open(
        url,
        '_self',
      )
    } catch (error) {
      console.error(error)
    }
  }

  const removeTwitter = async () => {
    try {
      const response = await getRemoveTwitter()

      if (response?.data?.data) {
        toast.success('Removed your twitter account successfully')
        dispatch(setUpdatedUser(response.data.data))
      }

    } catch (error) {
      console.error(error)
    }
  }

  const gotoAccount = () => {
    if (user?.walletAddress) {
      router.push({ pathname: '/account', })
    } else {
      dispatch(setConnectWalletsModal(true))
    }
  }

  return (
    <section className='flex flex-row justify-center mt-[136px]'>
      <div className='flex flex-col max-w-[1250px] w-full'>
        <div className='flex flex-row justify-center items-center max-w-[474px] w-full bg-[#DFDBE4] px-13 py-8 rounded-t-[15px]'>
          <span className='font-poppins-700 text-3xl text-black-lighter mr-[34px]'>
            <FormattedMessage id='page.settings.title' />
          </span>
          <button className={styles.previewBtn} onClick={() => gotoAccount()}>
            <h5 className='font-poppins-600 text-xs text-purple-lighter group-hover/preview:text-purple-light leading-[18px] ease-in duration-150'>
              <FormattedMessage id='page.settings.button.preview' />
            </h5>
          </button>
        </div>
        <div className='flex flex-row w-full bg-purple-lightest pl-5 pt-[26px] pb-[49px] rounded-[0px_15px_15px_15px]'>
          <Sidebar tabs={PROFILE_SETTINGS_TABS} tab={tab} />
          {tab === 'profile' && <ProfileTab user={user} setUser={setUser} save={() => updateProfileData()} connectTwitter={connectTwitter} removeTwitter={removeTwitter} />}
          {tab === 'featured_items' && <FeaturedItemsTab />}
          {tab === 'notifications' && <NotificationsTab />}
          {tab === 'offers' && <OffersTab />}
        </div>
      </div>
    </section>
  )
}

export default Settings
