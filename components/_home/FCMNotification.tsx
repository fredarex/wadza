import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { firebaseConfig } from '../../config'
import { ICommonProps } from '../../types/types'
import { addFirebaseToken } from '../../api/user'
import { setFirebaseToken, setUpdatedUser } from '../../redux/features/userSlice'
import { RootState } from '../../redux/store'

interface IProps extends ICommonProps {
  children: any
}

const FCMNotification = (props: IProps) => {
  const { children } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const _user = useSelector((state: RootState) => state.user.user)

  const firebaseToken = useCallback(async (firebaseToken: string) => {
    const addResult = await addFirebaseToken({ firebaseToken, })
    if (!addResult?.data?.error && addResult?.data?.data) {
      dispatch(setUpdatedUser(addResult.data.data))
    } else {
      console.log('Add firebase token error :: ', addResult?.data?.error || 'Unexpected error occurred')
    }
  }, [dispatch])

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = useCallback((url: string) => {
    router.push({
      pathname: url || ''
    })
  }, [router])

  useEffect(() => {    
    const firebaseApp = initializeApp(firebaseConfig)
    const firebaseMessaging = getMessaging(firebaseApp)

    getToken(firebaseMessaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_WPC_PUBLIC_KEY }).then((currentToken) => {
      if (currentToken) {
        dispatch(setFirebaseToken(currentToken))
        if (_user) {
          firebaseToken(currentToken)
        }

        onMessage(firebaseMessaging, (payload: any) => {
          toast(
            <div className='font-poppins-400 text-sm text-black leading-6 cursor-pointer' onClick={() => handleClickPushNotification(payload?.data?.url)}>
              <h5 className='text-base'>{payload?.data?.title}</h5>
              <h6 className='text-black-lighter'>{payload?.data?.body}</h6>
            </div>,
            {
              closeOnClick: false,
            }
          )
        })
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.')
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
    })
  }, [_user, dispatch, firebaseToken, handleClickPushNotification])

  return (
    <>
      {children}
    </>
  )
}

export default FCMNotification
