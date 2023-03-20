import client from '../client'
import { IUserData } from '../../types/types'

export const signin = (data: IUserData) => {
  return client.post('/users/auth/signin', data)
}

export const referralCodeVerify = (data: any) => {
  return client.post(`/users/referral/referralCodeVerify`, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const signupWithEmail = (data: any) => {
  return client.post(`/users/auth/signupWithEmail`, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const signinWithEmail = (data: any) => {
  return client.post(`/users/auth/signinWithEmail`, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const signinWithGoogle = (data: any) => {
  return client.post(`/users/auth/signinWithGoogle`, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const verifyEmail = (data: any) => {
  return client.post(`/users/auth/verifyEmail`, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
